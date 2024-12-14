import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge'
import Modal from '../Modals';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';

export default function Navbar() {
  let data=useCart();
  const [cartview, setCartview]=useState(false);
  const navigate=useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem("authToken");
    navigate("/login");
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fst-italic" href="#">Foodie</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              {(localStorage.getItem("authToken"))?
              <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="myorder">My Orders</Link>
            </li>:""
              }
            </ul>
            {(!localStorage.getItem("authToken"))?
            <div className="d-flex ms-auto">
              <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
              <Link className="btn bg-white text-success mx-1" to="/createuser">SignUp</Link>
            </div>
            :
            <div className='d-flex ms-auto'>
              <div className='btn bg-white text-success mx-1' onClick={()=>{setCartview(true)}}>
                My Cart{' '}
                <Badge pill bg='danger'>{data.length}</Badge>
              </div>
              {cartview ?<Modal onClose={()=>{setCartview(false)}}><Cart/></Modal>:null}
            <div className='btn bg-white text-danger mx-1' onClick={handleLogout}>Logout</div>
            </div>
            }
          </div>
        </div>
      </nav>
    </div>
  )
}
