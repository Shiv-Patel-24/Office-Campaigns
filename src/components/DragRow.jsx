import React from "react";
import { useDrop, useDrag } from "react-dnd";
import CamRightSide from "./CamRightSide";
import DragIcon from "../assets/icons/Drag.svg";

const DragRow = ({ moveItem, item }) => {
  const HandlerFindItem = (id) => {
    const itemObj = item.filter((c) => c.id === id)[0];
    console.log("itemObj console", itemObj);
    return {
      item: itemObj,
      index: item.indexOf(itemObj),
    };
  };

  const [drop] = useDrop({
    accept: "row",
    drop: (updateItems, monitor) => {
      const dragIndex = updateItems.index;
      const hoverIndex = findItem(updateItems.id).index;
      if (dragIndex === hoverIndex) {
        return;
      }
      moveItem(dragIndex, hoverIndex);
      updateItems.index = hoverIndex;
    },
  });

  return (
    <div
      ref={drop}
      className="w-[320px] h-[60px] border border-figmaWhite-400 rounded-[4px] bg-figmaWhite-100 flex flex-row items-center p-[10px] gap-[10px] mb-[10px]"
    >
      {item.map((item, index) => (
        <CamRightSide
          imgSrc={DragIcon}
          key={item.id}
          id={item.id}
          item={item}
          index={index}
          moveItem={moveItem}
          HandlerFindItem={HandlerFindItem}
        />
      ))}
    </div>
  );
};

export default DragRow;
