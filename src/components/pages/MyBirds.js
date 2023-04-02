import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { storage } from "../../firebase.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { v4 } from "uuid";
import * as tf from '@tensorflow/tfjs';

const MyBirds = () => {
  const [picture, setPicture] = useState(null);
  const [message, setMessage] = useState('');
  const [downloadedPic, setPic] = useState(null);

  const handlePictureRemove = () => {
    
  }

  const handlePictureDisplay = () => {
    setPic('https://firebasestorage.googleapis.com/v0/b/mybirdie-app.appspot.com/o/images%2Fd2fcf579-672b-4e22-8c2c-385a6f90fe19?alt=media&token=d0d99542-4ca8-49b4-b945-054fae916b65');
    setMessage('Enjoy!')
  }

  return (
    <Container>
      <Row>
        <Col>
          <Button className="mt-3" onClick={handlePictureRemove} disabled={!picture}>Remove</Button>
          <Button className="mt-3" onClick={handlePictureDisplay} >Display</Button>
        </Col>
      </Row>
      {message && (
        <Row className="mt-3">
          <Col>
            <div className="alert alert-info">{message}</div>
          </Col>
        </Row>
      )}
      {downloadedPic && (
        <Row className="mt-3">
          <Col>
            <img src={downloadedPic} className="img-fluid" alt="Uploaded Bird" />
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default MyBirds;