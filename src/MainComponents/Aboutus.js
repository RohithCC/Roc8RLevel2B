import React from 'react'
import Home_Top_reports from '../Components/Home_Top_reports'
import { Container, Row, Col } from 'react-bootstrap';
import './report.css';


export default function Reports() {
  const items = ['Connect with us on social media platforms. Follow us on Social Media for the latest updates and news.', 'We value your feedback and appreciate your interest in Website Name. We look forward to connecting with you!'];


  return (
    <div>
     <Home_Top_reports />
     <Container>
      <Row>
      <div className="container-fluid">
      <div className="container-content">
        <h2>Contact Us</h2>
          <p>Have questions or suggestions? We'd love to hear from you! Feel free to reach out to us through the following channels:</p>

      <ul className="item-list">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
    </div>
  
      </Row>
     
   
     </Container>

  
    </div>
  )
}
