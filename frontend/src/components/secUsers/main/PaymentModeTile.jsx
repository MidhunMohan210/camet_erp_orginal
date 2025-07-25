/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */

import { useCallback, useEffect, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import {
  addPaymentMethod,
  addChequeDate,
  addChequeNumber,
  addNote,
  addIsNoteOpen,
} from "../../../../slices/voucherSlices/commonAccountingVoucherSlice";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { PiBankBold } from "react-icons/pi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import debounce from "lodash/debounce";

function PaymentModeTile({ tab }) {
  ///////////////  PaymentModeTile   ////////////////
  const paymentMethods = [
    { name: "Cash", source: true },
    { name: "Cheque", source: true },
    { name: "Online", source: true },
  ];
  const {
    paymentMethod: selectedPaymentMethodFromRedux,
    paymentDetails,
    note: noteFromRedux,
    isNoteOpen: isNoteOpenFromRedux,
  } = useSelector((state) => state.commonAccountingVoucherSlice);

  const chequeDateFromRedux = paymentDetails?.chequeDate || "";
  const chequeNumberFromRedux = paymentDetails?.chequeNumber || "";

  const matchedMethod = paymentMethods.find(
    (method) => method.name === selectedPaymentMethodFromRedux
  );
  const dispatch = useDispatch();
  const chequeDateString = new Date(chequeDateFromRedux);

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState(matchedMethod);
  const [chequeDate, setChequeDate] = useState(chequeDateString);
  const [chequeNumber, setChequeNumber] = useState(chequeNumberFromRedux);
  const [isNoteOpen, setIsNoteOpen] = useState(isNoteOpenFromRedux);
  const [note, setNote] = useState(noteFromRedux);

  /// to ensure data is visible in the ui
  useEffect(() => {
    if (selectedPaymentMethodFromRedux) {
      const matchedMethod = paymentMethods.find(
        (method) => method.name === selectedPaymentMethodFromRedux
      );
      setSelectedPaymentMethod(matchedMethod);
    }

    if (paymentDetails?.chequeDate) {
      setChequeDate(new Date(paymentDetails.chequeDate));
    }

    if (paymentDetails?.chequeNumber) {
      setChequeNumber(paymentDetails.chequeNumber);
    }

    setIsNoteOpen(isNoteOpenFromRedux);
    setNote(noteFromRedux);
  }, [
    selectedPaymentMethodFromRedux,
    paymentDetails,
    noteFromRedux,
    isNoteOpenFromRedux,
  ]);

  /// debounced functions
  const debouncedDispatchChequeNumber = useCallback(
    debounce((number) => {
      dispatch(addChequeNumber(number));
    }, 500), // Adjust debounce time as needed
    [dispatch]
  );

  const debouncedDispatchChequeDate = useCallback(
    debounce((date) => {
      dispatch(addChequeDate(date.toISOString()));
    }, 500), // Adjust debounce time as needed
    [dispatch]
  );

  const debouncedDispatchNote = useCallback(
    debounce((note) => {
      dispatch(addNote(note));
    }, 500), // Adjust debounce time as needed
    [dispatch]
  );

  const handleChequeNumberChange = (e) => {
    const value = e.target.value;
    setChequeNumber(value);

    if (selectedPaymentMethod?.name === "Cheque") {
      debouncedDispatchChequeNumber(value);
    }
  };

  const handleChequeDateChange = (date) => {
    setChequeDate(date);
    debouncedDispatchChequeDate(date);
  };

  const handleNoteChange = (e) => {
    setNote(e.target.value);
    debouncedDispatchNote(e.target.value);
  };


  const handleToggleNote = () => {
    setIsNoteOpen(!isNoteOpen);
    dispatch(addIsNoteOpen(!isNoteOpen));
  };
  

  return (
    <div className="  py-3  mt-3 shadow-lg  ">
      <div className="flex justify-between items-center bg-white px-3 py-3">
        <div className="flex items-center mb-2 gap-2 ">
          <p className="font-bold uppercase text-xs"> Payment Mode</p>
          <span className="text-red-500 font-bold"> *</span>
        </div>
        <div className="flex items-center gap-3">
          {paymentMethods.map((method, index) => (
            <button
              onClick={() => {
                setSelectedPaymentMethod(method);
                dispatch(addPaymentMethod(method.name));
              }}
              key={index}
              className={` ${
                selectedPaymentMethod?.name === method?.name &&
                "bg-violet-500 text-white"
              }     font-semibold   text-xs  p-1 px-2 md:px-3  border border-1 border-gray-300 rounded-2xl cursor-pointer`}
            >
              {method.name}
            </button>
          ))}
        </div>
      </div>
      <hr className="" />

      {selectedPaymentMethod?.source && (
        <>
          {selectedPaymentMethod?.name === "Cash" ? (
            // Cash payment section
            <>
              {paymentDetails?.cash_ledname ? (
                <div className="flex justify-between items-center p-4">
                  <div className="flex items-center gap-4 cursor-pointer">
                    <PiBankBold size={17} />
                    <p className="text-gray-700 font-semibold text-xs">
                      {paymentDetails.cash_ledname}
                    </p>
                  </div>
                  <Link to={`/sUsers/${tab}/sourceList/Cash`}>
                    <p className="text-violet-500 p-1 px-3 text-xs border border-1 border-gray-300 rounded-2xl cursor-pointer">
                      Change
                    </p>
                  </Link>
                </div>
              ) : (
                <Link to={`/sUsers/${tab}/sourceList/Cash`}>
                  <section className="flex items-center justify-between py-3 px-3 cursor-pointer">
                    <div className="text-gray-700 font-semibold text-xs">
                      Payment Received In
                    </div>
                    <MdKeyboardArrowRight
                      className="text-violet-500 mr-2 font-bold"
                      size={20}
                    />
                  </section>
                </Link>
              )}
            </>
          ) : selectedPaymentMethod?.name === "Online" ? (
            // Bank payment section
            <>
              {paymentDetails?.bank_ledname ? (
                <div className="flex justify-between items-center p-4">
                  <div className="flex items-center gap-4 cursor-pointer">
                    <PiBankBold size={17} />
                    <p className="text-gray-700 font-semibold text-xs">
                      {paymentDetails.bank_ledname}
                    </p>
                  </div>
                  <Link to={`/sUsers/${tab}/sourceList/Bank`}>
                    <p className="text-violet-500 p-1 px-3 text-xs border border-1 border-gray-300 rounded-2xl cursor-pointer">
                      Change
                    </p>
                  </Link>
                </div>
              ) : (
                <Link to={`/sUsers/${tab}/sourceList/Bank`}>
                  <section className="flex items-center justify-between py-3 px-3 cursor-pointer">
                    <div className="text-gray-700 font-semibold text-xs">
                      Payment Received In
                    </div>
                    <MdKeyboardArrowRight
                      className="text-violet-500 mr-2 font-bold"
                      size={20}
                    />
                  </section>
                </Link>
              )}
            </>
          ) : (
            selectedPaymentMethod?.name === "Cheque" && (
              // Cheque payment section
              <>
                {paymentDetails?.bank_ledname ? (
                  <div className="flex justify-between items-center p-4">
                    <div className="flex items-center gap-4 cursor-pointer">
                      <PiBankBold size={17} />
                      <p className="text-gray-700 font-semibold text-xs">
                        {paymentDetails.bank_ledname}
                      </p>
                    </div>
                    <Link to={`/sUsers/${tab}/sourceList/Cheque`}>
                      <p className="text-violet-500 p-1 px-3 text-xs border border-1 border-gray-300 rounded-2xl cursor-pointer">
                        Change
                      </p>
                    </Link>
                  </div>
                ) : (
                  <Link to={`/sUsers/${tab}/sourceList/Cheque`}>
                    <section className="flex items-center justify-between py-3 px-3 cursor-pointer">
                      <div className="text-gray-700 font-semibold text-xs">
                        Payment Received In
                      </div>
                      <MdKeyboardArrowRight
                        className="text-violet-500 mr-2 font-bold"
                        size={20}
                      />
                    </section>
                  </Link>
                )}

                {/* Cheque details section */}
                <section className="flex items-center gap-4 md:flex-row px-4 pb-4 w-full mt-1 shadow-lg">
                  <div className="w-1/2">
                    <input
                      onChange={handleChequeNumberChange}
                      id="chequeNumber"
                      type="number"
                      value={chequeNumber}
                      placeholder="Cheque Number"
                      className="w-full mt-4 input-number input-field border-b-[1px] border-x-0 border-t-0 outline-none text-gray-600 text-xs"
                      style={{
                        boxShadow: "none",
                        borderColor: "#b6b6b6",
                      }}
                    />
                  </div>
                  <div className="w-1/2">
                    <DatePicker
                      id="chequeDate"
                      value={chequeDate}
                      selected={chequeDate}
                      placeholderText="Cheque Date"
                      onChange={handleChequeDateChange}
                      className="w-full py-2 border-b-[1px] border-x-0 border-t-0 text-gray-600 focus:outline-none !important focus:ring-0 !important text-xs"
                      wrapperClassName="w-full"
                      dateFormat="dd/MM/yyyy"
                      tabIndex="-1"
                     
                    />
                  </div>
                </section>
              </>
            )
          )}
          <hr />
        </>
      )}

      <div className="p-4 mt-4">
        <p
          onClick={handleToggleNote}
          className="flex items-center cursor-pointer  gap-3  text-violet-500 text-xs md:text-md  font-bold "
        >
          {" "}
          <IoAddOutline size={20} /> Add Note/Description
        </p>

        {isNoteOpenFromRedux && (
          <div className="mt-3">
            <input
              value={note}
              onChange={handleNoteChange}
              id=""
              type="text"
              placeholder="Note..."
              className="w-full input-number input-field  border-b-[1px] border-x-0 border-t-0 outline-none text-gray-600 text-xs"
              style={{
                boxShadow: "none",
                borderColor: "#b6b6b6",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentModeTile;
