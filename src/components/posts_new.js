import React, {Component} from 'react';
import { Field, reduxForm} from 'redux-form';
import { Link } from 'react-router-dom';
import { connect} from 'react-redux';
import {createPost} from '../actions';


class PostsNew extends Component{

renderField(field){

    //destructuring:
    const {meta: {touched,error}} = field;
    const className = `form-group ${touched && error ? 'has-danger' :''}`;

    return(
        <div className =  {className}>
          <label> {field.label} </label>
          <input className="form-control"
            type="text"
            {...field.input}

          />
          <div className ="form-control-feedback">
          {touched ? error : ''}
        </div>
        </div>
    );
}

  onSubmit(values){

      // console.log(values);
      this.props.createPost(values, () =>{
        this.props.history.push("/");
      });

  }
  render(){
    //this is a property passed to the component as part of redux form
    const {handleSubmit} = this.props;
    return(
        <form onSubmit ={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label ="Title for post"
            name ="title"
            //component has to be a function that returns some amount of JSX
            component ={this.renderField}
          />
          <Field
            label ="Categories"
            name ="categories"
            //component has to be a function that returns some amount of JSX
            component ={this.renderField}
          />
          <Field
            label ="Post Content"
            name ="content"
            component ={this.renderField}
            />

            <button type="submit" className ="btn btn-primary"> Submit</button>
            <Link to="/" className ="btn btn-danger">Cancel</Link>
          </form>

    );
  }
}

function validate(values){

    const errors ={};

    //validate the inputs from 'values'
    if(!values.title){
      errors.title = "Enter a title!";
    }
    if(!values.categories){
      errors.categories = "Enter some categories!";
    }
    if(!values.content){
      errors.content = "Enter some content!";
    }

    //If errors is empty form is fine to submit
    //If form has any properties, redux assumes form is invalid
    return errors;
}

export default reduxForm({
  //make sure the string is unique
  validate : validate,
  form: 'PostsNewForm'
})(
  connect(null, {createPost})(PostsNew)
);
