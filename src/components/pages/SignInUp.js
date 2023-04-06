import { getAuth } from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getRedirectResult, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { Container, Tabs, Tab, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { set, ref as dbRef } from "firebase/database";
import { database } from '../../firebase.js';

const SignInUp = ({ defaultKey = 'login' }) => {
  const navigate = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const handleSignup = (event) => {

    event.preventDefault();
    let email = event.target[0].value
    let password = event.target[1].value

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        set(dbRef(database, `users/${user.uid}`), {
          email: user.email,
          userId: user.uid
        });
        navigate('/mybirdie-app')
        email = '';
        password = '';
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('Something went wrong')
      });
  }

  const handleLogin = (event) => {
    event.preventDefault();
    let email = event.target[0].value
    let password = event.target[1].value

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User logged in')
        navigate('/mybirdie-app')
        email = '';
        password = '';
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('Something went wrong')
      });
  }

  const handleGoogleSignIn = () => {
    navigate('/mybirdie-app');
    signInWithRedirect(auth, provider);
  }

  return (
    <Container className="mt-3">
      <Tabs
        defaultActiveKey={defaultKey}
        id="justify-tab-example"
        className="mb-3"
        justify
      >
        <Tab eventKey="login" title="Login">
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Tab>
        <Tab eventKey="signup" title="Sign Up">
          <Form onSubmit={handleSignup}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Sign Up
            </Button>
          </Form>
          <Button onClick={handleGoogleSignIn}>Sign in with Google</Button>
        </Tab>
      </Tabs>
    </Container>
  )
}

export default SignInUp;