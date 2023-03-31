import { getAuth } from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Container, Tabs, Tab, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SignInUp = ({ defaultKey = 'login' }) => {
  const navigate = useNavigate();
  const auth = getAuth();
  
  const handleSignup = (event) => {

    event.preventDefault();
    let email = event.target[0].value
    let password = event.target[1].value

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('All good')
      navigate('/home')
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
      console.log('All good')
      navigate('/home')
      email = '';
      password = '';
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('Something went wrong')
    });
  }

  return (
    <Container>
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
        </Tab>
      </Tabs>
    </Container>
  )
}

export default SignInUp;