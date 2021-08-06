import Form from '../../../shared/Form';
import React, { Component } from 'react'
import MainPage from '../../HomePage/MainPage';
import './Checkout.css';

class Checkout extends Component {
  constructor(props){
    super(props);

    this.state={
      list:[],
      chosenSize:[],
      orderTotal:''
    };
  }


   // local storage
   componentDidMount() {
    this.hydrateStateWithLocalStorage();
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

  handleClickBack = e => {
    this.props.history.goBack();
  }

  render() {
    return (
      <>
      <MainPage/>  
      <Form/>
      <div className="order-container">
            <div className="korpa-div"><p>KORPA</p></div>
           
            {this.state.list.map(item => {
              return(
                <div className="item-div" key={item.id}>
                  {item.name +" "+ item.chosenSize +" "}
                </div>
              )
            })}
           
            <div className="total-div"><p>Total {this.state.orderTotal} KM</p></div>
            <button className="back-button" onClick={this.handleClickBack}>Nazad</button>
          </div>
    
      </>
    )
  }
}

export default Checkout


