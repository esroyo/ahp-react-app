export const CREATE_DECISION = 'create_decision';
export const UPDATE_DECISION = 'update_decision';
export const ADD_CRITERION = 'add_criterion';
export const DELETE_CRITERION = 'delete_criterion';

let criterionId = 0;

export function updateDecision(decision) {
    return {
        type: UPDATE_DECISION,
        payload: decision
    };
};

export function createDecision(decision) {
    return {
        type: CREATE_DECISION,
        payload: decision
    };
};

export function addCriterion(data) {

    data.criterion.id = criterionId;
    criterionId += 1;


    return {
        type: ADD_CRITERION,
        payload: data
    };
};

export function deleteCriterion(decisionId, criterionId) {
    return {
        type: DELETE_CRITERION,
        payload: {
            decisionId,
            criterionId
        }
    };
};
