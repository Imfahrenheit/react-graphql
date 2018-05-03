import React, { Component } from 'react';

import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'


import BookList from './conponents/BookList'
import AddBook from './conponents/AddBook'


const client = new ApolloClient({
  uri: 'https://protected-wildwood-57334.herokuapp.com/graphql'
});


class App extends Component {




  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <h1> Your favorit reading list </h1>
          <BookList />


          <AddBook />

        </div>
      </ApolloProvider>
    );
  }
}

export default App;
