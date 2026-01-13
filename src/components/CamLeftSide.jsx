import React from "react";
import SearchIcon from "../assets/icons/Search.svg";
import AddIcon from "../assets/icons/Add2.svg";
import Activate from "../assets/icons/Activate.png";
import MoreInfoIcon from "../assets/icons/MoreInfo.svg";

const CamLeftSide = ({
  activeUserId,
  setActiveUserId,
  offices = [], 
}) => {
  return (
    <>
      <div className="w-full lg:w-[360px] h-full border-r border-figmaWhite-300 px-4 md:px-5 bg-figmaWhite-200 flex flex-col">
        <div className="w-full h-full">
          <div className="sticky top-0 z-10 bg-figmaWhite-200 pt-4 md:pt-[24px] pb-2">
            <div className="w-full h-auto gap-4 md:gap-[18px]">
              <div className="font-poppins font-semibold text-lg md:text-xl text-figmaBlack-100">
                Campaign
              </div>
              <div className="w-full h-[42px] gap-[10px] flex flex-row mt-4 md:mt-[18px]">
                <div className="flex-1 h-[42px] rounded-[4px] border pt-[9px] pr-[12px] pb-[9px] pl-[12px] gap-[10px] bg-figmaWhite-200 border-figmaWhite-500 flex flex-row">
                  <div className="w-full h-[24px] gap-[10px] flex flex-row">
                    <img src={SearchIcon} alt="search icon" />
                    <div className="flex-1 font-poppins font-normal text-sm text-figmaGray-300">
                      <input
                        type="text"
                        placeholder="Search by name..."
                        className="bg-transparent outline-none w-full"
                      />
                    </div>
                  </div>
                </div>
                <div  className="w-[42px] h-[42px] rounded-[4px] border p-[9px] gpa-[10px] bg-figmaWhite-400 border-figmaBlue-400">
                  <img src={AddIcon} alt="" />
                </div>
              </div>
            </div>

            <div className="w-full h-[24px] gap-[10px] mt-4 md:mt-6 flex flex-row justify-between text-figmaGray-300">
              <div className="font-poppins font-normal text-xs text-figmaGray-400-300">
                {offices.length} Forms Total
              </div>
              <div className="flex flex-row gap-[6px] justify-end items-center">
                <div className="font-poppins font-normal text-xs text-figmaBlue-300 whitespace-nowrap">
                  Show Inactivate
                </div>
                <img src={Activate} alt="activate icon" />
              </div>
            </div>
          </div>

          <div className="">
            <div className="w-full gap-[10px] mt-[10px] pb-10 overflow-x-hidden no-scrollbar h-auto lg:h-[842px] ">
              
              {offices.map((office) => (
                 <div
                 key={office.id}
                 onClick={() => setActiveUserId(office.id)} 
                 className={`w-full h-auto py-4 md:py-5 border-b  hover:bg-figmaWhite-100 border-figmaWhite-200 px-3 md:px-[14px] gap-5 flex flex-row justify-between items-center cursor-pointer transition-colors ${
                   activeUserId === office.id ? "bg-figmaWhite-400 rounded-md" : ""
                 }`}
               >
                 <div className={`flex-1 font-poppins text-sm md:text-base ${
                    activeUserId === office.id ? "font-medium text-figmaBlack-100" : "font-normal text-figmaGray-100"
                 }`}>
                   {office.name}
                 </div>
                 <img src={MoreInfoIcon} alt="more info icon" />
               </div>
              ))}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CamLeftSide;