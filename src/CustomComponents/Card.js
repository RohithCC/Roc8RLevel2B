import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './card.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



const Card = ({ id, title, description, imageUrl }) => {

  return (
    <div className="card" style={{width: '100%'}}>
     <img
        src={imageUrl}
        alt="Card Image"
        className="card-image"
      />
   <Container>
        <Row className="container-fluid mt-4">
        <Col>
            <h5 className="d-flex justify-content-center mr-4">{title}</h5>
        </Col>
        </Row>
        <Row className="container-fluid mt-4">
        <Col>
           <p className="d-flex justify-content-start mr-4" style={{marginTop: '5px'}}>{description}</p>
        </Col>
        </Row>
</Container>
    </div>
  );
};

export default Card;
