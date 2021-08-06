import React, { useState, useEffect } from "react";
import { useHttpClient } from '../../shared/hooks/http-hook';

 const Admin = () => {
    const { sendRequest } = useHttpClient();
    const [loadedRestaurants, setLoadedRestaurants] = useState();
    const [loadedFoods, setLoadedFoods] = useState();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");

    const [restaurantId, setRestaurantId] = useState("");
    const [foodId, setFoodId] = useState("");

    const [updateName, setUpdateName] = useState("");
    const [updateEmail, setUpdateEmail] = useState("");
    const [updateImage, setUpdateImage] = useState("");
    const [updateRestaurantId, setUpdateRestaurantId] = useState("");

    const [addFood, setAddFood] = useState("");
    const [addFoodImage, setAddFoodImage] = useState("");
    const [foodCreator, setFoodCreator] = useState("");

    const [addFoodSize, setAddFoodSize] = useState([]);
    const [foodSizeName, setFoodSizeName] = useState("");
    const [foodSizePrice, setFoodSizePrice] = useState("");

    const [addTopping, setAddTopping] = useState([]);
    const [toppingName, setToppingName] = useState("");
    const [toppingPrice, setToppingPrice] = useState("");

    const [upSWHour, setUpSWHour] = useState(0);
    const [upEWHour, setUpEWHour] = useState(0);


    const arrayTopping = () => {
      setAddTopping([...addTopping, {
        name: toppingName,
        price: toppingPrice
      }])
    }

    const arraySize = () => {
      setAddFoodSize([...addFoodSize, {
        name: foodSizeName,
        price: foodSizePrice
      }])
    }

    const handleReset = () => {
      setAddTopping([]);
      setAddFoodSize([]);
    }


    useEffect(() => {
      const fetchFoods = async () => {
        try {
          const responseData = await sendRequest(
            process.env.REACT_APP_BACKEND_URL + '/foods'
          );
  
          setLoadedFoods(responseData.foods);
        } catch (err) {}
      };
      fetchFoods();
  }, [sendRequest]);

  let foodsToRender;
  if(loadedFoods) {
    foodsToRender = loadedFoods.map(food => {
          return <p key={food.id}>{food.name} | = | Food Creator: {food.creator}| = | Food ID: {food.id}</p>
      })
  } 
    
    
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

      let restaurantsToRender;
        if(loadedRestaurants) {
            restaurantsToRender = loadedRestaurants.map(restaurant => {
                return <p key={restaurant.id}>{restaurant.name}_______{restaurant.id}______{restaurant.image}</p>
            })
        } 
        
        const addRestaurant = async event => {
            event.preventDefault();
            try {
              await sendRequest(
                process.env.REACT_APP_BACKEND_URL + '/restaurants/',
                'POST',
                JSON.stringify({
                  name: name,
                  email: email,
                  image: image,
                  upSWHour: upSWHour,
                  upEWHour: upEWHour
                }),
                { 'Content-Type': 'application/json' }
              );
              alert("Restaurant Added")
            } catch (err) {}
          }

          const deleteRestaurant = async event => {
            event.preventDefault();
            try {
              await sendRequest(
                process.env.REACT_APP_BACKEND_URL + '/restaurants/delete',
                'DELETE',
                JSON.stringify({
                  restaurantId: restaurantId
                }),
                { 'Content-Type': 'application/json' }
              );
              alert("Restaurant Deleted")
            } catch (err) {}
          }

          const updateRestaurant = async event => {
            event.preventDefault();
            try {
              await sendRequest(
                process.env.REACT_APP_BACKEND_URL + '/restaurants/update',
                'PATCH',
                JSON.stringify({
                  updateRestaurantId: updateRestaurantId,
                  updateName: updateName,
                  updateEmail: updateEmail,
                  updateImage: updateImage,
                  upSWHour: upSWHour,
                  upEWHour: upEWHour
                }),
                { 'Content-Type': 'application/json' }
              );
              alert("Restaurant Updated")
            } catch (err) {}
          }


          const addFoodFunc = async event => {
            event.preventDefault();
            try {
              await sendRequest(
                process.env.REACT_APP_BACKEND_URL + '/foods/create',
                'POST',
                JSON.stringify({
                  name: addFood,
                  size: addFoodSize,
                  topping: addTopping,
                  image: addFoodImage,
                  creator: foodCreator
                }),
                { 'Content-Type': 'application/json' }
              );
              alert("Food Added")
            } catch (err) {}
          }
          const deleteFoodFunc = async event => {
            event.preventDefault();
            try {
              await sendRequest(
                process.env.REACT_APP_BACKEND_URL + '/foods/delete',
                'DELETE',
                JSON.stringify({
                  foodId: foodId
                }),
                { 'Content-Type': 'application/json' }
              );
              alert("Food Deleted")
            } catch (err) {}
          }
       

        return (
            <>
            <form onSubmit={addRestaurant} >
            <h1>ADD RESTAURANTS</h1>
            <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="name"
                type="text"
                name="name"
                required
            />
            <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                type="text"
                name="email"
                required
            />
            <input
                value={image}
                onChange={e => setImage(e.target.value)}
                placeholder="Image"
                type="text"
                name="image"
                required
            />
            <button type="submit">Apply</button>
            </form>

            <form>
            <h1>START AND END HOURS</h1>
            <input
                value={upSWHour}
                onChange={e => setUpSWHour(e.target.value)}
                placeholder="SWHour"
                type="number"
                name="SWHour"
                required
            />
              <input
                value={upEWHour}
                onChange={e => setUpEWHour(e.target.value)}
                placeholder="EWHour"
                type="number"
                name="EWHour"
                required
            />
            </form>



            <form onSubmit={deleteRestaurant} >
            <h1>DELETE RESTAURANTS</h1>
            <input
                value={restaurantId}
                onChange={e => setRestaurantId(e.target.value)}
                placeholder="restaurantId"
                type="text"
                name="restaurantId"
                required
            />
            <button type="submit">Delete</button>
            </form>


            <form onSubmit={updateRestaurant} >
            <h1>UPDATE RESTAURANTS</h1>
            <input
                value={updateName}
                onChange={e => setUpdateName(e.target.value)}
                placeholder="name"
                type="text"
                name="updatename"
                required
            />
            <input
                value={updateEmail}
                onChange={e => setUpdateEmail(e.target.value)}
                placeholder="Email"
                type="text"
                name="updateEmail"
                required
            />
            <input
                value={updateImage}
                onChange={e => setUpdateImage(e.target.value)}
                placeholder="Image"
                type="text"
                name="updateimage"
                required
            />
               <input
                value={updateRestaurantId}
                onChange={e => setUpdateRestaurantId(e.target.value)}
                placeholder="RestaurantId"
                type="text"
                name="updaterestaurantId"
                required
            />
            <button type="submit">Update</button>
            </form>

            <br />
           <form>
            <h1>size and toppings</h1>
            <input
                value={foodSizeName}
                onChange={e => setFoodSizeName(e.target.value)}
                placeholder="size name"
                type="text"
                name="size"
                required
            />
            <input
                value={foodSizePrice}
                onChange={e => setFoodSizePrice(e.target.value)}
                placeholder="size price"
                type="text"
                name="size"
                required
            />
              <input
                value={toppingName}
                onChange={e => setToppingName(e.target.value)}
                placeholder="topping name"
                type="text"
                name="topping"
                required
            />
              <input
                value={toppingPrice}
                onChange={e => setToppingPrice(e.target.value)}
                placeholder="topping price"
                type="text"
                name="price"
                required
            />
            <button onClick={arraySize}>ADD</button>
            <button onClick={arrayTopping}>ADD</button>
            <button onClick={handleReset}>CLEAR</button>
            </form>

            <form onSubmit={addFoodFunc}>
            <h1>ADD FOOD</h1>
            <input
                value={addFood}
                onChange={e => setAddFood(e.target.value)}
                placeholder="name"
                type="text"
                name="addFood"
                required
            />
            <input
                value={addFoodImage}
                onChange={e => setAddFoodImage(e.target.value)}
                placeholder="image"
                type="text"
                name="image"
                required
            />
              <input
                value={foodCreator}
                onChange={e => setFoodCreator(e.target.value)}
                placeholder="creator"
                type="text"
                name="creator"
                required
            />
            <button type="submit">ADD FOOD</button>
            </form>

            <form onSubmit={deleteFoodFunc}>
            <h1>DELETE FOOD</h1>
            <input
                value={foodId}
                onChange={e => setFoodId(e.target.value)}
                placeholder="food Id"
                type="text"
                name="foodid"
                required
            />
            <button>Delete</button>
            </form>
            <div>           
                {addTopping.map(toppings => (
                  <div className="station" key={toppings.name}>{toppings.name} - {toppings.price} KM</div>
                ))}
                {addFoodSize.map(foods => (
                  <div className="station" key={foods.name}>{foods.name} - {foods.price} KM</div>
                ))}
                {foodsToRender}
                <br />
                {restaurantsToRender}
            </div>
            </>
        )
}

export default Admin



  

