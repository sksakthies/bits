import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
const App = () => {
  return (
    <Router>
      <div className="relative min-h-screen bg-[#0f1428] overflow-hidden">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home/>} />
              <Route path="/profile" element={<Profile/>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;