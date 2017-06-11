import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import DecisionsReducer from './reducer_decisions';
import CriteriaReducer from './reducer_criteria';

const rootReducer = combineReducers({
    decisions: DecisionsReducer,
    criteria: CriteriaReducer,
    form: formReducer
});

export default rootReducer;
