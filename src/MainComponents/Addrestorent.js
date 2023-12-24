import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './destination.css';

const Destination = () => {
   const navigate = useNavigate();
  const [newRestaurant, setNewRestaurant] = useState({
    name: '',
    cuisine: '',
    address: '',
    rating: 1,
  });
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [fetchedCuisines, setFetchedCuisines] = useState([]);
  const [restaurantData, setRestaurantData] = useState(null);

  useEffect(() => {
    axios.get("https://roc8level2b.onrender.com/api/restaurants")
      .then(response => {
        setOptions(response.data.restaurants);
        setRestaurantData(response.data.restaurants);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewRestaurant((prevRestaurant) => ({
      ...prevRestaurant,
      [name]: value,
    }));
  };

  const handleSelectChange = async (event) => {
    const selectedValue = event.target.value;

    try {
      const response = await axios.get(`https://roc8level2b.onrender.com/api/restaurants/cuisine/${selectedValue}`);
      const cuisines = response.data;

      setFetchedCuisines(cuisines.restaurants);
    } catch (error) {
      console.error('Error fetching cuisines:', error);
    }

    setSelectedOption(selectedValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://roc8level2b.onrender.com/api/restaurants', newRestaurant);

      const createdRestaurant = response.data.restaurant;

      setRestaurantData((prevData) => [...prevData, createdRestaurant]);

      console.log('Restaurant created successfully:', createdRestaurant);
         navigate('/home');
    } catch (error) {
      console.error('Error creating restaurant:', error);
    }
  };


  return (
    <div>
      <Container>
        <Row className="container-fluid mt-4">
          <h2>Add Restarount </h2>
          <Col>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter restaurant name"
                  name="name"
                  value={newRestaurant.name}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formCuisine">
                <Form.Label>Cuisine</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter cuisine"
                  name="cuisine"
                  value={newRestaurant.cuisine}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter address"
                  name="address"
                  value={newRestaurant.address}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formRating">
                <Form.Label>Rating</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter rating"
                  name="rating"
                  value={newRestaurant.rating}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button className="mt-2" variant="primary" type="submit">
                Add Restaurant
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Destination;
