import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './styles/App.css';
import Navigation from './components/Navigation';
import { getMissions } from './redux/Company/CompanySlice';
import Home from './pages/Home';
import CompanyDetails from './pages/CompanyDetails';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMissions());
  }, [dispatch]);
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="company/:id" element={<CompanyDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
