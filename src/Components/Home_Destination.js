
import React from 'react';
import Card from '../CustomComponents/Card'; 
import data from '../CustomComponents/destinationdata.json'; 
import './home.css'

const Home_Destination = () => {
  return (
    <div className="container mt-4 min-height" style={{height: '900px'}}>
      <div className="row">
        {data.map((card) => (
          <div key={card.id} className="col-md-4 mb-4">
            <Card {...card} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home_Destination;
