import { useState } from 'react';
import CreateSticky from './components/create-sticky/CreateSticky';
import { Sticky } from './types/create-sticky/create-sticky.type';
import { BASE_STICKY_API } from './utils/env';
import StickyList from './components/stickies-list/StickyList';

const stickiesData = [
  {id: '1', title: 'Blue Sticky', body:''},
  {id: '2', title: 'Red Sticky', body:''},
  {id: '3', title: 'Green Sticky', body:''}
];
function App() {
  const [stickies, setStickies] = useState<Sticky[]>([]);



  const handleCreateSticky = (sticky: Sticky) => {
    setStickies((s) => [...s, sticky]);
  }
  return (
    <div className="sticky-root">
      <div className="sticky">
        <h1>Sticky notes</h1>
        <CreateSticky onCreateSticky={handleCreateSticky} />
        <StickyList stickies={stickiesData} deleteSticky={() => {}} setSelectedSticky={() => {}} />
    </div>
    </div>
  );
}

export default App;
