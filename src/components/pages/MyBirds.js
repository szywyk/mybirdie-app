import { Container, Row } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { database } from '../../firebase';
import { onValue, ref } from 'firebase/database';
import MyBird from '../MyBird';

const MyBirds = ({ userId }) => {
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    const picsRef = ref(database, `/pictures/users/${userId}`);
    onValue(picsRef, (snapshot) => {
      const data = snapshot.val();
      const pics = [];
      pics.push(Object.entries(data));
      setPictures(Object.entries(data));
      console.log("Use Effect");
      console.log(pics);
    });
  }, [userId]);
  const picturesToDisplay = pictures.map((arr) => <MyBird url={arr[1].url} name={arr[1].name} picId={arr[0]} userId={userId} />);

  return (
    <Container>
      {pictures && (
        <Row xs={2} md={3} lg={5}>
          {picturesToDisplay}
        </Row>
      )}
    </Container>
  );
}

export default MyBirds;