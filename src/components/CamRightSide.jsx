import React, { useState } from "react";
import MatrixIcon from "../assets/icons/Matrix.svg";
import AddIcons from "../assets/icons/Add2.svg";
import ChevronIcon from "../assets/icons/ChevronIcon.svg";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import DragDrop from "./DragDrop";

const CamRightSide = ({
  item,
  onSave,
  isModified,
  frequency,
  setFrequency,
  onAddRow,
  onDeleteRow,
  onUpdateRow,
  makeCampaignContactMethodOptions,
  makeCampaignTemplateOptions,
  values,
  placeholder,
  values2,
  placeholder2,
  option2 = [],
  option22 = [],
  onChange,
  onChange2,
}) => {
  const [activeTab, setActiveTab] = useState("campaign");
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const buttonStyle = {
    backgroundColor: isModified ? "#2F80ED" : "#F2F2F2",
    color: isModified ? "#FFFFFF" : "#828282",
    cursor: isModified ? "pointer" : "not-allowed",
  };

  const handleRadioChange = (e) => {
    setFrequency(e.target.id);
  };

  const selectedTemplates = item.map((i) => i.template);

  const getOptionsForRow = (currentRowTemplate) => {
    return makeCampaignTemplateOptions.filter((option) => {
      return (
        !selectedTemplates.includes(option.value) ||
        option.value === currentRowTemplate
      );
    });
  };

  return (
    <div className="h-full w-full flex flex-col overflow-hidden bg-white">
      <div className="flex-shrink-0 z-50 bg-white ">
        <div className="w-full border-b border-figmaWhite-500">
          <div className="w-full h-auto py-4 md:h-[62px] px-4 md:px-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-0">
            <div className="font-poppins font-semibold text-lg md:text-xl text-figmaBlack-100">
              Campaign Details
            </div>
            <button
              onClick={onSave}
              style={buttonStyle}
              disabled={!isModified}
              className="px-4 py-2 rounded-[4px] font-poppins text-sm whitespace-nowrap transition-all border-none"
            >
              Save Changes
            </button>
          </div>
        </div>

        <div className="w-full mt-4 md:mt-[20px] px-[20px]">
          <div className="w-full flex flex-row overflow-x-auto gap-4 md:gap-[34px] text-figmaGray-200 bg-white no-scrollbar border-b border-figmaWhite-500">
            {["campaign", "results rules", "timer settings", "source"].map(
              (tab) => (
                <div
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-[12px] cursor-pointer whitespace-nowrap -mb-[1px] ${
                    activeTab === tab
                      ? "border-b-[3px] border-figmaBlue-100"
                      : "border-b-[2px] border-transparent"
                  }`}
                >
                  <p
                    className={`text-xs md:text-sm font-poppins capitalize ${
                      activeTab === tab
                        ? "font-medium text-figmaBlue-100"
                        : "font-normal"
                    }`}
                  >
                    {tab}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden p-[20px] bg-white">
        <div className="w-full h-full max-w-7xl mx-auto bg-figmaWhite-100 border border-figmaWhite-300 rounded-[14px] flex flex-col overflow-hidden">
          <div className="flex-shrink-0 p-4 md:p-[20px] border-b border-figmaWhite-300 bg-figmaWhite-100 z-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div className="font-poppins font-medium text-base text-figmaBlack-100">
                Campaign Frequency
              </div>
              <div className="flex items-center gap-2 cursor-pointer text-figmaBlue-100 mt-2 md:mt-0">
                <img src={MatrixIcon} alt="Matrix Icon" />
                <span className="font-poppins font-normal text-sm">
                  View Analytics
                </span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <div className="flex items-center gap-[10px]">
                <input
                  type="radio"
                  id="runOnce"
                  name="runcamp"
                  checked={frequency === "runOnce"}
                  onChange={handleRadioChange}
                  className="cursor-pointer"
                />
                <label
                  htmlFor="runOnce"
                  className="font-poppins font-normal text-sm text-figmaGray-100 cursor-pointer"
                >
                  Run Campaign once
                </label>
              </div>
              <div className="flex items-center gap-[10px]">
                <input
                  type="radio"
                  id="runUnlimited"
                  name="runcamp"
                  checked={frequency === "runUnlimited"}
                  onChange={handleRadioChange}
                  className="cursor-pointer"
                />
                <label
                  htmlFor="runUnlimited"
                  className="font-poppins font-normal text-sm text-figmaGray-100 cursor-pointer"
                >
                  Run Campaign Unlimited
                </label>
              </div>
            </div>
            <div className="flex flex-col md:flex-row w-full justify-between items-start md:items-center gap-4">
              <div className="font-poppins font-medium text-base text-figmaBlack-100">
                Contact Details
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto z-50">
                <div className="relative">
                  <div
                    onClick={() => setOpen(!open)}
                    tabIndex={0}
                    className="w-full sm:w-[200px] h-[42px] border border-figmaWhite-500 rounded-[4px] flex justify-between items-center px-2 bg-white cursor-pointer"
                  >
                    <p className="text-sm text-figmaGray-200 truncate">
                      {values ? values : placeholder}
                    </p>
                    <img
                      src={ChevronIcon}
                      alt="down"
                      className={`transition-all ${
                        open ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </div>
                  {open && (
                    <div className="absolute top-[45px] left-0 w-full max-h-[200px] bg-white border border-figmaWhite-500 rounded-md shadow-lg overflow-y-auto z-50">
                      {option2.map((opt, i) => (
                        <div
                          key={i}
                          onClick={() => {
                            onChange(opt);
                            setOpen(false);
                          }}
                          className={`flex py-2 px-3 cursor-pointer hover:bg-gray-100`}
                        >
                          <span className="text-sm text-figmaBlue-300">
                            {opt}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative">
                  <div
                    onClick={() => setOpen2(!open2)}
                    tabIndex={0}
                    className="w-full sm:w-[200px] h-[42px] border border-figmaWhite-500 rounded-[4px] flex justify-between items-center px-2 bg-white cursor-pointer"
                  >
                    <p className="text-sm text-figmaGray-200 truncate">
                      {values2 ? values2 : placeholder2}
                    </p>
                    <img
                      src={ChevronIcon}
                      alt="down"
                      className={`transition-all ${
                        open2 ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </div>
                  {open2 && (
                    <div className="absolute top-[45px] left-0 w-full max-h-[200px] text-figmaGray-300 bg-white border border-figmaWhite-500 rounded-md shadow-lg overflow-y-auto z-50">
                      {option22.map((opt, i) => (
                        <div
                          key={i}
                          onClick={() => {
                            onChange2(opt);
                            setOpen2(false);
                          }}
                          className={`flex py-2 px-3 cursor-pointer hover:bg-gray-100`}
                        >
                          <span className="text-sm text-figmaBlue-300 font-poppins">
                            {opt}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-hidden relative">
            <div className="w-full h-full overflow-y-auto no-scrollbar">
              <div className="min-w-[900px]">
                <div className="sticky top-0 z-10 bg-figmaWhite-100 border-b border-figmaWhite-500">
                  <div className="flex flex-row items-center py-3 px-2 text-figmaBlue-300 font-medium text-sm">
                    <div className="w-[50px] pl-4 ml-6">
                      <input type="checkbox" className="w-[18px] h-[18px]" />
                    </div>
                    <div className="w-[40px] text-center">#</div>
                    <div className="w-[190px]">Contact Method</div>
                    <div className="flex-1 pl-2">Template</div>
                    <div className="w-[280px]">Time (Days : Hours : Mins)</div>
                    <div className="w-[80px] text-center pr-4">Action</div>
                  </div>
                </div>

                <div className="pb-4">
                  <SortableContext
                    items={item}
                    strategy={verticalListSortingStrategy}
                  >
                    {item.map((itm, index) => (
                      <DragDrop
                        key={itm.id}
                        id={itm.id}
                        displayId={index + 1}
                        title={itm.template}
                        contactMethod={itm.contactMethod}
                        time={itm.time}
                        onDelete={() => onDeleteRow(itm.id)}
                        onUpdate={(field, val) =>
                          onUpdateRow(itm.id, field, val)
                        }
                        contactOptions={makeCampaignContactMethodOptions}
                        templateOptions={getOptionsForRow(itm.template)}
                      />
                    ))}
                  </SortableContext>

                  <div
                    onClick={onAddRow}
                    className="flex flex-row items-center gap-[10px] mt-4 ml-4 cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <div className="w-9 h-9 rounded-[4px] border border-figmaBlue-400 bg-figmaWhite-400 flex items-center justify-center">
                      <img src={AddIcons} alt="add icon" />
                    </div>
                    <div className="font-poppins font-normal text-sm text-figmaBlue-100">
                      Add New
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CamRightSide;
