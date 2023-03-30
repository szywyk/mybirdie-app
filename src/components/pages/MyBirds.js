import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import storage from "../../firebase.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { v4 } from "uuid";
import * as tf from '@tensorflow/tfjs';

//const model = tf.loadLayersModel('../../../../model/model.json');

const MyBirds = () => {
  const [picture, setPicture] = useState(null);
  const [message, setMessage] = useState('');
  const [downloadedPic, setPic] = useState(null);
  const [model, setModel] = useState();

  const url = {
    model: '../../../model/model.json',
  };

  async function loadModel(url) {
    try {
      // For layered model
      const model = await tf.loadLayersModel(url.model);
      // For graph model
      // const model = await tf.loadGraphModel(url.model);
      setModel(model);
      console.log("Load model success")
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(()=>{
    tf.ready().then(()=>{
      loadModel(url)
    });
    },[])

  const handlePictureUpload = (event) => {
    const selectedFile = event.target.files[0]
    if (selectedFile == null) {
      setMessage('')
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
      const storageRef = ref(storage, `images/${v4()}`);
      uploadBytes(storageRef, picture).then(() => {
        setMessage('Uploaded a picture!');
        setPicture(null)
        getDownloadURL(storageRef).then((url) => {
          console.log('File available at', url); // Tutaj trzeba będzie ustawić wsadzanie URL do bazy danych
        });
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
    
          // ...
    
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      });
    }
  }

  const handlePictureRemove = () => {
    setPicture(null);
    setMessage('');
  }

  const handlePictureDisplay = () => {
    setPic('https://firebasestorage.googleapis.com/v0/b/mybirdie-app.appspot.com/o/images%2Fd2fcf579-672b-4e22-8c2c-385a6f90fe19?alt=media&token=d0d99542-4ca8-49b4-b945-054fae916b65');
    setMessage('Enjoy!')
  }

  const handlePicturePrediction = () => {
    if (picture) {
      const prediction = tf.model.then( res => {
        res.predict(picture)
      })
      console.log(prediction)
      setMessage('done');
    }
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
          <Button className="mt-3" onClick={handlePictureDisplay} >Display</Button>
          <Button className="mt-3" onClick={handlePicturePrediction} disabled={!picture}>Predict</Button>
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
            <img src={URL.createObjectURL(picture)} className="img-fluid" alt="Uploaded Bird" />
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

export default MyBirds