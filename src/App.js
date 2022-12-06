import './App.css';
import Login from './pages/Login/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Room from './pages/Room/Room';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/room' element={<Room/>}/>
      </Routes>
    </Router>
  );
}

export default App;
