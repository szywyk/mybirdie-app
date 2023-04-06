import { getAuth, signOut } from "firebase/auth";
import { Nav } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => { 
      navigate('/mybirdie-app');
    }).catch((error) => {
    })
  }
  
  return (
    <Nav.Link as={Link} onClick={handleLogout}>Logout</Nav.Link>
  )
}

export default Logout;