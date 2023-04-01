import { getAuth, signOut } from "firebase/auth"
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => { 
      console.log('Logout successful');
      navigate('/home');
    }).catch((error) => {
      console.log('Something went wrong.')
    })
  }
  
  return (
    <Button onClick={handleLogout}>Logout</Button>
  )
}

export default Logout;