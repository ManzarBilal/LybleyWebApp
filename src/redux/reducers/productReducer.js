const initialState=[];

const allProducts=(state=initialState,action)=>{
    switch(action.type){
        case "GET_PRODUCT" : return action.payload;
        default: return state;
    }
}

export default allProducts;