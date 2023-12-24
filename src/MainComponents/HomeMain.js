import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './HomeMain.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RestaurantCard = ({ id, name, cuisines, address, rating, onDelete, onUpdate, onViewDetails }) => {
  const navigate = useNavigate();
 const handleDelete = async (id) => {
    try {
      await axios.delete(`https://roc8level2b.onrender.com/api/restaurants/${id}`);
      console.log(`Restaurant with id ${id} deleted successfully.`);
   onDelete(id);
    } catch (error) {
      console.error('Error deleting restaurant:', error);
    }
  };

  const handleUpdate =  (id) => {
      console.log(id);
    navigate('/editrestorent/:id');
  };

 


  return (
    <div className="card mt-4">
     <Container>
      <Row>
       <Col className="container d-flex justify-flex-start align-items-center"><h2>{name}</h2></Col>

      </Row>
      <Row>
      <Col className="container d-flex justify-flex-start align-items-center"><p>Cuisines: {cuisines}</p></Col>
      </Row>
      <Row>
         <Col className="container d-flex justify-flex-start align-items-center"><p>Address: {address}</p></Col>
      </Row>
      <Row> 
        <Col className="container d-flex justify-flex-start align-items-center"><p>Rating: {rating}</p></Col>
      </Row>
      </Container>
      

      <Container>
      <Row className="mt-4" style={{paddingBottom: '10px'}}>
      <Col className="container d-flex justify-flex-start ">
      <div class="button-container">
     <button className='btn btn-primary' id="button"   onClick={() => onViewDetails(id)}>View Details</button> {" "}
         <button className="btn btn-danger col-md-offset-2" id="button1" onClick={() => onDelete(id)}>Delete</button>
      <button className="btn btn-warning col-md-offset-2" id="button2" onClick={() => onUpdate(id)}>Updating</button>
    </div>
      </Col>
      </Row>
     
      
   
 
      </Container>
      
    </div>
  );
};


export default function HomeMain() {

   const navigate = useNavigate();
  const [options, setOptions] = useState([]);
   const [options1, setOptions1] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOption1, setSelectedOption1] = useState('');
  const [fetchedCuisines, setFetchedCuisines] = useState([]);
    const [fetchedname, setFetchedname] = useState([]);
   const [restaurantData, setRestaurantData] = useState(null);

  useEffect(() => {
    axios.get("https://roc8level2b.onrender.com/api/restaurants")
      .then(response => {
        console.log(response)
        setOptions(response.data.restaurants);
        setOptions1(response.data.restaurants);
        setRestaurantData(response.data.restaurants);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });


  }, []);


 

  const handleSelectChange = async (event) => {
    const selectedValue = event.target.value;

    try {
      const response = await axios.get(`https://roc8level2b.onrender.com/api/restaurants/cuisine/${selectedValue}`);
      const cuisines = response.data;
      console.log(cuisines.restaurants)
      setRestaurantData(cuisines.restaurants);
      console.log(cuisines.restaurants);
    } catch (error) {
   
      console.error('Error fetching cuisines:', error);
    }

 
    setSelectedOption(selectedValue);
  };


   const handleSelectChange1 = async (event) => {
    const selectedValue = event.target.value;
    try {
      const response = await axios.get(`https://roc8level2b.onrender.com/api/restaurants/${selectedValue}`);
      const names = response.data;
      setRestaurantData(names.restaurants);
    } catch (error) {
      console.error('Error fetching names:', error);
    }
    setSelectedOption1(selectedValue);
  };


 
  const handleDelete = async (id) => {

    console.log(id);
    try {
   
      await axios.delete(`https://roc8level2b.onrender.com/api/restaurants/bydelete/${id}`);
      console.log(`Restaurant with id ${id} deleted successfully.`);
      setRestaurantData((prevData) => prevData.filter((restaurant) => restaurant.id !== id));
        navigate('/home');
        window.location.reload();
    } catch (error) {
      console.error('Error deleting restaurant:', error);
    }
  };

  const handleUpdate = (id) => {
    console.log(id);
    console.log(`Update restaurant with id: ${id}`);
    navigate(`/editrestorent/${id}`);
  };

  const handleViewDetails = (id) => {
    console.log(`View details for restaurant with id: ${id}`);
     navigate(`/viewdetails/${id}`);
  };

  


  return (
    <div style={{ overflowY: 'scroll', height: 'calc(100vh - 127px)' }}>
      <Container>
        <Row>
          <Col className='md-12 lg-12 sm-12'>
            <div className="container d-flex justify-flex-start align-items-center">
              <div className="text-center mt-4">
                <h3>Restorent List</h3>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <label htmlFor="dropdown">Filter By Cusine :</label>
          <select id="dropdown" value={selectedOption}  className="form-select" onChange={handleSelectChange}>
            <option value="">Select...</option>
            {options.map(option => (
              <option key={option.id} value={option.cuisine}>
                {option.cuisine}
              </option>
            ))}
          </select>
        
        
        </Row>


         <Row>
      <label htmlFor="dropdown1">Sort By Name:</label>
      <select id="dropdown1" value={selectedOption1}   className="form-select" onChange={handleSelectChange1}>
        <option value="">Select... </option>
        {options1.map(option => (
          <option key={option.id} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    
    </Row>

        <Row>
        
        {console.log(restaurantData)}
             {restaurantData ? (
        restaurantData.map((restaurant) => (
          <RestaurantCard className="mb-4"
            key={restaurant.id}
            id={restaurant.id}
            name={restaurant.name}
            cuisines={restaurant.cuisine}
            address={restaurant.address}
            rating={restaurant.rating}
            onDelete={() => handleDelete(restaurant._id)}
            onUpdate={() => handleUpdate(restaurant._id)}
            onViewDetails={() => handleViewDetails(restaurant._id)}
          />
        ))
      ) : (
        <p>Loading...</p>
      )}
      
        </Row>

      </Container>



    </div>
  )
}
