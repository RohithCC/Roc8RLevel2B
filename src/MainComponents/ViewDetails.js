import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const ViewDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newRestaurant, setNewRestaurant] = useState({
    name: '',
    cuisine: '',
    address: '',
    rating: null,
  });

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

  return (
    <div>
 <Container>
      <Row>
        <Col><h2>Restorent details</h2></Col>
      </Row>
        <Row>
        <Col><h2>New Restorent</h2></Col>
      </Row>
      <Row>
        <Col> <ol type="1">
                <li> <p>Name: {newRestaurant.name}</p></li>
                <li> <p>Cuisine: {newRestaurant.cuisine}</p></li>
                 <li> <p>Address: {newRestaurant.address}</p></li>   
                <li> <p>Rating: {newRestaurant.rating}</p></li>
            </ol></Col>
      
      </Row>
      <Row>
        <Col><h2>Menu</h2></Col>
      </Row>
      <Row>
        <Col> <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            {/* Add more menu items as needed */}
          </ul></Col>
      </Row>
       <Row>
        <Col> <h2>Reviews</h2></Col>
      </Row>
         <Row>
        <Col>
            <ul>
            <li>Great food and services Rating: {newRestaurant.rating}</li>
          </ul>
        </Col>
      </Row>
    </Container>




    </div>
  )
}

export default ViewDetails;
