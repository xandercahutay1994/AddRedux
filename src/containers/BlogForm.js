import React, {Component} from "react";
import PropTypes from "prop-types";

class BlogForm extends Component{
    constructor(){
        super()
        this.state = {
            title: '',
            body: ''
        }
    }

    onChange = (e) => {
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
       
    }
    
    submit = (e) => {
        e.preventDefault();
        const { title, body } = this.state;

        this.props.addPost(title,body)
        
        this.setState({
            title: '',
            body: ''
        })
    }

    render(){
        const { disableBtn } = this.props;
        const { title, body } = this.state;

        return (
            <div className="mt-5 col-lg-12">
                <div className="form-group justify-content-center">
                    <form onSubmit={this.submit}>
                        <div className="row">
                            <label className="col-md-6 col-lg-6">
                                Title 
                                <input 
                                    type="text" 
                                    name="title" 
                                    className="form-control" 
                                    placeholder="Enter Title"
                                    onChange={this.onChange}
                                    value={title}
                                    required
                                />
                            </label>
                        </div>
                        <div className="row">
                            <label name="body" className="col-md-6 col-lg-6">
                                Body
                                <textarea 
                                    name="body" 
                                    className="form-control" 
                                    placeholder="Enter Body"
                                    onChange={this.onChange}
                                    value={body}
                                    required
                                ></textarea>
                            </label>
                        </div>
                        <button className="btn btn-primary col-lg-2 col-md-6 mt-2" disabled={!disableBtn}>
                            <i className="fa fa-plus"></i> Add Post
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

BlogForm.propTypes = {
    disableBtn: PropTypes.bool.isRequired,
    addPost: PropTypes.func.isRequired
}


export default BlogForm;