import React, { Component } from 'react';
import {getBooksQuery} from '../Queries/queries'
import {  graphql } from 'react-apollo'
import BookDetails from './Bookdetails'






class BookList extends Component {
    state={
currentBook:null

    }

     currentBookHander = (e) =>{

         
        this.setState({
            currentBook: e.target.id
        })
         
    }
    
    displayBook = () => {
      
        let data = this.props.data;
       
        if (data.loading) {
            return <div> Book is Loading... </div>
        } else 
        {return data.books.map((el) => {
           
            return (<li key={el.id} id={el.id} onClick={(e)=>this.currentBookHander(e)} > {el.name} </li>)

        })}

    }
    
    render() {      
        
        
        return (
            <React.Fragment>
                <ul id='book-list'> 
            
            {this.displayBook()}
                </ul>

                <BookDetails bookId= {this.state.currentBook} /> 
                </React.Fragment>
        );
    }
}

export default graphql(getBooksQuery)(BookList);
