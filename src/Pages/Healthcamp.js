import React ,{useState,useEffect}from 'react';
import {Button, Spinner} from "react-bootstrap";
import Header from '../Components/Navbar'
import Footer from '../Components/Footer'
import Popup from '../Components/popup'
import Popup1 from '../Components/popuplogin'
import { Link } from "react-router-dom";
import Axios from 'axios';
const Healthcamp = () => {
    const [data, setData] = useState([]);
    const [loading,setloading]=useState(false);
    const style = { position: "fixed",  left: "50%" };
    const linkStyle = {
        margin: "1rem",
        textDecoration: "none",
        color: "#fff"
      };
       useEffect(() => {
        const fetchData = async () => {
            Axios.post('http://localhost:5000/camp/getCampDetail',)
            .then((response)=>{
               setData(response.data.camps);
               setloading(true);
            })
        };
        fetchData();
      }, [setData]);
   
    return (
        <div>
            <Popup />
            <Popup1 />
            <Header /> 
            <div className="container" align="center">
                <div className="col-lg-12 col-12 my-2 card">
                    <div className="row mt-3">
                        {
                            loading?
                            data.map( item => 
                                (
                                    <>
                                        <div className="container"></div>
                                            <div className="col-lg-4 col-12 doctordetail doctorphoto" style={{ padding: "5px" }} align="center">
                                            <img src={item.imageUrl} className="d-block mt-3 cardgroup" alt="medicine" />
                                        </div>
                                        <div className="col-lg-8 col-12" align="center">
                                            <div className="card-body mt-3" align="left">
                                                <h5 className="card-title">{item.name}</h5>
                                                <h6>{item.city}</h6>
                                                <p className="card-text description">
                                                    {item.description}
                                                </p>
                                            </div>
                                            <div align="right">
                                                <Button  className="btn btn-primary seemore1 mx-3 my-2">
                                                  <Link to="/location" style={linkStyle}>  Go to Location</Link>
                                                </Button>
                                                </div>
                                        </div>
                                    </>
                                )
                            ):<Spinner animation="border" style={style}/>
                       }
                    </div>
                </div>
            </div>
            <Footer/>
       </div>
    );
    
}

export default Healthcamp;