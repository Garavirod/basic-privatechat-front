import { types } from "../../types/types";

export const ChatReducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case types.usersLoadded:
            return {
                ...state,
                users: [...action.payload]
            }

        case types.activeChat:
            if(state.activeChat === action.payload) return state; //for avoiding purge all message
            return {
                ...state,
                activeChat: action.payload,
                messages:[]
            }

        case types.newMessage:
            if(state.activeChat === action.payload.from || state.activeChat === action.payload.to){
                return {
                    ...state,
                    messages: [...state.messages, action.payload]
                }
            }else{
                return state;
            }

        case types.loadMessages:
            return{
                ...state,
                messages: [ ...action.payload ]
            }
        
        case types.purge:
            return {
                uid:'',
                activeChat:null, //User wich message want to be sent
                users:[], //users bdd list
                messages:[] //choosen chat
            }
        default:
            return state;
    }
}