import { useState } from "react";
import CreateSticky from "./components/create-sticky/CreateSticky";
import { Sticky, StickyResponse } from "./types/create-sticky/create-sticky.type";
import StickyList from "./components/stickies-list/StickyList";

const stickiesData = [
  { id: "1", title: "Blue Sticky", body: "" },
  { id: "2", title: "Red Sticky", body: "" },
  { id: "3", title: "Green Sticky", body: "" },
] as unknown as Sticky[];

function App() {
  const [selectedSticky, setSelectedSticky] = useState<StickyResponse | null>(null);
  const [stickies, setStickies] = useState<Sticky[]>(stickiesData || []);

  const handleCreateSticky = (sticky: Sticky) => {
    setStickies((s) => [...s, sticky]);
  };
  const handleDeleteSticky = (id: string) => {
    setStickies((s) => s.filter((sticky: any) => sticky.id !== id));
  };
  const handleUpdateSticky = (sticky: any) => {
    setStickies((s) => s.map((s: any) => (s.id === sticky.id ? sticky : s)));
    setSelectedSticky(null);
  };
  
  return (
    <div className="sticky-root">
      <div className="sticky">
        <h1>Sticky notes</h1>
        <CreateSticky
          onCreateSticky={handleCreateSticky}
          onUpdateSticky={handleUpdateSticky}
          selectedSticky={selectedSticky}
        />
        <StickyList
          stickies={stickies}
          deleteSticky={handleDeleteSticky}
          setSelectedSticky={setSelectedSticky}
        />
      </div>
    </div>
  );
}

export default App;
