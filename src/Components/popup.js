import React,{useState} from 'react';
import Modal from 'react-modal';
import Axios from 'axios';
import './css/style.css';
import { Form,Button } from 'react-bootstrap';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

export default function Popup() {
  const [username,setUsername]=useState(); 
  const [password,setPassword]=useState();
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }
  /*code for registration */
  const register=()=>{
    console.log(username);
   Axios.post('http://localhost:8080/register',{
       username:username,
       password:password

   }).then((response)=>{
       console.log("success");
       console.log(response);
   })
}
/*code for registration ends here */
  return (
    <div>
      <button className="btn btn-light signup" onClick={openModal}>Signup</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Signup</h2>
        <button className="close btn" onClick={closeModal}>X</button>
        <p>Create a new account</p>
        {/*<form>
          <input type="text" placeholder="Username" className="ip" required onChange={(event)=>{
             setUsername(event.target.value);
             console.log(event.target.value);
          }}/>
          <input type="Password" placeholder="Set Password" className="ip" required onChange={(event)=>{
             setPassword(event.target.value);
             console.log(event.target.value);
          }}/>
          <button  className="btn btn-primary" onClick={register}>Save and Close</button>

        </form>*/}
        <Form>
          <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text"  onChange={(event)=>{
              setUsername(event.target.value);
          }}/>
              
          </Form.Group>

          <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password"  onChange={(event)=>{
              setPassword(event.target.value);
          }}/>
          </Form.Group>
        
          <Button variant="primary"  onClick={register}>
              Register
          </Button>
        </Form>
      </Modal>
    </div>
  );
}
