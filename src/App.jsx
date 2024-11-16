import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './assets/Navbar';
import Home from './Components/Home/Home';
import Footer from './assets/Footer';
import ListingDetails from './Components/Home/ListingDetails';
import SearchListings from './Components/SearchListings';
import Booking from './Components/Booking';
import SignUpForm from './Components/Authentication/SignUp';
import SignInnForm from './Components/Authentication/SignIn';

function App() {

  return (

    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchListings />} />
        <Route path="/listing/:id" element={<ListingDetails />} />
        <Route path="/booking/:id" element={<Booking />} />

        <Route path="/signUp" element={<SignUpForm />} />
        <Route path="/signIn" element={<SignInnForm />} />



      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
