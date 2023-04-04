const initialState={};

const userRegistration=(state=initialState,action)=>{
    switch(action.type){
        case "USER_REGISTRATION" : return action.payload;
        case "USER_LOGIN" : return action.payload;
        case "USER_VERIFICATION" : return action.payload;
        case "USER_RESENDOTP" : return action.payload;
        default: return state;
    }
}

export default userRegistration;