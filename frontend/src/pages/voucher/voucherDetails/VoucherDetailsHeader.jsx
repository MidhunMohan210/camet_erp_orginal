/* eslint-disable react/prop-types */

import dayjs from "dayjs";
import { useState } from "react";
import VoucherDetailsActionButtons from "./actionButtons/VoucherDetailsActionButtons";

function VoucherDetailsHeader({ data, user, number, tab, reFetch,setActionLoading ,actionLoading}) {
  // eslint-disable-next-line no-unused-vars
  const [refresh, setRefresh] = useState(false);


  // Define when to show buttons or just the share button
  const showAllButtons = user === "secondary";
  const showShareButtonOnly = user === "primary" && tab !== "stockTransfer";
  // const hideButtons = user === "primary" && tab === "stockTransfer";

  return (
    <div>
      <div className="bg-white p-4 mt-3 flex justify-between items-center">
        <div className=" ">
          <p className="text-sm text-violet-500 font-semibold ">
            ID #{number || ""}
          </p>
          <p className="text-xs font-medium text-gray-500 mt-1 ">
            {dayjs(data.date).format("DD/MM/YYYY")}
          </p>
        </div>

        {(showAllButtons || showShareButtonOnly) && (
          // <div className="hidden md:block">
          //   <div className="flex justify-center p-4 gap-12 text-lg text-violet-500 mr-4">
          //     {showAllButtons && (
          //       <>
          //         <CancelButton
          //           id={data._id}
          //           tab={tab}
          //           isCancelled={data?.isCancelled}
          //           reFetch={reFetch}
          //           isEditable={data?.isEditable}
          //           isConverted={data?.isConverted}
          //         />

          //         <div
          //           onClick={() => handleNavigate(editLink)}
          //           className={`${
          //             data?.isCancelled && "pointer-events-none opacity-60"
          //           } flex flex-col justify-center items-center transition-all duration-150 transform hover:scale-110 cursor-pointer`}
          //         >
          //           <FaEdit className="text-blue-500" />
          //           <p className="text-black font-bold text-sm">Edit</p>
          //         </div>

          //         {tab !== "stockTransfer" && (
          //           <SwallFireForPdf data={data} tab={tab} user={user} />
          //         )}

          //         <div
          //           className={`${
          //             data?.isCancelled && "pointer-events-none opacity-60"
          //           } flex flex-col justify-center items-center transition-all duration-150 transform hover:scale-110 cursor-pointer`}
          //         >
          //           <MdTextsms className="text-green-500" />
          //           <p className="text-black font-bold text-sm">Sms</p>
          //         </div>
          //       </>
          //     )}
          //     {/* Show only the share button for primary users and non-stockTransfer tab */}
          //     {showShareButtonOnly && (
          //       <SwallFireForPdf data={data} tab={tab} user={user} />
          //     )}
          //   </div>
          // </div>
          <div className="hidden sm:block">
            <VoucherDetailsActionButtons data={data} reFetch={reFetch} setActionLoading={setActionLoading} actionLoading={actionLoading}/>
          </div>
        )}
      </div>
    </div>
  );
}

export default VoucherDetailsHeader;
