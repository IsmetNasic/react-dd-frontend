import React from 'react';
import './FoodItem.css';

const FoodItem = props => {

  return (
      <div className="food-list">
          <button className="food-button" 
            onClick={props.handleOpenModal} id={props.id} >{props.name}
          </button>
          <img className="food-img" src={props.image}/>
      </div>
  );
};

export default FoodItem;
