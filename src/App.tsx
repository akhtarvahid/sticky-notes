import './App.css';
import CreateSticky from './components/create-sticky/CreateSticky';

function App() {
  return (
    <div className="App">
     <h1>Sticky notes</h1>
     <CreateSticky onCreateSticky={() => {}} />
    </div>
  );
}

export default App;
