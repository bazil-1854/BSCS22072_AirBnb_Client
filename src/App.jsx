import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './assets/Navbar';
import Home from './Components/Home/Home';
import Footer from './assets/Footer';
import ListingDetails from './Components/Home/ListingDetails';
import SearchListings from './Components/SearchListings';
import Booking from './Components/GuestBooking/Booking';
import SignUpForm from './Components/Authentication/SignUp';
import SignInnForm from './Components/Authentication/SignIn';
import Profile from './Components/Authentication/Profile';
import AddListing from './Components/Host/AddListing';
import HostedListings from './Components/Host/HostedListings';
import EditListing from './Components/Host/EditListing ';
import GuestBookings from './Components/GuestBooking/GetBookings';

function App() {

  return (

    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchListings />} />
        <Route path="/listing/:id" element={<ListingDetails />} />
        <Route path="/booking/:listingId" element={<Booking />} />

        <Route path="/signUp" element={<SignUpForm />} />
        <Route path="/signIn" element={<SignInnForm />} />

        <Route path="/profile" element={<Profile />} />


        <Route path="/add-listing" element={<AddListing />} />
        <Route path="/host-listing" element={<HostedListings />} /> 
        <Route path="/update-listing/:id" element={<EditListing />} /> 
        
        <Route path="/reserved-bookings" element={<GuestBookings />} /> 

        

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
