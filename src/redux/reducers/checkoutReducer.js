const initialState=[];

const checkout=(state=initialState,action)=>{
    switch(action.type){
        case "CHECKOUT" : return action.payload; 
        default : return state;
    }
}

export default checkout;