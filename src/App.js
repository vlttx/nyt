import React from 'react';
import './App.css';
import fetch from 'isomorphic-fetch'
import { CardList } from './components/card-list/CardList'

const BASE_URL = 'https://api.nytimes.com/svc/books/v3/reviews.json?author='
const API_KEY = process.env.REACT_APP_NYT_API_KEY


class App extends React.Component {

  state = {
    searchTerm: "",
    reviews: []

   //  [{
   //    "url": "http://www.nytimes.com/2001/11/04/books/books-in-brief-fiction-poetry-851302.html",
   //    "publication_dt": "2001-11-04",
   //    "byline": "MARY ELIZABETH WILLIAMS",
   //    "book_title": "Black House",
   //    "book_author": "Stephen King",
   //    "summary": "",
   //    "uuid": "00000000-0000-0000-0000-000000000000",
   //    "uri": "nyt://book/00000000-0000-0000-0000-000000000000",
   //    "isbn13": [
   //      "9780375504396"
   //    ]
   //  },
   // {
   //    "url": "http://www.nytimes.com/2011/10/31/books/stephen-kings-11-23-63-review.html",
   //    "publication_dt": "2011-10-31",
   //    "byline": "JANET MASLIN",
   //    "book_title": "11/22/63",
   //    "book_author": "Stephen King",
   //    "summary": "Stephen King’s latest novel, “11/22/63,” tells of a schoolteacher who travels back to 1958 to alter history, and falls in love as well.",
   //    "uuid": "00000000-0000-0000-0000-000000000000",
   //    "uri": "nyt://book/00000000-0000-0000-0000-000000000000",
   //    "isbn13": [
   //      "9780307951434",
   //      "9780606351461",
   //      "9781442344280",
   //      "9781442344303",
   //      "9781442391635",
   //      "9781444727326",
   //      "9781451627282",
   //      "9781451627299",
   //      "9781451627305",
   //      "9781451651645",
   //      "9781501120602",
   //      "9781594135590"
   //    ]
   //  },
   //   {
   //    "url": "http://www.nytimes.com/2004/01/04/books/the-quest-for-the-north-central-positronics.html",
   //    "publication_dt": "2004-01-04",
   //    "byline": "ANDREW O'HEHIR",
   //    "book_title": "Wolves of the Calla",
   //    "book_author": "Stephen King",
   //    "summary": "",
   //    "uuid": "00000000-0000-0000-0000-000000000000",
   //    "uri": "nyt://book/00000000-0000-0000-0000-000000000000",
   //    "isbn13": [
   //      "9781848941137"
   //    ]
   //  }]
  }

  // componentDidMount(){
  //   fetch(BASE_URL.concat(`Stephen King`,`&api-key=${API_KEY}`))
  //     .then(res => res.json())
  //     .then(resJson => console.log(resJson));
  // }; COULD DO MOST RECENT MAYBE JUST FOR FUN :)

  handleSubmit = (event) => {
    event.preventDefault();

     fetch(BASE_URL.concat(this.state.searchTerm, `&api-key=${API_KEY}`))
      .then(res => res.json())
      .then(res => this.setState({ reviews: res.results }));
  };

  handleChange = (event) => {
    this.setState({searchTerm: event.target.value});

  }


  render() {
  return (
    <div className="App">
      <form onSubmit={this.handleSubmit}>
      <h2>Search Book Reviews</h2>
      <input type="text" onChange={this.handleChange}/>
      <button type="submit">Submit</button>
      </form>
     <CardList>{this.state.reviews.map((review, index) =><h1 key={index}>{review.book_title} by {review.book_author}</h1>)}</CardList> 
    </div>
  );
}
}
export default App;
