import React, { useState } from "react";
import SearchIcon from "../assets/icons/Search.svg";
import AddIcon from "../assets/icons/Add2.svg";
import Activate from "../assets/icons/Activate.png";
import MoreInfoIcon from "../assets/icons/MoreInfo.svg";
import SettingIcons from "../assets/icons/settings.svg";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import CloseIcon from "../assets/icons/Close.svg";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

const LeftSide = ({
  offices,
  activeOfficeId,
  setActiveOfficeId,
  handleDeleteOffice,
  addOffice,
}) => {
  const [officeName, setOfficeName] = useState(""); // 1. Added State for Date
  const [searchTerm, setSearchTerm] = useState("");
  let [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(""); // add for start date

  // const searchFilteredOffices = offices.filter((office) => {
  //   return office.name.toLowerCase().includes(searchTerm.toLowerCase());
  // });

  const handleOfficeInput = (e) => {
    setOfficeName(e.target.value);
  };

  const handleDateInput = (e) => {
    setStartDate(e.target.value);
  };

  const handleNewOfficeSubmit = () => {
    if (!officeName) {
      alert("Please enter an office name");
      return;
    }
    addOffice(officeName, startDate);

    setOfficeName("");
    setStartDate("");
    setIsOpen(false);
  };

  const handleSpeicificOfficeDelete = (officeId) => {
    handleDeleteOffice(officeId);
  };

  return (
    <>
      <div className="min-h-screen h-full">
        <div className="w-full lg:w-[360px] h-full border-r border-figmaWhite-300 px-4 md:px-5 bg-figmaWhite-200 flex flex-col">
          <div className="w-full h-full">
            <div className="sticky top-0 z-10 bg-figmaWhite-200 pt-4 md:pt-[24px] pb-2">
              <div className="w-full h-auto gap-4 md:gap-[18px]">
                <div className="w-full h-auto gap-2">
                  <div className="font-semibold w-[155px] font-poppins text-figmaBlack-100 text-lg md:text-xl leading-none tracking-normal">
                    Offices
                  </div>
                  <div className="w-full h-auto gap-3 md:gap-[16px] mt-2 flex flex-row flex-wrap text-figmaBlue-100">
                    <div className="h-6 gap-[6px] flex flex-row justify-center items-center">
                      <img src={SettingIcons} alt="" />
                      <p className="ml-[4px] font-poppins cursor-pointer font-normal text-xs md:text-sm whitespace-nowrap">
                        Holidays
                      </p>
                    </div>
                    <div className="h-auto gap-[6px] flex flex-row justify-center items-center">
                      <img src={SettingIcons} alt="setting Icons" />
                      <span className="ml-[2px] font-poppins cursor-pointer text-xs md:text-sm font-normal whitespace-nowrap">
                        Divisons & Trades
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-full h-[42px] gap-[10px] flex flex-row mt-4 md:mt-[18px]">
                  <div className="flex-1 h-[42px] rounded-[4px] border pt-[9px] pr-[12px] pb-[9px] pl-[12px] gap-[10px] bg-figmaWhite-200 border-figmaWhite-500 flex flex-row">
                    <div className="w-full h-[24px] gap-[10px] flex flex-row">
                      <img src={SearchIcon} alt="search icon" />
                      <div className="flex-1 font-poppins font-normal text-sm text-figmaGray-300">
                        <input
                          type="text"
                          placeholder="Search by name..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="bg-transparent outline-none w-full text-figmaBlack-100 mt"
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => setIsOpen(true)}
                    className="w-[42px] h-[42px] rounded-[4px] border p-[9px] gpa-[10px] bg-figmaWhite-400 border-figmaBlue-400 cursor-pointer hover:bg-figmaWhite-300"
                  >
                    <img src={AddIcon} alt="" />
                  </div>

                  <Dialog
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    className="relative z-50 "
                  >
                    <div className="fixed inset-0 flex w-full items-center justify-center p-4 bg-figmaWhite-500/20 backdrop-brightness-50">
                      <DialogPanel className="max-w-lg space-y-4 border w-full  bg-white p-12 rounded-[14px] shadow-xl">
                        <DialogTitle className="font-bold text-xl flex justify-between items-center text-figmaBlack-100">
                          <h2>Add New Office</h2>
                          <img
                            src={CloseIcon}
                            alt="Close"
                            className="cursor-pointer"
                            onClick={() => setIsOpen(false)}
                          />
                        </DialogTitle>

                        <Description as="div">
                          <h5 className="font-poppins text-sm text-figmaGray-200 mb-2">
                            Office Name
                          </h5>
                          <input
                            type="text"
                            value={officeName}
                            onChange={handleOfficeInput}
                            placeholder="Enter office name"
                            className="w-full border border-figmaGray-300 rounded-md p-2 mb-4 text-figmaBlack-100"
                          />

                          <h5 className="font-poppins text-sm text-figmaGray-200 mb-2">
                            Start Date
                          </h5>
                          <input
                            type="date"
                            // value={startDate}
                            onChange={handleDateInput}
                            className="w-full border border-figmaGray-300 rounded-md p-2 mb-4 text-figmaBlack-100"
                          />
                        </Description>

                        <div className="flex gap-4 justify-end mt-6">
                          <button
                            onClick={() => setIsOpen(false)}
                            className="border border-figmaBlue-100 rounded-[2px] p-3 text-figmaBlue-100 font-medium text-sm hover:bg-gray-50"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleNewOfficeSubmit}
                            className="bg-figmaBlue-100 rounded-[2px] p-3 text-figmaWhite-100 font-medium text-sm hover:bg-blue-600"
                          >
                            Add Office
                          </button>
                        </div>
                      </DialogPanel>
                    </div>
                  </Dialog>
                </div>
              </div>

              <div className="w-full h-[24px] gap-[10px] mt-4 md:mt-6 flex flex-row justify-between text-figmaGray-300">
                <div className="font-poppins w-[184px] h-[18px] font-normal text-xs text-figmaGray-400-300 cursor-auto">
                  {offices?.length || 0} Office Total
                </div>
                <div className="flex flex-row gap-[6px] justify-end items-center">
                  <div className="font-poppins font-normal text-xs text-figmaBlue-300 whitespace-nowrap">
                    Show Inactivate
                  </div>
                  <img src={Activate} alt="activate icon" />
                </div>
              </div>
            </div>

            {/* <div className="w-full gap-[10px] mt-[10px] pb-10 overflow-x-hidden overflow-y-auto no-scrollbar scrollbar-hide  h-auto lg:h-[610px]"> */}
            <div className="w-full h-auto gap-[10px] mt-[10px] pb-10 overflow-x-hidden overflow-y-scroll no-scrollbar scrollbar-hide lg:h-[610px]">
              {offices &&
                offices
                  .filter((o) =>
                    o.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((office) => (
                    <div
                      key={office.id}
                      onClick={() => setActiveOfficeId(office.id)}
                      className={`w-full h-auto py-4 md:py-5 border-b text-figmaBlack-100 hover:bg-figmaWhite-100 border-figmaWhite-200 px-3 md:px-[14px] gap-5 flex flex-row justify-between items-center cursor-pointer transition-colors duration-200
                  ${
                    activeOfficeId === office.id
                      ? "bg-figmaWhite-400 rounded-md text-figmaBlack-100"
                      : "bg-transparent hover:bg-gray-50"
                  }`}
                    >
                      <div
                        className={`flex-1 font-poppins text-sm md:text-base ${
                          activeOfficeId === office.id
                            ? "font-medium text-figmaBlack-100"
                            : "font-normal text-figmaGray-100"
                        }`}
                      >
                        {office.name}
                      </div>

                      <Popover className="relative">
                        <PopoverButton className="block text-sm/6 font-semibold focus:outline-none">
                          <img src={MoreInfoIcon} alt="more info icon" />
                        </PopoverButton>
                        <PopoverPanel
                          transition
                          anchor="bottom end"
                          className="divide-y rounded-xl bg-white text-sm/6 transition duration-200 ease-in-out [--anchor-gap:4px] shadow-xl border border-gray-100 z-50 p-1"
                        >
                          <div className="flex flex-col w-[160px]">
                            <button
                              onClick={() => setIsOpen(true)}
                              className="text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                            >
                              Edit Name
                            </button>
                            <button className="text-left px-4 py-2 hover:bg-gray-100 text-gray-700">
                              Deactivate
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSpeicificOfficeDelete(office.id);
                              }}
                              className="text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                            >
                              Delete
                            </button>
                          </div>
                        </PopoverPanel>
                      </Popover>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftSide;
