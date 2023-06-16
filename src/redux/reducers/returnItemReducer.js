const initialState={};

const orderItem=(state=initialState,action)=>{
    switch(action.type){
        case "RETURN_ITEM" : return action.payload;
        default: return state;
    }
}

export default orderItem;