import React, { useState, useEffect } from "react";
import { useHttpClient } from '../shared/hooks/http-hook';
import { useHistory } from 'react-router-dom';
import './Form.css';


function Form() {
  const { sendRequest } = useHttpClient();
  const history = useHistory();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [foodOrder, setFoodOrder] = useState([]);
  const [orderTotal, setOrderTotal] = useState("");
  const [restaurantId, setRestaurantId] = useState("");


  useEffect(() => {
    const localTotalPrice = localStorage.getItem('orderTotal');
    setOrderTotal(localTotalPrice)

    const localRestaurantId = localStorage.getItem('restaurantId');
    setRestaurantId(localRestaurantId)

    const localDataSize = localStorage.getItem('list');
    let parseLocalDataSize = JSON.parse(localDataSize);
    setFoodOrder(parseLocalDataSize)
  }, [name])


  const orderSubmithandler = async event => {
    event.preventDefault();
    if(name.length > 3 && phone.length > 3 && address.length > 3 && orderTotal > 3 && orderTotal < 101){
      try {
        await sendRequest(
          (process.env.REACT_APP_BACKEND_URL + '/orders/'),
          'POST',
          JSON.stringify({
            name: name,
            phone: phone,
            address: address,
            foodOrder: foodOrder,
            total: orderTotal,
            restaurantId: restaurantId
          }),
          { 'Content-Type': 'application/json' }
        );
        alert("Uspjesno ste narucili")
        orderCounterFunc();
      } catch (err) {}
    } else{ alert("Provjerite vase podatke, minimalna narudzba je 4 KM a maksimalna 100 KM")}
  }

  
  const orderCounterFunc = async () => {
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + '/restaurants/counter',
        'PATCH',
        JSON.stringify({
          restaurantId: restaurantId
        }),
        { 'Content-Type': 'application/json' }
      );
      window.localStorage.clear();
      history.push('/');
    } catch (err) {}
  }

  return (
    <form className="order-form" onSubmit={orderSubmithandler}>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Ime i prezime"
        type="text"
        name="name"
        required
      />
      <input
        value={address}
        onChange={e => setAddress(e.target.value)}
        placeholder="Adresa"
        type="text"
        name="address"
        required
      />
      <input
        value={phone}
        onChange={e => setPhone(e.target.value)}
        placeholder="Telefon"
        type="text"
        name="phone"
        required
      />
      <button type="submit">Naruci</button>
      <br />
    </form>
  );
}
export default Form;