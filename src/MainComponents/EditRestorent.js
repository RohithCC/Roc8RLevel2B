import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const EditRestorent = () => {
      const { id } = useParams();
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
    axios.get(`https://roc8level2b.onrender.com/api/restaurants/byid/${id}`)
      .then(response => {
        console.log(response)
        setNewRestaurant({
           name: response.data.restaurant.name,
           cuisine: response.data.restaurant.cuisine,
           address: response.data.restaurant.address,
           rating: response.data.restaurant.rating
        })
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


  const handleSubmit = async (e) =>
   {
    e.preventDefault();
    try {
        await axios.put(`https://roc8level2b.onrender.com/api/restaurants/updateid/${id}`, newRestaurant);
        console.log('Restaurant updated successfully:', newRestaurant);
        navigate('/home');
        }
     catch (error)
      {
      console.error('Error updating/creating restaurant:', error);
    }
  };



  return (
    <div>
      <Container>
        <Row className="container-fluid mt-4">
      
          <h2>Edit Restaurant</h2>
          <Col>
            <Form onSubmit={handleSubmit}>
            
                 <Form.Group controlId="formID">
                  <Form.Label>Restaurant ID</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter restaurant ID"
                    name="id"
                    value={id}
                    onChange={handleChange}
                   readOnly
                  />
                </Form.Group>
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
                {newRestaurant.id ? 'Update Restaurant' : 'Add Restaurant'}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EditRestorent;
