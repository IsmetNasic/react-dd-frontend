import React, { Component, useEffect } from 'react'
import FoodItem from './FoodItem';
import Modal from 'react-modal';
import { withRouter } from "react-router-dom";
import './FoodList.css';
import MainPage from '../HomePage/MainPage';
Modal.setAppElement('#root');

class FoodList extends Component {
  constructor(props){
    super(props);

    this.state={
      newItem:'',
      list:[],
      clicks: 1,
      showModal: false,
      chosenSize:"Izaberite",
      chosenTopping: '',
      orderTotal: 0,
      restaurantId: this.props.restaurantId
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleAddModal = this.handleAddModal.bind(this);
    this.handleChangeSize = this.handleChangeSize.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
  }

  // local storage
  componentDidMount() {
    this.hydrateStateWithLocalStorage();

    // add event listener to save state to localStorage
    // when user leaves/refreshes the page
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );

    // saves if component has a chance to unmount
    this.saveStateToLocalStorage();
  }

  hydrateStateWithLocalStorage() {
    // for all items in state
    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);

        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          // handle empty string
          this.setState({ [key]: value });
        }
      }
    }
  }

  saveStateToLocalStorage() {
    // for every item in React state
    for (let key in this.state) {
      // save to localStorage
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  handleOpenModal (e) {
    this.setState({ showModal: true });
    this.setState({ newItem: {
      id: e.target.id
     }},() => this.handleItemState());
    this.setState({chosenTopping: ""});
  }

  handleItemState () {
   const itemKey = this.state.newItem.id;
   const arrayKey = this.props.items;

   let clickedItem = arrayKey.find(o => o.id === itemKey);

   this.setState({ newItem: {
     id: clickedItem.id,
     size: clickedItem.size.map(clickedItem => ([clickedItem.name, clickedItem.price])),
     topping: clickedItem.topping.map(clickedItem => ([clickedItem.name, clickedItem.price])),
   }})
  } 

  handleAddModal() {
    if (this.state.chosenSize == "Izaberite" || ''){
      alert("Izaberite velicinu")
      return;
    }
    const itemKey = this.state.newItem.id;
    const arrayKey = this.props.items;
    let clickedItem = arrayKey.find(o => o.id === itemKey);

    this.setState({ showModal: false });  
    this.setState({ clicks: this.state.clicks + 1 });
    
    let chosenPrice = parseInt(this.state.chosenSize.match(/\d+/g));
    let prevChosenPrice = parseInt(this.state.orderTotal);
    this.setState({ orderTotal: prevChosenPrice += chosenPrice })

    this.setState({ newItem: {
      name: clickedItem.name,
      image: clickedItem.image,
      id: clickedItem.id + this.state.clicks,
      size: clickedItem.size.map(clickedItem => ([clickedItem.name, clickedItem.price])),
      chosenSize: this.state.chosenSize,
      chosenTopping: ([this.state.chosenTopping]),
     }},() => this.handleItemList());
  }

  handleItemList() {
    const list = [...this.state.list]
    list.push(this.state.newItem);
    this.setState({list, newItem:""})
    this.setState({ chosenSize: "Izaberite"})
  }

  handleChangeSize(e){
    this.setState({ chosenSize: e.target.value})
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }

  deleteItem(id){
    const list = [...this.state.list];
    const updatedList = list.filter(item => item.id !== id);
    this.setState({list: updatedList});

    const filterDeleted = list.filter(item => item.id === id);

    let chosenPrice = parseInt(filterDeleted[0].chosenSize.match(/\d+/g));
    let prevChosenPrice = parseInt(this.state.orderTotal);
    this.setState({ orderTotal: prevChosenPrice -= chosenPrice })
  }

  handleClickPush = e => {
    if(this.state.list.length === 0){
      alert("Izaberite hranu koju zelite naruciti")
      return;
    }
    
    this.props.history.push("/checkout");
  };

  handleClickBack = e => {
    this.props.history.push("/");
  }

  handleCheckbox = (e) => {
    // to find out if it's checked or not; returns true or false
    const checked = e.target.checked;
    // to get the checked value
    const checkedValue = e.target.value;
    if (checked == true) {
      this.setState({ chosenTopping: [...this.state.chosenTopping, checkedValue] })
    } 
    // to delete the unchecked value
    if ( checked == false) {
      this.setState({chosenTopping: this.state.chosenTopping.filter(function(topping) { 
        return topping !== checkedValue
    })});
    } 
    };

  render() {
    let sizeData = this.state.newItem.size
    let itemsToRender

    if (sizeData) {
      itemsToRender = sizeData.map(item => {
        return <option key={item}>{item[0]} {item[1] +" KM"}</option>
      });
    }

    let toppingData = this.state.newItem.topping
    let toppingsToRender

    if (toppingData){
      toppingsToRender = toppingData.map(item => {
        return <label key={item} className="topping"> 
            <p>{item[0]}</p>
            <input onChange={this.handleCheckbox} type="checkbox" id={item[0]} name={item} value={item[0]} />
        </label> 
      });
    }

    return (
      <> 
      <MainPage/>
      <div>
        <Modal 
           isOpen={this.state.showModal}
           contentLabel="onRequestClose Example"
           onRequestClose={this.handleCloseModal}
           className="food-modal">

          <div className="modal-select">
          <select onChange={this.handleChangeSize}>
              <option>Izaberite</option>
              {itemsToRender}</select>
          </div>
          <div className="modal-button">
            <button onClick={this.handleCloseModal}>Nazad</button>
            <button onClick={this.handleAddModal}>Dodaj u korpu</button>
          </div>
          <div className="topping-container">
            {toppingsToRender}
          </div>
        </Modal>

        <div className="food-item-container">
        {this.props.items.map(food => (
            <FoodItem
              key={food.id}
              id={food.id}
              name={food.name}
              image={food.image}
              handleOpenModal={this.handleOpenModal}/>
        ))}
        </div>
        
        <div className="order-container">
            <div className="korpa-div"><p>KORPA</p></div>
           
            {this.state.list.map(item => {
              return(
                <div className="item-div" key={item.id}>
                  {item.name +" "+ item.chosenSize +" "}
                  <button onClick={() => this.deleteItem(item.id)}>X</button>
                </div>
              )
            })}
           
            <div className="total-div"><p>Total {this.state.orderTotal} KM</p></div>
            <div className="order-button"><button onClick={this.handleClickPush}>Naruci</button></div>
            <br />
            <button className="back-button" onClick={this.handleClickBack}>Nazad</button>
          </div>    
      </div>
      </>
    )
  }
}

export default withRouter (FoodList);