import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useCallback, memo } from "react";
import { icons } from "../../../components/common/icons/DashboardIcons.jsx";
import { addTab } from "../../../../slices/tallyDataSlice.js";
import { useQuery } from "@tanstack/react-query";
// import { Alert, AlertDescription } from "@/components/ui/alert";

const SkeletonItem = () => (
  <div className="p-4 flex items-center gap-5 bg-gray-100 mb-2 border-b animate-pulse">
    <div className="h-8 w-8 bg-gray-300 rounded"></div>
    <div className="flex-1">
      <div className="h-4 w-24 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 w-32 bg-gray-300 rounded"></div>
    </div>
  </div>
);

const DashboardSummary = () => {
  const [summaryData, setSummaryData] = useState([]);
  const cmp_id = useSelector(
    (state) => state?.secSelectedOrganization?.secSelectedOrg?._id
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const {
  //   data,
  //   // error,
  //   loading: isLoading,
  // } = useFetch(`/api/sUsers/getDashboardSummary/${cmp_id}`);

  // const {data={}}=useQuery({
  //   queryKey: ["getDashboardSummary", cmp_id],
  //   queryFn: () =>
  //     fetch(`/api/sUsers/getDashboardSumary/${cmp_id}`).then((res) =>
  //       res.json()
  //     ),
  //     enabled: !!cmp_id,
  // })

  // console.log("data", data);




  useEffect(() => {
    // if (data) {
      // const {
      //   sales = 0,
      //   purchases = 0,
      //   saleOrders = 0,
      //   receipts = 0,
      //   payments = 0,
      //   cashOrBank = 0,
      //   outstandingPayables = 0,
      //   outstandingReceivables = 0,
      // } = data || {};

      setSummaryData([
        {
          title: "Sales - Credit Note",
          to: "/sUsers/summaryReport",
          value: 0,
          icon: icons.sales,
          summaryType: "Sales Summary",
        },
        {
          title: "Purchase - Debit Note",
          value: 0,
          icon: icons.purchases,
          to: "/sUsers/summaryReport",
          summaryType: "Purchase Summary",
        },
        {
          title: "Receipt",
          value: 0,
          icon: icons.receipts,
        },
        {
          title: "Payment",
          value: 0,
          icon: icons.payments,
        },
        {
          title: "Outstanding Receivables",
          value: 0,
          to: "/sUsers/outstanding",
          icon: icons.outstandingReceivables,
        },
        {
          title: "Outstanding Payables",
          value: 0,
          to: "/sUsers/outstanding",
          icon: icons.outstandingPayables,
        },
        {
          title: "Cash/Bank Balance",
          value: 0,
          to: "/sUsers/balancePage",
          icon: icons.cashOrBank,
        },
        {
          title: "Sale Order",
          value: 0,
          icon: icons.saleOrders,
          to: "/sUsers/orderSummary",
        },
      ]);
    // }
  }, []);

  const handleLinkClick = useCallback(
    (path, value, summaryType = "") => {
      if (path) {
        if (value === "Outstanding Payables") {
          dispatch(addTab("payables"));
          navigate(path);
        } else if (value === "Outstanding Receivables") {
          dispatch(addTab("receivables"));
          navigate(path);
        } else {
          navigate(path, { state: { summaryType: summaryType } });
        }
      }
    },
    [navigate]
  );

  return (
    // <div></div>
    <div className="shadow-lg rounded-lg px-3 py-4 w-full z-10 h-[calc(100vh-277px)] overflow-y-scroll scrollbar-thin">
      {!summaryData ? (
        <>
          {Array.from({ length: 7 }, (_, index) => (
            <SkeletonItem key={index} />
          ))}
        </>
      ) : (
        summaryData.map((item, index) => (
          <div
            onClick={() =>
              handleLinkClick(item?.to, item?.title, item?.summaryType)
            }
            key={index}
            className="p-4 flex items-center gap-5 bg-gray-100 mb-2 border-b shadow-md cursor-pointer hover:bg-slate-100 hover:translate-x-[1px] transition-all"
          >
            <div className="h-8 w-8">{item?.icon}</div>
            <div>
              <p className="text-xs font-bold text-gray-500">
                {" "}
                ₹ {item?.value || 0}
              </p>
              <p className="text-gray-500 font-semibold text-sm mt-1">
                {item.title}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default memo(DashboardSummary);
