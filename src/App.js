import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import Addrestorent from './MainComponents/Addrestorent'
import HomeMain from './MainComponents/HomeMain';
import Homesrc from './MainComponents/Homesrc';
import Aboutus from './MainComponents/Aboutus';
import Detailspage from './MainComponents/Detailspage';
import EditRestorent from './MainComponents/EditRestorent';
import ViewDetails from './MainComponents/ViewDetails';

function App() {
  return (
    <div>
      <Header />
      <Router>
        <Routes>
          
          <Route path='/' element={<Homesrc />} />
          <Route path='/home' element={<HomeMain />} />
          <Route path='/add_restorent' element={<Addrestorent />} />
          <Route path='/Aboutus' element={<Aboutus />} />
          <Route path='/view/:id' element={<Detailspage />} />
          <Route path='/editrestorent/:id' element={<EditRestorent />} />
          <Route path='/viewdetails/:id' element={<ViewDetails />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;

