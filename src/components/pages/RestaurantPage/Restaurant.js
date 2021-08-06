import React, { useEffect, useState } from 'react';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useParams } from 'react-router-dom';
import FoodList from './FoodList';
import LoadingSpinner from '../../shared/LoadingSpinner';


const Restaurant = () => {
    const { isLoading, sendRequest } = useHttpClient();
    const [loadedFoods, setLoadedFoods] = useState();
    const restaurantId = useParams().restaurantId;
    

    useEffect(() => {
        const fetchFoods = async () => {
          try {
            const responseData = await sendRequest(
                process.env.REACT_APP_BACKEND_URL + `/foods/${restaurantId}`
            );
            setLoadedFoods(responseData.food);
          } catch (err) {}
        };
        fetchFoods(); 
        window.onload = window.localStorage.clear();  
      }, [sendRequest, restaurantId]);
    

    return (
        <React.Fragment>
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}

            {!isLoading && loadedFoods && (
                <FoodList restaurantId={restaurantId} items={loadedFoods}/>
            )}   
        </React.Fragment>
    )
}

export default Restaurant;
