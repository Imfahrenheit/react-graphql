import React, { Component } from 'react';
import { getAuthorsQuery, addBookMutation, getBooksQuery} from '../Queries/queries';
import { graphql, compose} from 'react-apollo';




class AddBook extends Component {

    state = {
        book: {
            name: '',
            genre: '',
            authorId: ''
        }



    }

    displayAuthors = () => {
        var data = this.props.getAuthorsQuery;
        if (data.loading) {
            return (<option disabled>Loading authors</option>);
        } else {
            return data.authors.map(author => {
                return (<option key={author.id} value={author.id}>{author.name}</option>);
            });
        }
    }
    onChangeHandler = (e) => {
        let name = e.target.name
        let book = this.state.book
        book[name] = e.target.value
        this.setState({ book: { ...book } })


    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addBookMutation({
            variables:{
                name:this.state.book.name,
                genre: this.state.book.genre,
                authorId: this.state.book.authorId
            },
            refetchQueries: [{ query: getBooksQuery }]
        } )
        
        this.setState({
            book:
                {
                name: '',
                genre: '',
                authorId: ''
            }

            
        })

    }

    render() {
        return (
            <form id="add-book" onSubmit={(e) => { this.handleSubmit(e) }} >
                <div className="field">
                    <label>Book name:</label>
                    <input name={'name'} type="text" value={this.state.book.name} onChange={(e) => this.onChangeHandler(e)} />
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input name={'genre'} type="text" value={this.state.book.genre} onChange={(e) => this.onChangeHandler(e)} />
                </div>
                <div className="field">
                    <label>Author:</label>
                    <select name={'authorId'} value={this.state.book.authorId} onChange={(e) => this.onChangeHandler(e)} >
                        <option>Select author</option>
                        {this.displayAuthors()}
                    </select>
                </div>
                <button>+</button>

            </form>
        );
    }
}

export default compose(
    graphql(getAuthorsQuery, { name:"getAuthorsQuery"}),
    graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
