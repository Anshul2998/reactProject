import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from './StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Placeorder = () => {
  const { getTotalCartAmount, token, food_list, cartItem, url } = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: '',
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const placeOrder = async(event)=>{
    event.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if (cartItem[item._id]>0) {
        let itemInfo = item;
        itemInfo["quantity"]=cartItem[item._id]
        orderItems.push(itemInfo)
      }
    })
   let orderData = {
    address:data,
    items:orderItems,
    amount:getTotalCartAmount()+10,
   }
   let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});
   if (response.data.success) {
    const {session_url}= response.data;
    window.location.replace(session_url);
   }
   else{
    alert("error")
   }
  }
  const navigate = useNavigate();
  useEffect(()=>{
    if (!token) {
      navigate("/cart")
    }
    else if (getTotalCartAmount()===0) {
      navigate("/cart")
    }
  },[token])

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' required/>
          <input name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' required/>
        </div>
        <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' required/>
        <input name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' required/>
        <div className="multi-fields">
          <input name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' required/>
          <input name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' required/>
        </div>
        <div className="multi-fields">
          <input name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip Code' required/>
          <input name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' required/>
        </div>
        <input name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone no.' required />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>$ {getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>$ {getTotalCartAmount() === 0 ? 0 : 10}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>$ {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 10}</b>
          </div>
          <button type='submit'>Proceed To Payment</button>
        </div>
      </div>
    </form>
  );
};

export default Placeorder;
