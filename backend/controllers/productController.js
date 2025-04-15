import mongoose from "mongoose";
import productModel from "../models/productModel.js";
import SecondaryUser from "../models/secondaryUserModel.js";
import { Brand, Category, Godown, PriceLevel, Subcategory } from "../models/subDetails.js";
import OragnizationModel from "../models/OragnizationModel.js";

// @desc adding new Product
// route POst/api/pUsers/addProduct

export const addProduct = async (req, res) => {
  try {
    const {
      body: {
        cmp_id,
        product_name,
        product_code,
        balance_stock,
        brand,
        category,
        batchEnabled,
        gdnEnabled,
        sub_category,
        unit,
        alt_unit,
        unit_conversion,
        alt_unit_conversion,
        hsn_code,
        cgst,
        sgst,
        igst,
        cess,
        addl_cess,
        purchase_price,
        item_mrp,
        purchase_cost,
        Priceleveles,
        GodownList,
      },
    } = req;

    // Check for existing product by name and cmp_id
    const existingProductByName = await productModel.findOne({
      product_name: { $regex: new RegExp(`^${product_name}$`, "i") },
      cmp_id,
    });

    // Check for existing product by code and cmp_id
    const existingProductByCode = await productModel.findOne({
      product_code: { $regex: new RegExp(`^${product_code}$`, "i") },
      cmp_id,
    });

    if (existingProductByName) {
      return res.status(400).json({
        success: false,
        message: "Product with this name already exists for this company.",
      });
    }

    if (existingProductByCode) {
      return res.status(400).json({
        success: false,
        message:
          "Product with this product code already exists for this company.",
      });
    }
    // Prepare data to save
    const dataToSave = {
      cmp_id,

      product_name,
      Primary_user_id: req.pUserId || req.owner,
      product_code,
      balance_stock,
      brand,
      category,
      sub_category,
      batchEnabled,
      gdnEnabled,
      unit,
      alt_unit,
      unit_conversion,
      alt_unit_conversion,
      hsn_code,
      purchase_price,
      purchase_cost,
      item_mrp,
      Priceleveles,
      GodownList,
      cgst,
      sgst,
      igst,
      cess,
      addl_cess,
    };

    // Save the product
    const newProduct = await productModel.create(dataToSave);

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Product added successfully",
    });
  } catch (error) {
    console.error(error);

    // Return error response
    return res.status(500).json({
      success: false,
      message: "Internal server error, try again!",
    });
  }
};

// @desc  edit product details
// route get/api/pUsers/editProduct
export const editProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const {
      body: {
        cmp_id,
        product_name,
        product_code,
        balance_stock,
        brand,
        category,
        sub_category,
        unit,
        alt_unit,
        unit_conversion,
        alt_unit_conversion,
        hsn_code,
        cgst,
        sgst,
        igst,
        cess,
        addl_cess,
        purchase_price,
        item_mrp,
        purchase_cost,
        Priceleveles,
        GodownList,
        batchEnabled,
        gdnEnabled
      },
    } = req;

    // Check for existing product by name and cmp_id
    const existingProductByName = await productModel.findOne({
      _id: { $ne: productId }, // Exclude the current product
      product_name: { $regex: new RegExp(`^${product_name}$`, "i") },
      cmp_id,
    });

    // Check for existing product by code and cmp_id
    const existingProductByCode = await productModel.findOne({
      _id: { $ne: productId }, // Exclude the current product
      product_code: { $regex: new RegExp(`^${product_code}$`, "i") },
      cmp_id,
    });

    if (existingProductByName) {
      return res.status(400).json({
        success: false,
        message: "Product with this name already exists for this company.",
      });
    }

    // Prepare data to save
    const dataToSave = {
      product_name,
      Primary_user_id: req.pUserId || req.owner,
      product_code,
      balance_stock,
      brand,
      category,
      sub_category,
      unit,
      alt_unit,
      unit_conversion,
      alt_unit_conversion,
      hsn_code,
      purchase_price,
      purchase_cost,
      item_mrp,
      Priceleveles,
      GodownList,
      cgst,
      sgst,
      igst,
      cess,
      addl_cess,
      batchEnabled,
      gdnEnabled
    };

    const updateProduct = await productModel.findOneAndUpdate(
      { _id: productId },
      dataToSave,
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updateProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// @desc  getting a single product detail for edit
// route get/api/sUsers/productDetails

export const productDetails = async (req, res) => {
  const productId = req.params.id;
  try {
    const productDetails = await productModel.findById(productId);
    res.status(200).json({ success: true, data: productDetails });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error, try again!" });
  }
};

// @desc delete product from  product list
// route delete/api/pUsers/deleteProduct

export const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const deletedProduct = await productModel.findByIdAndDelete(productId);
    if (deletedProduct) {
      return res.status(200).json({
        success: true,
        message: "Product deleted successfully",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error, try again!",
    });
  }
};

