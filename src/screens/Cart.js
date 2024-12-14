import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import { useCart, useDispatchCart } from '../components/ContextReducer';

export default function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();
    if (data.length === 0) {
      return (
        <div>
          <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
        </div>
      )
    }
    // const handleRemove = (index)=>{
    //   console.log(index)
    //   dispatch({type:"REMOVE",index:index})
    // }
  
    const handleCheckOut = async () => {
      let userEmail = localStorage.getItem("userEmail");
      console.log((!userEmail)?"No email":userEmail)
      let response = await fetch("http://localhost:5000/api/orderData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString()
        })
      });
      
      if (response.status === 200) {
        dispatch({ type: "DROP" })
      }
    }
  
    let totalPrice = data.reduce((total, food) => total + food.price, 0)
    return (
      <div>
  
        {console.log(data)}
        <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
          <table className='table table-hover'>
            <thead className='fs-5' style={{fontFamily:'sans-serif'}}>
              <tr className=''>
                <th scope='col' className='text-white'>Sr. No</th>
                <th scope='col'className='text-white' >Name</th>
                <th scope='col' className='text-white'>Quantity</th>
                <th scope='col' className='text-white' >Option</th>
                <th scope='col' className='text-white'>Amount</th>
                <th scope='col' className='text-white'></th>
              </tr>
            </thead>
            <tbody className='text-white'>
              {data.map((food, index) => (
                <tr className='text-white'>
                  <th scope='row' className='text-white'>{index + 1}</th>
                  <td className='text-white'>{food.name}</td>
                  <td className='text-white'>{food.qty}</td>
                  <td className='text-white'>{food.size}</td>
                  <td className='text-white'>{food.price}</td>
                  <td className='text-white'><button type="button" className="btn btn-white p-0"><DeleteIcon className='text-white' onClick={() => { dispatch({ type: "REMOVE", index: index }) }} ></DeleteIcon>
                  </button> </td></tr>
              ))}   
            </tbody>
          </table>
          <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
          <div>
            <button className='btn bg-success mt-5 ' onClick={handleCheckOut} > Check Out </button>
          </div>
        </div>
  
  
  
      </div>
    )
}
