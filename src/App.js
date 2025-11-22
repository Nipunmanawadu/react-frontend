import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MakeReservation from './MakeReservation';
import MyReservations from './MyReservations';

function App() {
  return (
    <Router>
      <div style={{ padding: '20px' }}>
        <Routes>
          {/* URL: http://localhost:3000/make-reservation/101 */}
          <Route path="/make-reservation/:carId" element={<MakeReservation />} />
          
          {/* URL: http://localhost:3000/my-reservations */}
          <Route path="/my-reservations" element={<MyReservations />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;