// @desc getting product list
// route get/api/pUsers/

export const getProducts = async (req, res) => {
  const Secondary_user_id = req.sUserId;
  const cmp_id = req.params.cmp_id;
  const taxInclusive = req.query.taxInclusive === "true";
  const vanSaleQuery = req.query.vanSale;
  const isVanSale = vanSaleQuery === "true";
  const excludeGodownId = req.query.excludeGodownId;
  const stockTransfer = req.query.stockTransfer;
  const searchTerm = req.query.search || "";

  // Add pagination parameters
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 0;
  const skip = limit > 0 ? (page - 1) * limit : 0;

  const Primary_user_id = new mongoose.Types.ObjectId(req.owner);

  try {
    const secUser = await SecondaryUser.findById(Secondary_user_id);

    if (!secUser) {
      return res.status(404).json({ message: "Secondary user not found" });
    }

    const configuration = secUser.configurations.find(
      (item) => item.organization == cmp_id
    );

    // Build the match stage with search functionality
    let matchStage = {
      $match: {
        cmp_id: cmp_id,
        Primary_user_id: Primary_user_id,
      },
    };

    // Add search condition if searchTerm is provided
    if (searchTerm) {
      matchStage.$match.$or = [
        { product_name: { $regex: searchTerm, $options: "i" } },
        // { hsn_code: { $regex: searchTerm, $options: 'i' } },
        { product_code: searchTerm },
      ];
    }

    let selectedGodowns;
    if (isVanSale && configuration?.selectedVanSaleGodowns.length > 0) {
      selectedGodowns = configuration.selectedVanSaleGodowns;
    } else if (!isVanSale && configuration && configuration.selectedGodowns) {
      selectedGodowns = configuration.selectedGodowns;
    }

    let projectStage = {
      $project: {
        product_name: 1,
        cmp_id: 1,
        product_code: 1,
        balance_stock: 1,
        Primary_user_id: 1,
        brand: 1,
        category: 1,
        sub_category: 1,
        unit: 1,
        alt_unit: 1,
        unit_conversion: 1,
        alt_unit_conversion: 1,
        hsn_code: 1,
        purchase_price: 1,
        purchase_cost: 1,
        Priceleveles: 1,
        cgst: 1,
        sgst: 1,
        igst: 1,
        cess: 1,
        addl_cess: 1,
        state_cess: 1,
        product_master_id: 1,
        __v: 1,
        GodownList: 1,
        batchEnabled: 1,
        item_mrp: 1,
      },
    };

    if (
      selectedGodowns &&
      selectedGodowns.length > 0 &&
      stockTransfer !== "true"
    ) {
      matchStage.$match["GodownList.godown_id"] = { $in: selectedGodowns };

      projectStage.$project.GodownList = {
        $filter: {
          input: "$GodownList",
          as: "godown",
          cond: { $in: ["$$godown.godown_id", selectedGodowns] },
        },
      };
    }

    if (excludeGodownId) {
      projectStage.$project.GodownList = {
        $filter: {
          input: "$GodownList",
          as: "godown",
          cond: { $ne: ["$$godown.godown_id", excludeGodownId] },
        },
      };
    }

    const addFieldsStage = {
      $addFields: {
        hasGodownOrBatch: {
          $anyElementTrue: {
            $map: {
              input: "$GodownList",
              as: "godown",
              in: {
                $or: [
                  { $ifNull: ["$$godown.godown", false] },
                  { $ifNull: ["$$godown.batch", false] },
                ],
              },
            },
          },
        },
      },
    };

    const filterEmptyGodownListStage = {
      $match: {
        $expr: {
          $cond: {
            if: { $eq: [excludeGodownId, null] },
            then: { $gt: [{ $size: "$GodownList" }, 0] },
            else: {
              $and: [
                { $gt: [{ $size: "$GodownList" }, 0] },
                {
                  $anyElementTrue: {
                    $map: {
                      input: "$GodownList",
                      as: "godown",
                      in: {
                        $and: [
                          { $ifNull: ["$$godown.godown", false] },
                          { $ifNull: ["$$godown.godown_id", false] },
                        ],
                      },
                    },
                  },
                },
              ],
            },
          },
        },
      },
    };

    // Count total products for pagination info
    const countPipeline = [
      matchStage,
      projectStage,
      addFieldsStage,
      filterEmptyGodownListStage,
      { $sort: { product_name: 1 } }, // sort alphabetically
      { $count: "total" },
    ];

    const countResult = await productModel.aggregate(countPipeline);
    const totalProducts = countResult.length > 0 ? countResult[0].total : 0;

    const aggregationPipeline = [
      matchStage,
      projectStage,
      addFieldsStage,
      filterEmptyGodownListStage,
      ...(limit > 0 ? [{ $skip: skip }] : []),
      ...(limit > 0 ? [{ $limit: limit }] : []),
    ];
    // Conditionally add taxInclusive stage
    if (taxInclusive) {
      const addTaxInclusiveStage = {
        $addFields: {
          isTaxInclusive: true,
        },
      };
      aggregationPipeline.push(addTaxInclusiveStage);
    }

    const products = await productModel.aggregate(aggregationPipeline);

    if (products && products.length > 0) {
      return res.status(200).json({
        productData: products,
        pagination: {
          total: totalProducts,
          page,
          limit,
          hasMore: skip + products.length < totalProducts,
        },
        message: "Products fetched",
      });
    } else {
      return res.status(404).json({ message: "No products were found" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error, try again!" });
  }
};


/**
 * @desc  adding subDetails of product such as brand category subcategory etc
 * @route POST/api/pUsers/addProductSubDetails
 * @access public
 */

export const addProductSubDetails = async (req, res) => {
  try {
    const subDetails = req.body;
    const key = Object.keys(subDetails)[0];
    const orgId = req.params.orgId;

    let Model;
    let dataToSave;
    /// add godownEnabled tag to company
    const company = await OragnizationModel.findOne({ _id: orgId });
    const generatedId = new mongoose.Types.ObjectId();

    switch (key) {
      case "brand":
        Model = Brand;
        dataToSave = {
          _id: generatedId,
          brand: subDetails[key],
          brand_id: generatedId,
          cmp_id: orgId,
          Primary_user_id: req.pUserId || req.owner,
        };
        break;
      case "category":
        Model = Category;
        dataToSave = {
          _id: generatedId,
          category: subDetails[key],
          category_id: generatedId,
          cmp_id: orgId,
          Primary_user_id: req.pUserId || req.owner,
        };
        break;
      case "subcategory":
        Model = Subcategory;
        dataToSave = {
          _id: generatedId,
          subcategory: subDetails[key],
          categoryId: subDetails.categoryId,
          subcategory_id: generatedId,
          cmp_id: orgId,
          Primary_user_id: req.pUserId || req.owner,
        };
        break;
      case "godown":
        Model = Godown;
        dataToSave = {
          _id: generatedId,
          godown: subDetails[key],
          godown_id: generatedId,
          address: subDetails.address,
          cmp_id: orgId,
          Primary_user_id: req.pUserId || req.owner,
          defaultGodown: false,
        };

        break;
      case "pricelevel":
        Model = PriceLevel;
        dataToSave = {
          _id: generatedId,
          pricelevel: subDetails[key],
          pricelevel_id: generatedId,
          cmp_id: orgId,
          Primary_user_id: req.pUserId || req.owner,
        };
        break;
      default:
        return res.status(400).json({ message: "Invalid sub-detail type" });
    }

    const newSubDetail = new Model(dataToSave);
    await newSubDetail.save();

    const companyUpdate = key === "godown" ? company : null;

    res
      .status(201)
      .json({ message: `${key} added successfully`, companyUpdate });
  } catch (error) {
    console.error("Error in addProductSubDetails:", error);
    res
      .status(500)
      .json({ message: "An error occurred while adding the sub-detail" });
  }
};

/**
 * @desc  get subDetails of product such as brand category subcategory etc
 * @route GET/api/pUsers/getProductSubDetails
 * @access Public
 */

export const getProductSubDetails = async (req, res) => {
  try {
    const { orgId } = req.params;
    const { type } = req.query; // 'type' can be 'brand', 'category', 'subcategory', 'godown', or 'pricelevel'
    const Primary_user_id = req.pUserId || req.owner;

    let data;

    switch (type) {
      case "brand":
        data = await Brand.find({
          cmp_id: orgId,
          Primary_user_id: Primary_user_id,
        });
        break;
      case "category":
        data = await Category.find({
          cmp_id: orgId,
          Primary_user_id: Primary_user_id,
        });
        break;
      case "subcategory":
        data = await Subcategory.find({
          cmp_id: orgId,
          Primary_user_id: Primary_user_id,
        });
        break;
      case "godown":
        data = await Godown.find({
          cmp_id: orgId,
          Primary_user_id: Primary_user_id,
        });
        break;
      case "pricelevel":
        data = await PriceLevel.find({
          cmp_id: orgId,
          Primary_user_id: Primary_user_id,
        });
        break;
      default:
        return res.status(400).json({ message: "Invalid sub-detail type" });
    }

    res.status(200).json({
      message: `${type} details retrieved successfully`,
      data: data,
    });
  } catch (error) {
    console.error("Error in getProductSubDetails:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the sub-details" });
  }
};

/**
 * @desc  delete subDetails of product such as brand category subcategory etc
 * @route DELETE/api/pUsers/deleteProductSubDetails
 * @access Public
 */
export const deleteProductSubDetails = async (req, res) => {
  try {
    const { orgId, id } = req.params;
    const { type } = req.query;

    let Model;
    switch (type) {
      case "brand":
        Model = Brand;
        break;
      case "category":
        Model = Category;
        break;
      case "subcategory":
        Model = Subcategory;
        break;
      case "godown":
        Model = Godown;
        break;
      case "pricelevel":
        Model = PriceLevel;
        break;
      default:
        return res.status(400).json({ message: "Invalid sub-detail type" });
    }

    const deletedItem = await Model.findOneAndDelete({
      _id: id,
      cmp_id: orgId,
    });

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: `${type} deleted successfully` });
  } catch (error) {
    console.error("Error in deleteProductSubDetails:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the sub-detail" });
  }
};

/**
 * @desc  edit subDetails of product such as brand category subcategory etc
 * @route PUT/api/pUsers/editProductSubDetails
 * @access Public
 */
export const editProductSubDetails = async (req, res) => {
  try {
    const { orgId, id } = req.params;
    const { type } = req.query;
    const updateData = req.body[type];

    let Model;
    switch (type) {
      case "brand":
        Model = Brand;
        break;
      case "category":
        Model = Category;
        break;
      case "subcategory":
        Model = Subcategory;
        break;
      case "godown":
        Model = Godown;
        break;
      case "pricelevel":
        Model = PriceLevel;
        break;
      default:
        return res.status(400).json({ message: "Invalid sub-detail type" });
    }

    const queryConditions = { _id: id, cmp_id: orgId };
    const updateOperation = { [type]: updateData };

    const result = await Model.updateOne(queryConditions, updateOperation);

    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ message: "Item not found or not modified" });
    }

    const updatedItem = await Model.findOne(queryConditions);

    res.status(200).json({
      message: `${type} updated successfully`,
      data: updatedItem,
    });
  } catch (error) {
    console.error("Error in editProductSubDetails:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the sub-detail" });
  }
};
