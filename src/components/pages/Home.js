import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import { storage } from "../../firebase.js";
import { database } from '../../firebase.js';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ref as dbRef, set } from "firebase/database";
import { v4 } from "uuid";
import * as tf from '@tensorflow/tfjs';
import speciesNames from '../../speciesNames.json';

const Home = ({ userId }) => {
  const [picture, setPicture] = useState(null);
  const [message, setMessage] = useState('');
  const [modelPicture, setModelPicture] = useState(null);
  const [name, setName] = useState('');

  async function runModel() {
    const model = await tf.loadLayersModel('https://raw.githubusercontent.com/szywyk/mybirdie-app/master/model/model.json');
    let pic = document.getElementById('pic-to-predict')
    let tfTensor = tf.browser.fromPixels(pic)
      .resizeNearestNeighbor([224, 224])
      .toFloat()
      .div(tf.scalar(255.0))
      .expandDims();

    const pred = model.predict(tfTensor);
    pred.softmax().data().then((v) => {
      const values = v;
      tf.argMax(pred, -1).data().then((prediction) => {
        const percent = values[prediction];
        const species = Object.keys(speciesNames)[prediction];
        setMessage(`We are ${(percent * 100).toFixed(2)}% sure that your bird's name is`);
        setName(`${species}`);
        getDownloadURL(ref(storage, `birdsModelPictures/${species}/1.jpg`))
          .then(url => {
            setModelPicture(url);
          })
          .catch(error => {
            console.log(error)
          })
      });
    });
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
        setMessage(`${name} saved in 'My Birds'!`);
        setPicture(null);
        setModelPicture(null);
        setName('');
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

  const handleYes = () => {
    if (userId) {
      handlePicturePass();

    } else {
      setMessage(`That's great! If you want to save your birds for later, please sign in.`)
    }
  }

  const handleNo = () => {
    setModelPicture(null);
    setName('');
    setMessage('Sorry to hear that.');
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
          <Button className="mt-3 me-3" onClick={handlePictureRemove} disabled={!picture}>Remove</Button>
          <Button className="mt-3 me-3" onClick={runModel} disabled={!picture}>Predict</Button>
        </Col>
      </Row>
      {picture && (
        <Row className="mt-3">
          <Col>
            <img src={URL.createObjectURL(picture)} className="img-fluid" alt="Uploaded Bird" width={224} height={224} id="pic-to-predict" />
          </Col>
        </Row>
      )}
      {message && (
        <Row className="mt-3">
          <Col>
            <h2>{message}</h2>
          </Col>
        </Row>
      )}
      {name && (
        <Row className="mt-3">
          <Col>
            <h1>{name}</h1>
          </Col>
        </Row>
      )}
      {modelPicture && (
        <>
          <Row className="mt-3">
            <Col>
              <h2>Is this your bird?</h2>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <img src={modelPicture} className="img-fluid" alt="Model Bird" width={224} height={224} id="model-pic" />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <Button className='me-3' onClick={handleYes}>YES</Button>
              <Button className='me-3' onClick={handleNo}>NO</Button>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}

export default Home;