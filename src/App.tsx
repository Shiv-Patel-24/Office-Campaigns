import "./App.css";
import React, { useState, useEffect } from "react";
import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";
import CamLeftSide from "./components/CamLeftSide";
import CamRightSide from "./components/CamRightSide";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

interface Connection {
  id: number;
  division: any;
  trades: any[];
}

interface CampaignItem {
  id: number;
  contactMethod: string;
  template: string;
  time: string;
  edit: string;
}

interface OfficeData {
  id: number;
  name: string;
  startDate?: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  connections: Connection[];
  campaigns: CampaignItem[];
  campaignFrequency?: string;
}

const DEFAULT_CAMPAIGNS = [
  {
    id: 1,
    contactMethod: "Call",
    template: "Intro Call",
    time: "00 d : 00 h : 00 m Left",
    edit: "edit",
  },
  {
    id: 2,
    contactMethod: "Email",
    template: "Follow-up Email",
    time: "01 d : 02 h : 30 m Left",
    edit: "edit",
  },
];

const getFreshCampaigns = () => JSON.parse(JSON.stringify(DEFAULT_CAMPAIGNS));

const makeConnectionsOptions = [
  { value: "Retail", label: "Retail" },
  { value: "Commercial", label: "Commercial" },
  { value: "Sales", label: "Sales" },
];

const makeMultiConnectionOptions = [
  { value: "Siding", label: "Siding" },
  { value: "Roofing", label: "Roofing" },
  { value: "Gutters", label: "Gutters" },
  { value: "Shingles", label: "Shingles" },
  { value: "Trim", label: "Trim" },
  { value: "Windows", label: "Windows" },
];

const makeCampaignContactMethodOptions = [
  { value: "Call", label: "Call" },
  { value: "Email", label: "Email" },
  { value: "SMS", label: "SMS" },
];

const makeCampaignTemplateOptions = [
  { value: "Intro Call", label: "Intro Call" },
  { value: "Follow-up Email", label: "Follow-up Email" },
  { value: "Reminder SMS", label: "Reminder SMS" },
];

