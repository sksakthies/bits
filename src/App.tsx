import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <div className="relative min-h-screen bg-dark-deeper overflow-hidden">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home/>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;