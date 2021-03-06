import React from "react";
import ReviewError from "./ReviewError";

export default class ProductReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      review: "",
      rating: "",
      errors: []
    };
  }

  handleName = event => {
    this.setState({
      name: event.target.value
    });
  };

  handleReview = event => {
    this.setState({
      review: event.target.value
    });
  };

  handleRating = event => {
    this.setState({
      rating: event.target.value
    });
  };

  sendReview = () => {
    this.props.showReview(this.state);
  };

  onSubmit = event => {
    event.preventDefault();
    if (
      this.state.name !== "" &&
      this.state.review !== "" &&
      this.state.rating !== ""
    ) {
      this.setState({
        name: this.state.name,
        review: this.state.review,
        rating: this.state.rating
      });
      this.sendReview(); //send review data to product parent
      //after Submitting, reset values
      this.setState({
        name: "",
        review: "",
        rating: "",
        errors: []
      });
    } else {
      this.setState({
        errors: []
      }, () => { //initialize errors
        if (this.state.name === "") {
          this.setState({
            errors: this.state.errors.concat("Name Required")
          });
        }
        if (this.state.review === "") {
          this.setState(
            (prevState) => ({
              errors: prevState.errors.concat("Review Required")
            })
          )
        }
        if (this.state.rating === "") {
          this.setState(
            (prevState) => ({
              errors: prevState.errors.concat("Rating Required")
            })
          )
        }
      });
    }
  };

  render() {
    const errorsList = (errors) => {
      return errors.map((error, idx) => {
        return (
          <li><ReviewError value={error}></ReviewError></li>
        );
      })
    }

    return (
      <form className="review-form" onSubmit={this.onSubmit}>
        {
          this.state.errors.length === 0
            ? ""
            : (<div>
              <b>Please correct the following erros(s):</b>
              <ul>{errorsList(this.state.errors)}</ul>
            </div>)
        }
        <p>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            name="name"
            value={this.state.name}
            placeholder="name"
            onChange={this.handleName}
          />
        </p>
        <p>
          <label htmlFor="review">Review:</label>
          <textarea
            id="review"
            name="review"
            value={this.state.review}
            onChange={this.handleReview}
          />
        </p>
        <p>
          <label htmlFor="rating">Rating: </label>
          <select
            id="rating"
            name="rating"
            value={this.state.rating}
            onChange={this.handleRating}
          >
            <option defaultValue="" />
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
          </select>
        </p>
        <p>
          <input type="submit" value="Submit" />
        </p>
      </form>
    );
  }
}
