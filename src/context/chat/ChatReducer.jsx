import { types } from "../../types/types";

export const ChatReducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case types.usersLoadded:
            return {
                ...state,
                users: [...action.payload]
            }
        default:
            return state;
    }
}