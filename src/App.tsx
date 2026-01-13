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
  {
    id: 3,
    contactMethod: "SMS",
    template: "Reminder SMS",
    time: "00 d : 05 h : 00 m Left",
    edit: "edit",
  },
];

// Helper to create a fresh copy of campaigns so User 1 and User 2 don't share references
const getFreshCampaigns = () => JSON.parse(JSON.stringify(DEFAULT_CAMPAIGNS));

const INITIAL_OFFICE_DATA: OfficeData[] = [
  {
    id: 1,
    name: "Canvas Reset",
    phone: "19492330170",
    address: "123 Main St",
    city: "South Beryltion",
    state: "Maryland",
    zip: "12345",
    contactName: "Cyrus",
    contactPhone: "19492330170",
    contactEmail: "adrien@grady.com",
    connections: [],
    campaigns: getFreshCampaigns(), // Deep copy
  },
  {
    id: 2,
    name: "Rahesh client",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    connections: [],
    campaigns: getFreshCampaigns(), //Deep copy
  },
  {
    id: 3,
    name: "Storm FolloUp",
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
  },
  {
    id: 4,
    name: "Reschedule",
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
  },
  {
    id: 5,
    name: "Confirmation",
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
  },
];

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

function App() {
  const [currentView, setCurrentView] = useState("office");

  const [offices, setOffices] = useState<OfficeData[]>([
    {
      id: 1,
      name: "Canvas Reset",
      phone: "19492330170",
      address: "123 Main St",
      city: "South Beryltion",
      state: "Maryland",
      zip: "12345",
      contactName: "Cyrus",
      contactPhone: "19492330170",
      contactEmail: "adrien@grady.com",
      connections: [],
      campaigns: getFreshCampaigns(), // Deep copy
    },
    {
      id: 2,
      name: "Rahesh client",
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
    },
  ]);
  const [activeOfficeId, setActiveOfficeId] = useState(1);
  const [officeModified, setOfficeModified] = useState(false);

  const [currentCampaignItems, setCurrentCampaignItems] = useState<
    CampaignItem[]
  >([]);
  const [isCampaignModified, setIsCampaignModified] = useState(false);

  const [options, setOptions] = useState("");
  const [options2, setOptions2] = useState("");
  const month = ["Jan", "Feb"];

  useEffect(() => {
    const activeUser = offices.find((o) => o.id === activeOfficeId);
    if (activeUser) {
      setCurrentCampaignItems(activeUser.campaigns || []);
      setIsCampaignModified(false);
    } else {
      setCurrentCampaignItems([]);
    }
  }, [activeOfficeId, offices]);

  const activeOffice = offices.find((o) => o.id === activeOfficeId) || {};
  const currentConnectionRows = activeOffice.connections || [];

  const handleAddNewOffice = (newOfficeData: OfficeData) => {
    console.log("handleAddnewOffice clicked");
    setOffices((prevOffices) => [...prevOffices, newOfficeData]);
    console.log("new office data will be added", newOfficeData);
  };

  const addOffice = () => {
    const newOfficeId = offices.length + 1;
    const newOffice: OfficeData = {
      id: newOfficeId + Date.now(),
      // name : `New Office ${newOfficeId}`,
      name: "",
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
    };
    handleAddNewOffice(newOffice);
    console.log("addOffice clicked", newOffice);
  };

  const handleDeleteOffice = (officeId: number) => {
    setOffices((prevOffices) =>
      prevOffices.filter((offices) => officeId !== offices.id)
    );
    console.log("office data will be deleted", officeId);
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

  const handleUpdateOffice = (data: any) => {
    setOffices((prev) =>
      prev.map((o) =>
        o.id === data.id
          ? {
              ...o,
              ...data,
              connections: o.connections,
              campaigns: o.campaigns,
            }
          : o
      )
    );
    setOfficeModified(false);
    alert("Office Info Saved!");
  };

  const getTaskPos = (id: number) =>
    currentCampaignItems.findIndex((task) => task.id === id);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setCurrentCampaignItems((items) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);
      setIsCampaignModified(true);
      return arrayMove(items, originalPos, newPos);
    });
  };

  const handlerSaveCampaignLayout = () => {
    setOffices((prevOffices) =>
      prevOffices.map((office) => {
        if (office.id === activeOfficeId) {
          return {
            ...office,
            campaigns: currentCampaignItems,
          };
        }
        return office;
      })
    );
    setIsCampaignModified(false);
    alert(`Campaign layout saved for User ID: ${activeOfficeId}`);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full bg-figmaWhite-100 overflow-hidden">
      <div className="w-full lg:w-[360px] lg:h-full lg:flex-shrink-0 border-r border-figmaWhite-300 bg-figmaWhite-200 overflow-hidden">
        {/* {currentView === 'office' ? ( */}
        {/* <LeftSide
          offices={offices}
          activeOfficeId={activeOfficeId}
          setActiveOfficeId={setActiveOfficeId}
          handleAddNewOffice={handleAddNewOffice}
          handleDeleteOffice={handleDeleteOffice}

          addOffice={addOffice}
        /> */}

        {/* // ) : ( */}

        <CamLeftSide
          activeUserId={activeOfficeId}
          setActiveUserId={setActiveOfficeId}
          offices={offices}
        />
        {/* )} */}
      </div>

      <div className="flex-1 h-full overflow-y-auto overflow-x-hidden relative">
        {/* <button 
            onClick={() => setCurrentView(v => v === 'office' ? 'campaign' : 'office')}
            className="absolute top-2 right-10 z-[60] bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-xs font-semibold text-gray-700 transition-colors"
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
          addSelect={() => {}}
          selections={[]}
          handleSelectionChange={() => {}}
          onAddButtonClick={() => {}}
          selectsList={[]}
          onOptionsChange={() => {}}
          handlerSelectedMakeConnectionChange={() => {}}
          selectedMakeConnection={null}
          multiSelectedMakeConnection={null}
          handlerMultiSelectedMakeConnectionChange={() => {}}
          addOffice={addOffice}

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
            month={month}
            values={options}
            onChange={(newValue: any) => setOptions(newValue)}
            placeholder="Default Track1"
            option2={["Jan"]}
            values2={options2}
            onChange2={(newValue: any) => setOptions2(newValue)}
            placeholder2="Move Campaign"
            option22={["Feb"]}
            layout={currentCampaignItems}
          />
        </DndContext>
        {/* )} */}
      </div>
    </div>
  );
}

export default App;
