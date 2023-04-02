import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import { storage } from "../../firebase.js";
import { database } from '../../firebase.js';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { ref as dbRef, set } from "firebase/database";
import { v4 } from "uuid";
import * as tf from '@tensorflow/tfjs';

const Home = ({userId}) => {
  const [picture, setPicture] = useState(null);
  const [message, setMessage] = useState('');

  async function runModel() {
    const model = await tf.loadLayersModel('https://raw.githubusercontent.com/szywyk/mybirdie-app/master/model/model.json');
    let pic = document.getElementById('pic-to-predict')
    let tfTensor = tf.browser.fromPixels(pic)
      .resizeNearestNeighbor([224, 224])
		  .toFloat()
      .div(tf.scalar(255.0))
		  .expandDims();
    
    const pred = model.predict(tfTensor);
    console.log(`Output: ${tf.argMax(pred, -1)}`)
  }

  const handlePictureUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile == null) {
      setMessage('');
    } else {
      if (handlePictureCheck(selectedFile)) {
          setPicture(selectedFile);
          setMessage('');
	    }
      else {
        setPicture(null);
        setMessage('Selected file is not a valid image.')
      }
    }
  }

  const handlePictureCheck = (selectedFile) => {
    if (selectedFile) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (allowedTypes.includes(selectedFile.type)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  const handlePicturePass = () => {
    if (picture) {
      const hash = v4();
      const storageRef = ref(storage, `images/${hash}`);
      uploadBytes(storageRef, picture).then(() => {
        setMessage('Uploaded a picture!');
        setPicture(null)
        getDownloadURL(storageRef).then((url) => {
          saveReference(userId, url, hash);
        });
      });
    }
  }

  const handlePictureRemove = () => {
    setPicture(null);
    setMessage('');
  }

  const saveReference = (userId, url, hash) => {
    set(dbRef(database, `pictures/users/${userId}/${hash}`), url);
  }

  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <Form>
            <Form.Group controlId="pictureUpload">
              <Form.Label>Upload a picture:</Form.Label>
              <Form.Control type="file" onChange={handlePictureUpload} accept="image/*" />
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button className="mt-3 me-3" onClick={handlePicturePass} disabled={!picture}>Pass to Storage</Button>
          <Button className="mt-3" onClick={handlePictureRemove} disabled={!picture}>Remove</Button>
          <Button className="mt-3" onClick={runModel} disabled={!picture}>Predict</Button>
        </Col>
      </Row>
      {message && (
        <Row className="mt-3">
          <Col>
            <div className="alert alert-info">{message}</div>
          </Col>
        </Row>
      )}
      {picture && (
        <Row className="mt-3">
          <Col>
            <img src={URL.createObjectURL(picture)} className="img-fluid" alt="Uploaded Bird" width={224} height={224} id="pic-to-predict" />
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default Home;