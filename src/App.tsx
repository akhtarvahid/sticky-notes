import { useState } from 'react';
import CreateSticky from './components/create-sticky/CreateSticky';
import { Sticky } from './types/create-sticky/create-sticky.type';

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
      </div>
    </div>
  );
}

export default App;
