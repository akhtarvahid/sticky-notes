import { useEffect } from 'react';
import './App.css';
import CreateSticky from './components/create-sticky/CreateSticky';
import { BASE_STICKY_API } from './utils/env';
import StickyList from './components/stickies-list/StickyList';

const stickiesData = [
  {id: '1', title: 'Blue Sticky', body:''},
  {id: '2', title: 'Red Sticky', body:''},
  {id: '3', title: 'Green Sticky', body:''}
];
function App() {

  useEffect(() => {
    const getStickies = async () => {
      const res = await fetch(`${BASE_STICKY_API}/sticky`);
      const stickies = await res.json();
      console.log(stickies);
    }
    getStickies();
  }, [])

  return (
    <div className="App">
     <h1>Sticky notes</h1>
     <CreateSticky onCreateSticky={() => {}} />
     <StickyList stickies={stickiesData} deleteSticky={() => {}} setSelectedSticky={() => {}} />
    </div>
  );
}

export default App;
