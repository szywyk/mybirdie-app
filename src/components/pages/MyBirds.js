import { Container, Row, Col, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import { database } from '../../firebase';
import { onValue, ref } from 'firebase/database';

const MyBirds = ({userId}) => {
  const [pictures, setPictures] = useState([]);

  const handlePictureRemove = () => {

  }

  const handlePictureDisplay = () => {
    const picsRef = ref(database, `/pictures/users/${userId}`);
    onValue(picsRef, (snapshot) => {
      const data = snapshot.val();
      const pics = [];
      for (const [key, value] of Object.entries(data))
        pics.push(value);
      setPictures(pics);
    });
  }
  const picturesToDisplay = pictures.map(url => <img src={url} key={url} className="img-fluid" alt="Uploaded Bird" /> );

  return (
    <Container>
      <Row>
        <Col>
          <Button className="mt-3" onClick={handlePictureRemove} >Remove</Button>
          <Button className="mt-3" onClick={handlePictureDisplay} >Display</Button>
        </Col>
      </Row>
      {pictures && (
        <Col>
          {picturesToDisplay}
        </Col>
      )}
    </Container>
  );
}

export default MyBirds;