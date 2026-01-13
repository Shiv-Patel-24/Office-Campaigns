import React, { useState } from "react";
import SearchIcon from "../assets/icons/Search.svg";
import AddIcon from "../assets/icons/Add2.svg";
import Activate from "../assets/icons/Activate.png";
import MoreInfoIcon from "../assets/icons/MoreInfo.svg";
import SettingIcons from "../assets/icons/settings.svg";

const LeftSide = ({
  offices,
  activeOfficeId,
  setActiveOfficeId,
  handleAddNewOffice,
  handleDeleteOffice,
  addOffice,
}) => {
  const handleInputChange = (e) => {
    console.log("input changed : ", e.target.value);
  };

  const [officeName, setOfficeName] = useState("");

  const handleOfficeInputForCreatingNewOffice = (e) => {
    setOfficeName(e.target.value);
    console.log("office name : ", officeName);
  };

  const handleNewOffice = () => {
    handleAddNewOffice(officeName);
    setOfficeName("");
  };

  // for popup from submit
  const [showModalOpen, setShowModalOpen] = useState(false);

  const openModal = () => {
    setShowModalOpen(true);
  };

  const closeModal = () => {
    setShowModalOpen(false);
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
                          className="bg-transparent outline-none w-full text-figmaBlack-100 mt"
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div onClick={handleAddNewOffice} className="w-[42px] h-[42px] rounded-[4px] border p-[9px] gpa-[10px] bg-figmaWhite-400 border-figmaBlue-400"> */}

                  {/* <div
                    onClick={handleNewOffice}
                    className="w-[42px] h-[42px] rounded-[4px] border p-[9px] gpa-[10px] bg-figmaWhite-400 border-figmaBlue-400"
                  >
                    <img src={AddIcon} alt="" />
                  </div> */}

                  <div
                    onClick={openModal}
                    className="w-[42px] h-[42px] rounded-[4px] border p-[9px] gpa-[10px] bg-figmaWhite-400 border-figmaBlue-400"
                  >
                    <img src={AddIcon} alt="" />
                  </div>

                  <div
                    className={`fixed inset-0 flex items-center justify-center z-50 ${
                      showModalOpen ? "" : "hidden"
                    }`}
                  >
                    <div
                      className="absolute inset-0 bg-black opacity-50"
                      onClick={closeModal}
                    ></div>
                    <div className="bg-white rounded-lg p-6 z-10 w-[90%] max-w-md">
                      <h2 className="text-xl font-semibold mb-4">
                        Add New Office
                      </h2>
                      <input
                        type="text"
                        value={officeName}
                        onChange={handleOfficeInputForCreatingNewOffice}
                        placeholder="Enter office name"
                        className="w-full border border-figmaGray-300 rounded-md p-2 mb-4"
                      />
                      {/* Currently add the office. But, name is not being saved properly */}

                      <div className="mt-4 flex justify-end gap-2">
                        {/* <button onClick={handleAddNewOffice} className="bg-figmaBlue-400 text-white px-4 py-2 rounded-md">Submit</button>
                        <button onClick={closeModal} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">Cancel</button> */}
                        <button
                          onClick={handleNewOffice}
                          className="bg-figmaBlue-400 text-white px-4 py-2 rounded-md"
                        >
                          Save
                        </button>
                        <button onClick={closeModal}>Cancel</button>
                      </div>
                    </div>
                  </div>
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

            <div className="w-full gap-[10px] mt-[10px] pb-10 overflow-x-hidden overflow-y-auto no-scrollbar scrollbar-hide  h-auto lg:h-[610px]">
              {offices &&
                offices.map((office) => (
                  <div
                    key={office.id}
                    onClick={() => setActiveOfficeId(office.id)}
                    className={`w-full h-auto py-4 md:py-5 border-b hover:bg-figmaWhite-100 border-figmaWhite-200 px-3 md:px-[14px] gap-5 flex flex-row justify-between items-center cursor-pointer transition-colors duration-200
                  ${
                    activeOfficeId === office.id
                      ? "bg-figmaWhite-400 rounded-md"
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

export default LeftSide;
