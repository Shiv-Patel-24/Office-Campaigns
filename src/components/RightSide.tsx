import React, { useState, useEffect } from "react";
import ActivateIcon from "../assets/icons/Activate.svg";
import AddIcond from "../assets/icons/Add2.svg";
import ChevronIcon from "../assets/icons/ChevronIcon.svg";
import Select from "react-select";
import CheckIcon from "../assets/icons/Check.svg";
import CloseIcon from "../assets/icons/Close.svg";

const RightSide = ({
  activeOfficeId,
  offices,
  onUpdateOffice,
  officeModified,
  setOfficeModified,

  makeConnectionsOptions,
  makeMultiConnectionOptions,
  connectionRows, 
  onAddConnection, 
  onDivisionChange, 
  onTradesChange, 
  onRemoveConnection,
}) => {
  const [activeTab, setActiveTab] = useState("officeDetails");

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
  });

  useEffect(() => {
    if (offices && activeOfficeId) {
      const currentOffice = offices.find((o) => o.id === activeOfficeId);
      if (currentOffice) {
        setFormData({
          id: currentOffice.id,
          name: currentOffice.name || "",
          phone: currentOffice.phone || "",
          address: currentOffice.address || "",
          city: currentOffice.city || "",
          state: currentOffice.state || "Maryland",
          zip: currentOffice.zip || "",
          contactName: currentOffice.contactName || "",
          contactPhone: currentOffice.contactPhone || "",
          contactEmail: currentOffice.contactEmail || "",
        });
      }
    }
  }, [activeOfficeId, offices]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setOfficeModified(true);
  };

  const buttonStyle = {
    backgroundColor: officeModified ? "#2F80ED" : "#EFEEED",
    color: officeModified ? "white" : "#828282",
    cursor: officeModified ? "pointer" : "not-allowed",
  };

  const handleSaveClick = () => {
    if (onUpdateOffice) {
      onUpdateOffice(formData);
    }
  };

  return (
    <div className="h-full w-full flex flex-col overflow-hidden ">
      <div className="flex-shrink-0 z-50 bg-white">
        <div className="w-full border-b border-figmaWhite-500">
          <div className="w-full h-auto py-4 md:h-[75px] px-4 md:px-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-0">
            <div className="font-poppins font-semibold text-lg md:text-xl text-figmaBlack-100">
              Office details
            </div>
            <div
              onClick={handleSaveClick}
              style={buttonStyle}
              className="w-auto px-4 py-2 rounded-[4px] bg-figmaWhite-300 cursor-pointer transition-colors"
            >
              <div className="font-poppins font-normal text-sm leading-[169%] tracking-normal text-figmaGray-300 whitespace-nowrap">
                Save Changes
              </div>
            </div>
          </div>
        </div>

        <div className="w-full mt-4 md:mt-[20px] px-[20px]">
          <div className="w-full flex flex-row overflow-x-auto gap-4 md:gap-[34px] text-figmaGray-200 no-scrollbar border-b border-figmaWhite-500">
            <div
              onClick={() => setActiveTab("officeDetails")}
              className={`min-w-[93px] h-[33px] pb-[12px] cursor-pointer whitespace-nowrap -mb-[1px] ${
                activeTab === "officeDetails"
                  ? "border-b-[3px] border-figmaBlue-100"
                  : ""
              }`}
            >
              <p
                className={`text-xs md:text-sm font-poppins ${
                  activeTab === "officeDetails"
                    ? "font-medium text-figmaBlue-100"
                    : "font-normal"
                }`}
              >
                Office Details
              </p>
            </div>

            <div
              onClick={() => setActiveTab("makeConnections")}
              className={`min-w-[130px] h-[33px] pb-[12px] cursor-pointer whitespace-nowrap -mb-[1px] ${
                activeTab === "makeConnections"
                  ? "border-b-[2px] border-figmaBlue-100 text-figmaBlue-100"
                  : "border-b-[2px] border-transparent"
              }`}
            >
              <p className="text-xs font-normal w-[130px] h-[21px] md:text-sm font-poppins">
                Make Connections
              </p>
            </div>

            <div
              onClick={() => setActiveTab("officeTerrito")}
              className={`min-w-[114px] h-[33px] pb-[12px] cursor-pointer whitespace-nowrap -mb-[1px] ${
                activeTab === "officeTerrito"
                  ? "border-b-[2px] border-figmaBlue-100"
                  : "border-b-[2px] border-transparent"
              }`}
            >
              <p className="text-xs w-[104px] h-[21px] font-normal md:text-sm font-poppins">
                Office Territo
              </p>
            </div>

            <div
              onClick={() => setActiveTab("officeHolidays")}
              className={`min-w-[105px] h-[33px] pb-[12px] cursor-pointer whitespace-nowrap -mb-[1px] ${
                activeTab === "officeHolidays"
                  ? "border-b-[2px] border-figmaBlue-100 text-figmaBlue-100 "
                  : "border-b-[2px] border-transparent"
              }`}
            >
              <p className="text-xs md:text-sm font-poppins">Office Holidays</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden md:pl-[20px] md:pt-[20px] md:pr-[20px]">
        <div className="w-full h-full sticky top-0 overflow-y-scroll no-scrollbar pb-5 ">
          {activeTab === "officeDetails" && (
            <div className="w-full max-w-7xl gap-[20px]">
              <div className="w-full h-auto rounded-[8px] border p-4 md:p-[20px] bg-figmaWhite-100 border-figmaWhite-300">
                <div className="w-full h-auto gap-[24px] flex flex-col">
                  <div className="h-auto">
                    <p className="font-poppins font-medium text-base leading-[100%] tracking-[0] text-figmaBlack-100">
                      Office Info
                    </p>
                  </div>
                  <div className="w-full h-auto gap-[20px]">
                    <div className="w-full h-auto gap-[20px] flex flex-col lg:flex-row">
                      <div className="h-auto w-full gap-[10px] flex flex-col">
                        <div className="w-[98px] h-[21px] font-poppins font-normal text-sm leading-[100%] tracking-[0] text-figmaGray-200">
                          <p>
                            Office Name{" "}
                            <span className="text-figmaRed-100">*</span>
                          </p>
                        </div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full h-[42px] rounded-[4px] border p-2 border-figmaWhite-500 font-poppins font-normal text-sm leading-[100%] tracking-[0] text-figmaBlack-100"
                          placeholder="conner Bridge"
                        />
                        <div className="font-poppins w-[87px] h-[18px] italic text-xs leading-[100%] tracking-[0] text-figmaGray-100">
                          <p>Max 100 words</p>
                        </div>
                      </div>
                      <div className="w-full h-auto gap-[10px]">
                        <p className="font-poppins w-[55px] h-[21px] font-normal text-sm leading-[100%] tracking-[0] text-figmaGray-200">
                          Phone <span className="text-figmaRed-100">*</span>
                        </p>
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full h-[42px] rounded-[4px] p-2 mt-[10px] border text-figmaGray-100 border-figmaWhite-500"
                          placeholder="19492330170"
                        />
                      </div>
                    </div>

                    <div className="w-full h-auto gap-[10px] mt-[20px]">
                      <p className=" font-poppins w-[68px] h-[21px] font-normal text-sm leading-[100%] tracking-[0] text-figmaGray-100">
                        Address <span className="text-figmaRed-100">*</span>
                      </p>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full h-[42px] rounded-[4px] p-2 border border-figmaWhite-500 font-poppins font-normal text-sm leading-[100%] tracking-[0] text-figmaBlack-100 mt-[10px]"
                        placeholder="123 Main St"
                      />
                    </div>

                    <div className="flex flex-col md:flex-row w-full h-auto mt-[20px] gap-[20px]">
                      <div className="w-full h-auto gap-[10px]">
                        <p className="font-poppins font-normal w-[38px] h-[21px] text-sm text-figmaGray-200 leading-[100%] tracking-[0] ">
                          City <span className="text-figmaRed-100">*</span>
                        </p>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="mt-[10px] w-full h-[42px] rounded-[4px] border p-2 border-figmaWhite-500 font-poppins font-normal text-sm leading-[100%] tracking-[0] text-figmaBlack-100"
                          placeholder="South Beryltion"
                        />
                      </div>
                      <div className="w-full h-auto gap-[10px]">
                        <p className="font-poppins font-normal w-[48px] h-[21px] text-sm text-figmaGray-200 leading-[100%] tracking-[0]">
                          State <span className="text-figmaRed-100">*</span>
                        </p>
                        <div className="w-full h-[42px] rounded-tr-[4px] rounded-br-[4px] border border-figmaWhite-500 flex flex-row justify-between items-center px-2 mt-[10px]">
                          {formData.state}{" "}
                          <img src={ChevronIcon} alt="Chevron Icon" />
                        </div>
                      </div>
                      <div className="w-full h-auto gap-[10px]">
                        <p className="font-poppins font-normal w-[32px] h-[21px] text-sm leading-[100%] tracking-[0] text-figmaGray-200">
                          Zip <span className="text-figmaRed-100">*</span>
                        </p>
                        <input
                          type="text"
                          name="zip"
                          value={formData.zip}
                          onChange={handleInputChange}
                          className="mt-[10px] w-full p-2 h-[42px] rounded-[4px] border border-figmaWhite-500 font-poppins font-normal text-sm leading-[100%] tracking-[0] text-figmaBlack-100"
                          placeholder="12345"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full h-auto mt-[20px] rounded-[8px] border p-4 md:p-[20px] bg-figmaWhite-100 border-figmaWhite-300">
                <div className="w-full h-auto gap-[24px]">
                  <p className="font-poppins w-[100px] h-6 font-medium text-base text-figmaBlack-100">
                    Contact Info
                  </p>
                  <div className="w-full h-auto gap-[20px] flex flex-col lg:flex-row mt-[24px]">
                    <div className="w-full h-auto gap-[10px]">
                      <p className="font-poppins font-normal w-[114px] h-[21px] text-sm text-figmaGray-200">
                        Contact Name{" "}
                        <span className="text-figmaRed-100">*</span>
                      </p>
                      <input
                        type="text"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleInputChange}
                        className="w-full h-[42px] mt-[10px] p-2 rounded-[4px] border border-figmaWhite-500 font-poppins font-normal text-sm leading-[100%] tracking-[0] text-figmaBlack-100"
                        placeholder="Cyrus"
                      />
                    </div>
                    <div className="w-full h-auto gap-[10px]">
                      <p className="font-poppins font-normal w-[115px] h-[21px] text-sm text-figmaGray-200">
                        Contact Phone{" "}
                        <span className="text-figmaRed-100">*</span>
                      </p>
                      <input
                        type="text"
                        name="contactPhone"
                        value={formData.contactPhone}
                        onChange={handleInputChange}
                        className="w-full h-[42px] mt-[10px] p-2 rounded-[4px] border border-figmaWhite-500 font-poppins font-normal text-sm leading-[100%] tracking-[0] text-figmaBlack-100"
                        placeholder="19492330170"
                      />
                    </div>
                  </div>

                  <div className="w-full h-auto gap-[10px] mt-[20px]">
                    <p className="font-poppins w-[110px] h-[21px] font-normal text-sm text-figmaGray-200">
                      Contact Email <span className="text-figmaRed-100">*</span>
                    </p>
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      className="w-full md:w-[538px] h-[42px] mt-[10px] rounded-[4px] border p-2 border-figmaWhite-500 font-poppins font-normal text-sm leading-[100%] tracking-[0] text-figmaBlack-100"
                      placeholder="adrien.oberbrunner@grady.com"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "makeConnections" && (
            <div className="w-full max-w-7xl h-auto rounded-[8px] border p-4 md:p-[20px] gap-[10px] bg-figmaWhite-100 border-figmaWhite-300">
              <div className="w-full h-auto gap-6 ">
                <div className="w-full h-auto gap-[40px] flex flex-row justify-between items-center">
                  <div className="font-poppins font-medium text-base text-figmaBlack-100">
                    Division & Trade List
                  </div>
                  <div
                    className="w-[36px] h-[36px] rounded-[4px] border p-[6px] gap-[10px] bg-figmaWhite-400 border-figmaBlue-400 cursor-pointer"
                    onClick={onAddConnection} 
                  >
                    <img src={AddIcond} alt="Add" />
                  </div>
                </div>

                {connectionRows &&
                  connectionRows.map((row) => (
                    <div
                      key={row.id}
                      className="flex flex-row w-full h-auto mt-4 border-b border-dotted pb-4"
                    >
                      <div className="w-2/5 h-auto ">
                        <p className="font-poppins font-normal text-sm text-figmaGray-200">
                          Divison
                        </p>
                        <Select
                          className="w-[280px] h-full mt-[10px]"
                          value={row.division} 
                          onChange={(val) => onDivisionChange(row.id, val)} 
                          options={makeConnectionsOptions}
                        />
                      </div>

                      <div className="w-full h-auto ">
                        <p className="font-poppins font-normal text-sm text-figmaGray-200">
                          Trades
                        </p>
                        <Select
                          className="w-full h-full mt-[10px]"
                          value={row.trades} 
                          onChange={(val) => onTradesChange(row.id, val)} 
                          options={makeMultiConnectionOptions}
                          isMulti
                        />
                      </div>
                      <div className="flex flex-row items-center gap-2 ml-4">
                        <img
                          src={CloseIcon}
                          alt="Close"
                          className="cursor-pointer hover:opacity-70 items-center mt-5"
                          onClick={() => onRemoveConnection(row.id)} 
                        />
                        <img
                          src={CheckIcon}
                          alt="Check"
                          className="cursor-pointer mt-5"
                        />
                        
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {activeTab === "officeTerrito" && (
            <div className="w-full max-w-7xl h-auto md:h-[300px] rounded-[8px] border p-4 md:p-[20px] bg-figmaWhite-100 border-figmaWhite-300">
              <p className="font-poppins w-[114px] font-medium text-base">
                Office Territo
              </p>
            </div>
          )}

          {activeTab === "officeHolidays" && (
            <div className="w-full max-w-7xl h-auto rounded-[8px] border overflow-hidden p-4 md:p-[20px] bg-figmaWhite-100 border-figmaWhite-300">
              <div className="w-full h-auto gap-6">
                <div className="font-poppins font-medium text-base text-figmaBlack-100">
                  Holiday List
                </div>
                <div className="w-full h-auto gap-5 mt-6">
                  <div className="w-full border-b pb-5 pl-2 gap-[10px] text-figmaWhite-100">
                    <div className="w-full flex flex-row justify-between px-2">
                      <div className="font-poppins font-medium text-sm text-figmaBlue-300">
                        Date
                      </div>
                      <div className="font-poppins font-medium text-sm text-figmaBlue-300">
                        Day
                      </div>
                      <div className="font-poppins font-medium text-sm text-figmaBlue-300">
                        Holiday
                      </div>
                      <div className="w-[24px]"></div>
                    </div>
                  </div>
                  <div className="w-full h-auto border-b py-4 px-2 gap-[10px] flex flex-row justify-center items-center text-figmaWhite-100 border-figmaWhite-500">
                    <div className="w-full flex flex-row items-center justify-between">
                      <div className="font-poppins font-normal text-xs md:text-sm text-figmaGray-100 leading-none tracking-normal">
                        01 Jan
                      </div>
                      <div className="font-poppins font-normal text-xs md:text-sm text-figmaGray-100 leading-none tracking-normal">
                        Monday
                      </div>
                      <div className="font-poppins font-normal text-xs md:text-sm text-figmaGray-100 leading-none tracking-normal">
                        New Years
                      </div>
                      <div>
                        <img src={ActivateIcon} alt="Activate" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RightSide;
