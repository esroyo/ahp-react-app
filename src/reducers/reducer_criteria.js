import _ from 'lodash';
import {
    ADD_CRITERION,
    DELETE_CRITERION
} from '../actions';

export default function (state = {}, action) {

    switch (action.type) {

        case ADD_CRITERION:

            return {
                ...state,
                [action.payload.criterion.id]: action.payload.criterion
            };

        case DELETE_CRITERION:
            return _.omit(state, action.payload.criterionId);

        default:
           return state;
    }
};
