const initialState={};

const addToCart=(state=initialState,action)=>{
    switch(action.type){
        case "GET_CARTITEMS" : return action.payload;
        case "ADD_TOCART" : return action.payload;
        case "DELETE_CARTITEM" : return action.payload;
        default: return state;
    }
}

export default addToCart;