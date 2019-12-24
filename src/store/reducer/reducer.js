import ActionTypes from '../constant/constant';

const INITIAL_STATE = {
    USERDATA: null,
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.USERDATA:
            return ({
                ...state,
                USERDATA: action.payload
            })
        default:
            return state;
    }

}