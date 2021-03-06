import React, { Component } from "react";
import Product from "./components/Product";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      premium: true
    };
  }

  addToCart = productId => {
    this.setState({
      cart: this.state.cart.concat(productId)
    });
  };
  render() {
    return (
      <div>
        <div className="cart">
          <p>Cart({this.state.cart.length})</p>
        </div>
        <Product onCart={this.addToCart} premium={this.state.premium} />
      </div>
    );
  }
}

export default App;
