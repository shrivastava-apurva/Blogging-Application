import React, {Component} from 'react';
import {fetchPost, deletePost} from '../actions';
import { connect } from 'react-redux';
import { Link} from 'react-router-dom';


class PostsShow extends Component{
  componentDidMount() {
    //provided by react router- params will contain all the wildcard details
    //const {id} = this.props.match.params.id;
    this.props.fetchPost(this.props.match.params.id);
  }
  onDeleteClick(){

    this.props.deletePost(this.props.match.params.id, () =>{
      this.props.history.push('/');
        });
  }

  render(){
    const {post} = this.props;

    if(!post){
      return <div>Loading...</div>;
    }
    return(

        <div>
            <Link to="/" className ="btn btn-primary">Back to Index </Link>
            <button
              className ="btn btn-danger pull-xs-right"
              onClick ={this.onDeleteClick.bind(this)}
            >
              Delete Post
            </button>
            <h3>{post.title}</h3>
            <h6>Categories: {post.categories}</h6>
            <p>{post.content}</p>
        </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {
    return { post: posts[ownProps.match.params.id]};
}

export default connect(mapStateToProps, {fetchPost, deletePost})(PostsShow);
