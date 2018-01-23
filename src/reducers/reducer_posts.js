import _ from 'lodash';
import { FETCH_POSTS} from '../actions';
import {FETCH_POST, DELETE_POST} from '../actions';

//default are state to be an Object here
export default function(state = {}, action){
  switch(action.type) {
    case DELETE_POST:
      return _.omit(state, action.payload);
    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, 'id');
    default:
      return state;

    case FETCH_POST:
      // const post = action.payload.data;
      // cosnt newState = {...state};
      // newstate[post.id] = post;
      // return newState;
      //In ES6:key interpolation
      return{...state, [action.payload.data.id]: action.payload.data};
  }
}