function App() {
  const [currentView, setCurrentView] = useState("campaign");

  const [offices, setOffices] = useState<OfficeData[]>([
    {
      id: 1,
      name: "Canvas Reset",
      startDate: "",
      phone: "19492330170",
      address: "123 Main St",
      city: "South Beryltion",
      state: "Maryland",
      zip: "12345",
      contactName: "Cyrus",
      contactPhone: "19492330170",
      contactEmail: "adrien@grady.com",
      connections: [],
      campaigns: getFreshCampaigns(),
      campaignFrequency: "runOnce",
    },
    {
      id: 2,
      name: "Rahesh client",
      startDate: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      contactName: "",
      contactPhone: "",
      contactEmail: "",
      connections: [],
      campaigns: getFreshCampaigns(),
      campaignFrequency: "runOnce",
    },
  ]);

  const [activeOfficeId, setActiveOfficeId] = useState(1);
  const [officeModified, setOfficeModified] = useState(false);

  const [currentCampaignItems, setCurrentCampaignItems] = useState<
    CampaignItem[]
  >([]);
  const [currentFrequency, setCurrentFrequency] = useState("runOnce");
  const [isCampaignModified, setIsCampaignModified] = useState(false);

  useEffect(() => {
    const activeUser = offices.find((o) => o.id === activeOfficeId);
    if (activeUser) {
      setCurrentCampaignItems(
        activeUser.campaigns
          ? JSON.parse(JSON.stringify(activeUser.campaigns))
          : []
      );
      setCurrentFrequency(activeUser.campaignFrequency || "runOnce");
      setIsCampaignModified(false);
    } else {
      setCurrentCampaignItems([]);
      setCurrentFrequency("runOnce");
    }
  }, [activeOfficeId, offices]);

  const activeOffice = offices.find((o) => o.id === activeOfficeId) || {};
  const currentConnectionRows = activeOffice.connections || [];

  const addOffice = (newName: string, newStartDate: string) => {
    const newOfficeId = offices.length + 1 + Date.now();
    const newOffice: OfficeData = {
      id: newOfficeId,
      name: newName,
      startDate: newStartDate,
      phone: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      contactName: "",
      contactPhone: "",
      contactEmail: "",
      connections: [],
      campaigns: getFreshCampaigns(),
      campaignFrequency: "runOnce",
    };
    setOffices((prevOffices) => [...prevOffices, newOffice]);
    setActiveOfficeId(newOfficeId);
    setOfficeModified(false);
    setIsCampaignModified(false);
  };

  const handleDeleteOffice = (officeId: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this?"
    );
    if (confirmDelete) {
      setOffices((prevOffices) => {
        const updatedOffices = prevOffices.filter(
          (office) => officeId !== office.id
        );
        if (officeId === activeOfficeId && updatedOffices.length > 0) {
          setActiveOfficeId(updatedOffices[0].id);
        } else if (updatedOffices.length === 0) {
          setActiveOfficeId(0);
        }
        return updatedOffices;
      });
    }
  };

  const handleUpdateOffice = (data: any) => {
    setOffices((prev) =>
      prev.map((o) =>
        o.id === data.id
          ? {
              ...o,
              ...data,
              connections: o.connections,
              campaigns: o.campaigns,
              campaignFrequency: o.campaignFrequency,
            }
          : o
      )
    );
    setOfficeModified(false);
    alert("Saved Successfully!");
  };

  const addConnectionRow = () => {
    setOffices((prev) =>
      prev.map((o) =>
        o.id === activeOfficeId
          ? {
              ...o,
              connections: [
                ...(o.connections || []),
                { id: Date.now(), division: null, trades: [] },
              ],
            }
          : o
      )
    );
    setOfficeModified(true);
  };
  const handleDivisionChange = (rowId: number, val: any) => {
    setOffices((prev) =>
      prev.map((o) =>
        o.id === activeOfficeId
          ? {
              ...o,
              connections: o.connections.map((c) =>
                c.id === rowId ? { ...c, division: val } : c
              ),
            }
          : o
      )
    );
    setOfficeModified(true);
  };
  const handleTradesChange = (rowId: number, val: any) => {
    setOffices((prev) =>
      prev.map((o) =>
        o.id === activeOfficeId
          ? {
              ...o,
              connections: o.connections.map((c) =>
                c.id === rowId ? { ...c, trades: val } : c
              ),
            }
          : o
      )
    );
    setOfficeModified(true);
  };
  const removeConnectionRow = (rowId: number) => {
    setOffices((prev) =>
      prev.map((o) =>
        o.id === activeOfficeId
          ? { ...o, connections: o.connections.filter((c) => c.id !== rowId) }
          : o
      )
    );
    setOfficeModified(true);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setCurrentCampaignItems((items) => {
      const originalPos = items.findIndex(
        (item) => String(item.id) === String(active.id)
      );
      const newPos = items.findIndex(
        (item) => String(item.id) === String(over.id)
      );

      if (originalPos === -1 || newPos === -1) return items;

      setIsCampaignModified(true);
      return arrayMove(items, originalPos, newPos);
    });
  };

  const handleAddCampaignRow = () => {
    const newRow: CampaignItem = {
      id: Date.now(),
      contactMethod: "Call",
      template: "",
      time: "00 d : 00 h : 00 m Left",
      edit: "edit",
    };
    setCurrentCampaignItems((prev) => [...prev, newRow]);
    setIsCampaignModified(true);
  };

  const handleDeleteCampaignRow = (rowId: number) => {
    if (window.confirm("Delete this step?")) {
      setCurrentCampaignItems((prev) =>
        prev.filter((item) => item.id !== rowId)
      );
      setIsCampaignModified(true);
    }
  };

  const handleUpdateCampaignRow = (
    rowId: number,
    field: string,
    value: any
  ) => {
    setCurrentCampaignItems((prev) =>
      prev.map((item) =>
        item.id === rowId ? { ...item, [field]: value } : item
      )
    );
    setIsCampaignModified(true);
  };

  const handlerSaveCampaignLayout = () => {
    setOffices((prevOffices) =>
      prevOffices.map((office) => {
        if (office.id === activeOfficeId) {
          return {
            ...office,
            campaigns: JSON.parse(JSON.stringify(currentCampaignItems)),
            campaignFrequency: currentFrequency,
          };
        }
        return office;
      })
    );
    setIsCampaignModified(false);
    alert(`Campaign details saved!`);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full bg-figmaWhite-100 overflow-hidden">
      <div className="w-full lg:w-[360px] lg:h-full lg:flex-shrink-0 border-r border-figmaWhite-300 bg-figmaWhite-200 overflow-hidden">
        {/* {currentView === 'office' ? ( */}
        {/* <LeftSide
            offices={offices}
            activeOfficeId={activeOfficeId}
            setActiveOfficeId={setActiveOfficeId}
            handleDeleteOffice={handleDeleteOffice}
            addOffice={addOffice}
            handleAddNewOffice={() => {}} 
          /> */}
        
        {/* ) : ( */}

        <CamLeftSide
          activeUserId={activeOfficeId}
          setActiveUserId={setActiveOfficeId}
          offices={offices}
          addOffice={addOffice}
          handleDeleteOffice={handleDeleteOffice}
          handleUpdateOffice={handleUpdateOffice}
        />
  
        {/* )} */}
      </div>

      <div className="flex-1 h-full overflow-y-auto overflow-x-hidden relative">
        {/* <button 
            onClick={() => setCurrentView(v => v === 'office' ? 'campaign' : 'office')}
            className="absolute top-2 right-10 z-[60] bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-xs font-semibold text-gray-700 transition-colors shadow-sm"
        >
            {currentView === 'office' ? "Switch to Campaign View" : "Switch to Office View"}
        </button> */}

        {/* {currentView === 'office' ? ( */}
        {/* <RightSide
            activeOfficeId={activeOfficeId}
            offices={offices}
            officeModified={officeModified}
            setOfficeModified={setOfficeModified}
            onUpdateOffice={handleUpdateOffice}
            makeConnectionsOptions={makeConnectionsOptions}
            makeMultiConnectionOptions={makeMultiConnectionOptions}
            connectionRows={currentConnectionRows}
            onAddConnection={addConnectionRow}
            onRemoveConnection={removeConnectionRow}
            onDivisionChange={handleDivisionChange}
            onTradesChange={handleTradesChange}
            // Not using 
            addSelect={() => {}} selections={[]} handleSelectionChange={() => {}} onAddButtonClick={() => {}} selectsList={[]} onOptionsChange={() => {}} handlerSelectedMakeConnectionChange={() => {}} selectedMakeConnection={null} multiSelectedMakeConnection={null} handlerMultiSelectedMakeConnectionChange={() => {}} addOffice={addOffice}
          /> */}
        {/* ) : ( */}
        <DndContext
          onDragEnd={handleDragEnd}
          collisionDetection={closestCenter}
        >
          <CamRightSide
            item={currentCampaignItems}
            setItem={setCurrentCampaignItems}
            onSave={handlerSaveCampaignLayout}
            isModified={isCampaignModified}
            setIsModified={setIsCampaignModified}
            frequency={currentFrequency}
            setFrequency={(val: string) => {
              setCurrentFrequency(val);
              setIsCampaignModified(true);
            }}
            onAddRow={handleAddCampaignRow}
            onDeleteRow={handleDeleteCampaignRow}
            onUpdateRow={handleUpdateCampaignRow}
            makeCampaignContactMethodOptions={makeCampaignContactMethodOptions}
            makeCampaignTemplateOptions={makeCampaignTemplateOptions}
          />
        </DndContext>
        {/* )} */}
      </div>
    </div>
  );
}

export default App;
