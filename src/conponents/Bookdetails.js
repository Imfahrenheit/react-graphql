import React, { Component } from 'react';
import { getSingleBook } from '../Queries/queries'
import { graphql } from 'react-apollo'






class BookDetails extends Component {

        displayBookDetails= ()=> {
            const {book}=this.props.data;
            if(book){
                return(
                    <div className="book-info "> 
                    <h4> {book.name} </h4>
                    <p>{book.genre}</p>
                        <p>{book.author.name}</p>
                        
                       <details className="morebooks"> 
                            <summary>  All books by the author  </summary>
                        {book.author.books.map((el)=>{
                            return (<p key ={el.id} > {el.name}</p>)} )}
                            
                    </details>
                    </div>
                )
            }
            else{

                return (<p> No book is selected ....  </p>) 

            }
        }

    render() {
        console.log(this.props.data)

        return (
            <div className="Book-details">
                {this.displayBookDetails()}

            </div>
        );
    }
}

export default graphql(getSingleBook,{
options:(props) => { 
    return {
    variables:{
        id:props.bookId
    }
}

}

})(BookDetails);
