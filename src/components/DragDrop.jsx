import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import EditIcon from "../assets/icons/Edit.svg";
import DeleteIcon from "../assets/icons/Delete.svg";
import DragIcon from "../assets/icons/Drag.svg";

const DragDrop = ({ id, title, contactMethod, time }) => {
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

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="w-full border-b border-figmaWhite-500 h-[60px] flex items-center  py-3 md:py-3 bg-white hover:bg-[#F9FAFB] transition-colors group cursor-pointer"
    >
      <div className="w-full flex flex-row bg--red-500  items-center">
        <div className=" pl-4 flex items-center gap-3 flex-shrink-0">
          <div
            {...attributes}
            {...listeners}
            className=" touch-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <img src={DragIcon} alt="drag" />
          </div>
          <input type="checkbox" className="w-[18px] h-[18px] cursor-pointer" />
        </div>

        <div className="w-[40px] text-center ml-2 font-poppins font-normal text-sm text-figmaGray-100 flex-shrink-0">
          {id}
        </div>

        <div className="w-[210px] font-poppins ml-2 font-normal text-sm text-figmaGray-100 whitespace-nowrap flex-shrink-0">
        {/* <div className="w-[140px]  bg-red-200 font-poppins ml-2 font-normal text-sm text-figmaGray-100 whitespace-nowrap flex-shrink-0"> */}
          {contactMethod}
        </div>

        <div className="flex-1 font-poppins font-normal text-sm text-figmaGray-100 truncate pr-4">
          {title}
        </div>

        <div className="w-[280px] font-poppins font-normal text-sm text-figmaGray-100 whitespace-nowrap flex-shrink-0">
          {time}
        </div>

        <div className="w-[80px] flex justify-center items-center gap-3 pr-4 flex-shrink-0">
          <div className="cursor-pointer hover:scale-110 transition-transform">
            <img src={EditIcon} alt="Edit" />
          </div>
          <div className="cursor-pointer hover:scale-110 transition-transform">
            <img src={DeleteIcon} alt="Delete" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DragDrop;
