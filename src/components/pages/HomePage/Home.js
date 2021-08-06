import React, { useEffect, useState } from 'react';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useHistory } from "react-router-dom";
import './Home.css';
import './Title.css';
import './MainPage.js';
import MainPage from './MainPage.js';

 
const Home = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedRestaurants, setLoadedRestaurants] = useState();
  let history = useHistory();
  

  useEffect(() => {
      const fetchRestaurants = async () => {
        try {
          const responseData = await sendRequest(
            process.env.REACT_APP_BACKEND_URL + '/restaurants'
          );
  
          setLoadedRestaurants(responseData.restaurants);
        } catch (err) {}
      };
      fetchRestaurants();
    }, [sendRequest]);


    let showDate = new Date();
    let weekDay = showDate.getDay()
    let showTime = showDate.getHours();
    // console.log(weekDay)

    function clickMe(restaurant) {
      if(showTime > restaurant.SWHour && showTime < restaurant.EWHour){
          history.push(restaurant.id);
      } else alert("Radno vrijeme je od: " + restaurant.SWHour + ":00 do: " + restaurant.EWHour + ":00")
    };


    let restaurantsToRender;
    if(loadedRestaurants) {
        restaurantsToRender = loadedRestaurants.map(restaurant => {
            return <button onClick={clickMe.bind(this, restaurant)} key={restaurant.id}><p>{restaurant.name}</p></button>
        })
    }

  return (
    <>
    <div className="restaurant-list">
      {restaurantsToRender}
    </div>
    < MainPage/>

    <div className="title-container">
      <div className="home-box">

          <div className="title">
              <span className="block"></span>
              <h1 className="title-text">Naruči hranu i uživaj!<span></span></h1>
          </div>
      </div>
    </div>
    </>
  );
}

export default Home;