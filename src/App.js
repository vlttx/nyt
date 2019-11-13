import React from "react";
import "./App.css";
import fetch from "isomorphic-fetch";
import { CardList } from "./components/card-list/CardList";
import { SearchBox } from "./components/search-box/SearchBox";

const API_KEY = process.env.REACT_APP_NYT_API_KEY;
const BASE_URL = `https://api.nytimes.com/svc/movies/v2/reviews/search.json?api-key=${API_KEY}&query=`;

class App extends React.Component {
  state = {
    searchTerm: "",
    reviews: [],
    criticsPicks: [],
    searchPicks: ""
  };

  componentDidMount() {
    fetch(
      `https://api.nytimes.com/svc/movies/v2/reviews/search.json?api-key=${API_KEY}&critics-pic`
    )
      .then(res => res.json())
      .then(resJson => this.setState({ criticsPicks: resJson.results }));
  }

  handleSubmit = event => {
    event.preventDefault();

    fetch(BASE_URL.concat(this.state.searchTerm))
      .then(res => res.json())
      .then(res => {
        if (res.has_more) {
          this.setState({ reviews: res.results });
        } else {
          alert("No reviews matched your search!");
        }
      });
  };

  handleChange = event => {
    this.setState({ searchTerm: event.target.value });
  };

  handlePicksChange = e => {
    this.setState({ searchPicks: e.target.value });
  };

  render() {
    const { criticsPicks, searchPicks } = this.state;
    const filteredPicks = criticsPicks.filter(pick =>
      pick.headline.toLowerCase().includes(searchPicks.toLowerCase())
    );
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <h1>Movie Reviews from the New York Times</h1>
          <h2>Search Movie Reviews</h2>
          <input
            className="search"
            type="text"
            onChange={this.handleChange}
            placeholder={"Search all reviews"}
          />
        </form>
        <br />
        <br />
        {this.state.reviews.length === 0 ? (
          <div>
            <h2>Critics' Picks:</h2>
            <SearchBox
              placeholder={"Search by headline"}
              handleChange={this.handlePicksChange}
            />
            <br />
            <br />
            {this.state.searchPicks !== "" ? (
              <CardList reviews={filteredPicks} />
            ) : (
              <CardList reviews={this.state.criticsPicks} />
            )}
          </div>
        ) : (
          <>
            <CardList reviews={this.state.reviews} />
            <div>
              <h2>Critics' Picks:</h2>
              <SearchBox
                placeholder={"Search by headline"}
                handleChange={this.handlePicksChange}
              />
            </div>
            <br />
            <br />
            <CardList reviews={this.state.criticsPicks} />
          </>
        )}
      </div>
    );
  }
}
export default App;
