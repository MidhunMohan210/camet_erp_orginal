import productModel from "../models/productModel.js";
import OragnizationModel from "../models/OragnizationModel.js";
import { truncateToNDecimals } from "./helper.js";

// Helper to fetch last invoice and calculate the serial number
export const fetchLastInvoice = async (model, session) => {
  const lastInvoice = await model
    .findOne({}, {}, { sort: { serialNumber: -1 } })
    .session(session);
  return lastInvoice ? lastInvoice.serialNumber + 1 : 1;
};

// Helper to update item stock and calculate prices and taxes
export const updateItemStockAndCalculatePrice = async (
  item,
  priceLevelFromRedux,
  session
) => {
  // const selectedPriceLevel = item.Priceleveles.find(
  //   (priceLevel) => priceLevel.pricelevel === priceLevelFromRedux
  // );

  const selectedPrice = item?.selectedPriceRate || 0;
  let totalPrice = selectedPrice * (item.count || 1) || 0;

  const itemCount = parseFloat(item.totalActualCount || item.totalCount || 0);
  const product = await productModel.findById(item._id).session(session);
  if (!product) throw new Error(`Product with ID ${item._id} not found`);

  const productBalanceStock = parseFloat(product.balance_stock) || 0;
  const newBalanceStock = truncateToNDecimals(
    productBalanceStock - itemCount,
    3
  );

  await productModel.updateOne(
    { _id: product._id },
    { $set: { balance_stock: newBalanceStock } },
    { session }
  );

  return item;
};

// Helper to calculate additional charges with taxes
export const calculateAdditionalCharges = (additionalChargesFromRedux) => {
  return additionalChargesFromRedux.map((charge) => {
    const { value, taxPercentage } = charge;
    const taxAmt = (parseFloat(value) * parseFloat(taxPercentage)) / 100;
    return { ...charge, taxAmt };
  });
};

// Helper to update secondary user configurations
export const updateSecondaryUserConfiguration = async (
  secondaryUser,
  orgId,
  session
) => {
  let orderConfig = false;

  const configuration = secondaryUser.configurations.find(
    (config) => config.organization.toString() === orgId
  );

  if (configuration) {
    orderConfig = true;
  }

  if (orderConfig) {
    secondaryUser.configurations = secondaryUser.configurations.map(
      (config) => {
        if (config.organization.toString() === orgId) {
          return { ...config, orderNumber: (config.orderNumber || 0) + 1 };
        }
        return config;
      }
    );
    await secondaryUser.save({ session });
  } else {
    await OragnizationModel.findByIdAndUpdate(
      orgId,
      { $inc: { orderNumber: 1 } },
      { new: true, session }
    );
  }
};

// Helper to revert stock changes from the original invoice
export const revertStockChanges = async (invoice, session) => {
  for (const item of invoice.items) {
    const product = await productModel.findById(item._id).session(session);
    if (!product) {
      throw new Error(`Product with ID ${item._id} not found`);
    }

    const itemCount = parseFloat(item.totalActualCount || item.totalCount || 0);

    console.log("itemCount", itemCount);
    

    const newBalanceStock = truncateToNDecimals(
      parseFloat(product.balance_stock) + parseFloat(itemCount),
      3
    );

    await productModel.updateOne(
      { _id: product._id },
      { $set: { balance_stock: newBalanceStock } },
      { session }
    );
  }
};
