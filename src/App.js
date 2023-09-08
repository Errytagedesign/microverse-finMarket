import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './styles/App.css';
import { getCompanies } from './redux/Company/CompanySlice';
import Home from './pages/Home';
import CompanyDetails from './pages/CompanyDetails';
import Footer from './components/Footer';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCompanies());
  }, [dispatch]);

  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="company/:id" element={<CompanyDetails />} />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
