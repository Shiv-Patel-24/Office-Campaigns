import React, { useState, useEffect } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import EditIcon from "../assets/icons/Edit.svg";
import DeleteIcon from "../assets/icons/Delete.svg";
import DragIcon from "../assets/icons/Drag.svg";
import Select from "react-select";

const DragDrop = ({
  id,
  displayId,
  title,
  contactMethod,
  time,
  onDelete,
  onUpdate,
  contactOptions,
  templateOptions,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    position: "relative",
    zIndex: isDragging ? 50 : "auto",
  };

  const [timeValues, setTimeValues] = useState({ d: 0, h: 0, m: 0 });

  useEffect(() => {
    // Expected format: "XX d : XX h : XX m Left"
    // We use Regex to extract digits-- google " "
    const regex = /(\d+)\s*d\s*:\s*(\d+)\s*h\s*:\s*(\d+)\s*m/;
    const match = time.match(regex);
    if (match) {
      setTimeValues({
        d: parseInt(match[1]) || 0,
        h: parseInt(match[2]) || 0,
        m: parseInt(match[3]) || 0,
      });
    }
  }, [time]);

  const handleTimeChange = (field, value) => {
    const val = parseInt(value) || 0;

    // Limits
    let cleanVal = val;
    if (field === "h" && val > 23) cleanVal = 23;
    if (field === "m" && val > 59) cleanVal = 59;
    if (cleanVal < 0) cleanVal = 0;

    const newValues = { ...timeValues, [field]: cleanVal };
    setTimeValues(newValues);

    // Reconstruct String
    // "00 d : 00 h : 00 m Left"
    // Helper to pad with 0
    const pad = (n) => n.toString().padStart(2, "0");
    const newTimeString = `${pad(newValues.d)} d : ${pad(
      newValues.h
    )} h : ${pad(newValues.m)} m Left`;

    onUpdate("time", newTimeString);
  };

  const getSelectedValue = (options, value) => {
    if (!options) return null;
    return options.find((opt) => opt.value === value) || null;
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="w-full border-b border-figmaWhite-500 h-[60px] flex items-center py-3 md:py-3 bg-white hover:bg-[#F9FAFB] transition-colors group"
    >
      <div className="w-full flex flex-row items-center">
        <div className=" pl-4 flex items-center gap-3 flex-shrink-0">
          <div
            {...attributes}
            {...listeners}
            className="cursor-pointer touch-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <img src={DragIcon} alt="drag" />
          </div>
          <input type="checkbox" className="w-[18px] h-[18px] cursor-pointer" />
        </div>

        <div className="w-[40px] text-center ml-2 font-poppins font-normal text-sm text-figmaGray-100 flex-shrink-0">
          {displayId}
        </div>

        <div className="w-[190px] font-poppins ml-2 mr-5 font-normal text-sm text-figmaGray-100 whitespace-nowrap flex-shrink-0">
          <Select
            options={contactOptions}
            onChange={(opt) => onUpdate("contactMethod", opt.value)}
            value={getSelectedValue(contactOptions, contactMethod)}
            menuPortalTarget={document.body}
            styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
          />
        </div>

        <div className="flex-1 font-poppins font-normal text-sm text-figmaGray-100 pr-4">
          <Select
            options={templateOptions}
            onChange={(opt) => onUpdate("template", opt.value)}
            value={getSelectedValue(templateOptions, title)}
            menuPortalTarget={document.body}
            styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
            placeholder="Select Template..."
            noOptionsMessage={() => "No other templates available"}
          />
        </div>

        <div className="w-[280px] font-poppins font-normal text-sm text-figmaGray-100 whitespace-nowrap flex-shrink-0 flex items-center gap-2">
          <div className="flex items-center">
            <input
              type="number"
              value={timeValues.d}
              onChange={(e) => handleTimeChange("d", e.target.value)}
              className="w-[36px] h-[30px] border border-gray-300 rounded text-center text-sm outline-none focus:border-blue-500"
            />
            <span className="ml-1 text-xs text-gray-400">d</span>
          </div>
          <span className="text-gray-400">:</span>
          <div className="flex items-center">
            <input
              type="number"
              value={timeValues.h}
              onChange={(e) => handleTimeChange("h", e.target.value)}
              className="w-[36px] h-[30px] border border-gray-300 rounded text-center text-sm outline-none focus:border-blue-500"
            />
            <span className="ml-1 text-xs text-gray-400">h</span>
          </div>
          <span className="text-gray-400">:</span>
          <div className="flex items-center">
            <input
              type="number"
              value={timeValues.m}
              onChange={(e) => handleTimeChange("m", e.target.value)}
              className="w-[36px] h-[30px] border border-gray-300 rounded text-center text-sm outline-none  focus:border-blue-500"
            />
            <span className="ml-1 text-xs text-gray-400">m</span>
          </div>
          <span className="text-xs text-gray-400 ml-1">Left</span>
        </div>

        <div className="w-[80px] flex justify-center items-center gap-3 pr-4 flex-shrink-0">
          <div className="cursor-pointer hover:scale-110 transition-transform">
            <img src={EditIcon} alt="Edit" />
          </div>
          <div
            className="cursor-pointer hover:scale-110 transition-transform"
            onClick={onDelete}
          >
            <img src={DeleteIcon} alt="Delete" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DragDrop;
