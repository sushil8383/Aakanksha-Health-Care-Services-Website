import React,{useState} from 'react';
import Modal from 'react-modal';
import Axios from 'axios';
import { Form,Button } from 'react-bootstrap';

import './css/style.css'

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

export default function Popup1() {
  const [username,setUsername]=useState(); 
  const [password,setPassword]=useState();
  const [loginStatus,setLoginStatus]=useState("");
  
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
  /*code for login */
  const login=()=>{

    Axios.post('http://localhost:8080/login',{
        username:username,
        password:password

    }).then((response)=>{
        console.log(response.data.message);
        if(response.data.message){
          setLoginStatus(response.data.message);
        }
        else{
          
          if (response.data[0].username) {
            setLoginStatus(response.data[0].username);
           
          }
        }
        
    })


   }
   /*code for login ends here */
  return (
    <div>
      <button className="btn btn-primary login" onClick={openModal}>Login</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Login</h2>
        <button className="close btn" onClick={closeModal}>X</button>
        {/*<form>
          <input type="text" Placeholder="Username" className="ip"  required onChange={(event)=>{
             setUsername(event.target.value);
             
          }}/>
          <input type="Password" Placeholder="Password" className="ip" required onChange={(event)=>{
             setPassword(event.target.value);
            
          }}/>
          <button type="submit" className="btn btn-primary">Save and Close</button>

        </form>*/}
        <Form>
        <h6>Welcome {loginStatus}</h6>
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
        
          <Button variant="primary"  onClick={login} >
              Login
          </Button>
        </Form>
      </Modal>
    </div>
  );
}
