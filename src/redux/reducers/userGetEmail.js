const initialState={contact:""};

const userEmail=(state=initialState,action)=>{
    switch(action.type){
        case "USER_EMAIL" : return {contact:+action.payload};
        default: return state;
    }
}

export default userEmail;