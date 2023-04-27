const initialState=1;

const changeValue=(state=initialState,action)=>{
    switch(action.type){
        case "INCREMENT" : return state+action.payload;
        case "SETONE" : return action.payload;
        case "DECREMENT" : return state<=1 ? state=state : state+action.payload;
        default: return state;
    }
}

export default changeValue;