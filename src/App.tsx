import { useEffect } from 'react';
import './App.css';
import CreateSticky from './components/create-sticky/CreateSticky';
import { BASE_STICKY_API } from './utils/env';

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
    </div>
  );
}

export default App;
