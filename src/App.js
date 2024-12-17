import { Route, Routes } from 'react-router-dom';
import './styles/App.css';
import StartPage from './pages/StartPage';
import MetroInfoPage from './pages/MetroInfoPage';

function App() {
  return (
    <div className="body">
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/metro" element={<MetroInfoPage />} />
      </Routes>
    </div>
  );
}

export default App;
