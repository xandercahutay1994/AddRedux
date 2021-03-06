import React, { Component } from "react"
import axios from "axios";
import { FETCH_COMMENTS_URL } from "../api";
import CommentLists from "../components/CommentLists"
import Navigation from "../components/Navigation"


class Comment extends Component {

    constructor(){
        super()
        this.state = {
            allComments: [],
            isFetching: false,
            searchEmail: '',
            filterComment: false,
            filterMatch: true
        }
    }

    componentDidMount(){
        this._isMounted = true
        this.getAllComments()
    }

    componentWillUnmount(){
        this._isMounted = false
    }

    onChange = (e) => {
        this.setState({
            searchEmail: e.target.value
        }) 
    }

    getAllComments = async() => {
        try{
            const result = await axios(FETCH_COMMENTS_URL);
            const response = result.data;

            if(this._isMounted){
                this.setState({ allComments: response, isFetching: true })
            }
        }catch(e){
            console.log(e)
        }
    }
    
    submit = (e) => {
        e.preventDefault();
        this.setState({ filterComment: true })
    }

    renderComments = ({isFetching,allComments,searchEmail}) => {
        return (
            !isFetching ?
                <h2 className="text-center"><i className="fa fa-circle-o-notch fa-spin"></i> Loading...</h2>
            :
                <CommentLists commentLists={allComments} email={searchEmail}/>
        )
    }

    render(){
        const { searchEmail, isFetching } = this.state;

        return(
            <div>
               <Navigation />
                <h1 className="text-center"> All Comments </h1>
                <form onSubmit={this.submit} className="mt-5">
                    <input
                        name="searchEmail"
                        className="form-control"
                        placeholder="Enter Email"
                        onChange={this.onChange}
                        value={searchEmail}
                        required
                    />
                    <button className="btn btn-primary m-2" disabled={!isFetching}>
                        Search
                    </button>
                </form>

                <div className="mt-5">
                    { this.renderComments({...this.state})}
                </div>
            </div>
        )
    }
}

export default Comment;