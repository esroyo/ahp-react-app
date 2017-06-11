import {
    CREATE_DECISION,
    UPDATE_DECISION,
    ADD_CRITERION,
    DELETE_CRITERION
} from '../actions';

export default function (state = {}, action) {

    switch (action.type) {

        case CREATE_DECISION:
        case UPDATE_DECISION:
            return {
                ...state,
                [action.payload.id]: { ...action.payload }
            };

        case ADD_CRITERION:
            return {
                ...state,
                [action.payload.decisionId]: {
                    ...state[action.payload.decisionId],
                    criteria: [
                        ...state[action.payload.decisionId].criteria,
                        action.payload.criterion.id
                    ]
                }
            };

        case DELETE_CRITERION:
            return {
                ...state,
                [action.payload.decisionId]: {
                    ...state[action.payload.decisionId],
                    criteria: [
                        ...state[action.payload.decisionId].criteria.filter(criterionId =>
                            criterionId !== action.payload.criterionId
                        )
                    ]
                }
            };

        default:
           return state;
    }
};
