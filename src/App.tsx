import { useState } from 'react';
import CreateSticky from './components/create-sticky/CreateSticky';
import { Sticky } from './types/create-sticky/create-sticky.type';
import { BASE_STICKY_API } from './utils/env';
import StickyList from './components/stickies-list/StickyList';

const stickiesData = [
   {id: '1', title: 'Shopping', body: 'created to maintain shopping lists'},
   {id: '2', title: 'Office', body: 'created to maintain office todo'},
   {id: '3', title: 'Groceries', body: 'created to maintain groceries lists'},
   {id: '4', title: 'Medicines', body: 'created to maintain medicines requirement'}
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
