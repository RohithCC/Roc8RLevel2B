import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import data from '../CustomComponents/destinationdata.json';
import './detailed.css';
import { Container, Row, Col } from 'react-bootstrap';

const DetailsPage = () => {
  const { id } = useParams();
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`../CustomComponents/destinationdata.${id}.json`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        console.log(response)
        //const data = await response.json();
        console.log(data)
        setJsonData(data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, [id]);

  if (!jsonData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {jsonData.map((item) => (
        item.id == id ? (
            <>
          <div style={{backgroundColor: `${item.color}`}}>
         <div key={item.id}>
         <div className="container d-flex justify-content-center align-items-center mt-3" >
                    <div className="text-center">
                        <h1>{item.title}</h1>
                        <span>Explore the Beauty of {item.title}</span>
                    </div>
          </div>          
        </div>
          </div>
          <div>
          <div className="container-fluid">
      <div className="container-content">
        <h1>Welcome to {item.title}</h1>
        <p>{item.txt1}</p>
        <div className="card-container">
         <p>{item.txt2}</p>
        </div>
        <h3>Discover the Charm of {item.title} cities</h3>
          

            <Container>
      <Row>
        <Col xs={12} md={6}>
          <div className="your-content">
          <div className="custom-col">
      <div className="your-content">
        <h5>{item.citie1}</h5>
      </div>
          </div>
         </div>
          <div className="container-content">
          <span>{item.txt3}</span>
        
          </div>
        </Col>
        <Col xs={12} md={6}>
        <div className="your-content">
          <div className="custom-col">
      <div className="your-content">
        <h5>{item.citie2}</h5>
    </div>
    </div>
   
           
          </div>
          <div className="container-content">
    <p>{item.txt4}</p>
     
    </div>
        </Col>
      </Row>
    </Container>
    <div className='min-height'>
    <h3>{item.txt5}</h3>
        <p>{item.txt6}</p>
     
    </div>
     </div>
    </div>
          </div>
            </>
       
        ) : (<></>)
       
        // If you're using a component other than Card, pass the necessary props accordingly
      ))}

    </div>
  );
};

export default DetailsPage;
