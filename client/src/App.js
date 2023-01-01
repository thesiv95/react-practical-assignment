import {useEffect} from 'react';
import './App.css';
import doAPIRequest from './utils/doAPIRequest';

function App() {

  useEffect(() => {
    // TEST API, it might be removed
    doAPIRequest('/live').then(res => console.log(res)).catch(e => console.error(e));
  }, []);

  return (
    <div className="App">
      TASK IMPLEMENTATION HERE
    </div>
  );
}

export default App;
