import React, { useState } from "react";
import SearchIcon from "../assets/icons/Search.svg";
import AddIcon from "../assets/icons/Add2.svg";
import Activate from "../assets/icons/Activate.png";
import MoreInfoIcon from "../assets/icons/MoreInfo.svg";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import CloseIcon from "../assets/icons/Close.svg";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

// For Date and Time Material UI
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";

// Date and Time | rsuitejs
import { DatePicker, Stack } from "rsuite";
import { FaCalendar, FaClock } from "react-icons/fa";
import { BsCalendar2MonthFill } from "react-icons/bs";

const CamLeftSide = ({
  activeUserId,
  setActiveUserId,
  offices = [],
  addOffice,
  handleDeleteOffice,
  handleUpdateOffice,
}) => {
  let [isOpen, setIsOpen] = useState(false);

  const [officeName, setOfficeName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editId, setEditId] = useState(null);

  const filteredOffices = offices.filter((office) =>
    office.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAddModal = () => {
    setEditId(null);
    setOfficeName("");
    setStartDate("");
    setIsOpen(true);
  };

  const handleOpenEditModal = (office) => {
    setEditId(office.id);
    setOfficeName(office.name);
    setStartDate(office.startDate || "");
    setIsOpen(true);
  };

  const handleSubmit = () => {
    if (!officeName) {
      alert("Please enter a campaign name");
      return;
    }

    if (editId) {
      if (handleUpdateOffice) {
        handleUpdateOffice({
          id: editId,
          name: officeName,
          startDate: startDate,
        });
      }
    } else {
      addOffice(officeName, startDate);
    }

    setOfficeName("");
    setStartDate("");
    setEditId(null);
    setIsOpen(false);
  };

  return (
    <>
      <div className="w-full lg:w-[360px] h-full border-r border-figmaWhite-300 px-4 md:px-5 bg-figmaWhite-200 flex flex-col">
        <div className="w-full h-full">
          <div className="sticky top-0 z-10 bg-figmaWhite-200 pt-4 md:pt-[24px] pb-2 ">
            <div className="w-full h-auto gap-4 md:gap-[18px] ">
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
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-transparent outline-none w-full"
                      />
                    </div>
                  </div>
                </div>
                <div
                  onClick={handleOpenAddModal}
                  className="w-[42px] h-[42px] rounded-[4px] border p-[9px] gpa-[10px] bg-figmaWhite-400 border-figmaBlue-400 cursor-pointer hover:bg-figmaWhite-300"
                >
                  <img src={AddIcon} alt="" />
                </div>

                <Dialog
                  open={isOpen}
                  onClose={() => setIsOpen(false)}
                  className="relative z-50 "
                >
                  <div className="fixed inset-0 flex w-full items-center justify-center p-4 bg-figmaWhite-500/20 backdrop-brightness-50 ">
                    <DialogPanel className="max-w-lg space-y-4 border w-full  bg-white p-12 rounded-[14px] shadow-xl">
                      <DialogTitle className="font-bold text-xl flex justify-between items-center text-figmaBlack-100">
                        <h2>{editId ? "Edit Campaign" : "Add New Campaign"}</h2>
                        <img
                          src={CloseIcon}
                          alt="Close"
                          className="cursor-pointer"
                          onClick={() => setIsOpen(false)}
                        />
                      </DialogTitle>

                      <Description as="div">
                        <h5 className="font-poppins text-sm text-figmaGray-200 mb-2">
                          Campaign Name
                        </h5>
                        <input
                          type="text"
                          value={officeName}
                          onChange={(e) => setOfficeName(e.target.value)}
                          className="w-full border border-figmaGray-300 rounded-md p-2 mb-4 text-figmaBlack-100"
                        />

                        <h5 className="font-poppins text-sm text-figmaGray-200 mb-2">
                          Start Date
                        </h5>
                        <input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="w-full border border-figmaGray-300 rounded-md p-2 mb-4 text-figmaBlack-100  "
                        />
                      </Description>
                      <hr />
                      <div className="flex gap-4 justify-end mt-4 divide-y">
                        <button
                          onClick={() => setIsOpen(false)}
                          className="border border-figmaBlue-100 rounded-[2px] p-3 text-figmaBlue-100 font-medium text-sm hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSubmit}
                          className="bg-figmaBlue-100 rounded-[2px] p-3 text-figmaWhite-100 font-medium text-sm hover:bg-blue-600"
                        >
                          {editId ? "Save Changes" : "Add Campaign"}
                        </button>
                      </div>
                    </DialogPanel>
                  </div>
                </Dialog>
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

          <div className="h-auto overflow-y-scroll no-scrollbar">
            {/* <div className="w-full bg-red-50 gap-[10px] mt-[10px] pb-10 overflow-x-hidden overflow-y-scroll no-scrollbar h-auto lg:h-[842px] "> */}
            <div className="w-full  overflow-y-scroll  gap-[10px] mt-[10px] pb-10 overflow-x-hidden  no-scrollbar h-full lg:h-[842px] ">
              {filteredOffices.map((office) => (
                <div
                  key={office.id}
                  onClick={() => setActiveUserId(office.id)}
                  className={`w-full h-auto py-4 md:py-5 border-b  hover:bg-figmaWhite-100 border-figmaWhite-200 px-3 md:px-[14px] gap-5 flex flex-row justify-between items-center cursor-pointer transition-colors ${
                    activeUserId === office.id
                      ? "bg-figmaWhite-400 rounded-md"
                      : ""
                  }`}
                >
                  <div
                    className={`flex-1 font-poppins text-sm md:text-base ${
                      activeUserId === office.id
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
                      <div className="flex flex-col w-[180px] bg-white">
                        <button
                          className="text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenEditModal(office);
                          }}
                        >
                          Edit Campaign Name
                        </button>
                        <button className="text-left px-4 py-2 hover:bg-gray-100 text-gray-700">
                          Deactivate Campaign
                        </button>
                        <button
                          className="text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteOffice(office.id);
                          }}
                        >
                          Delete Campaign
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

export default CamLeftSide;
