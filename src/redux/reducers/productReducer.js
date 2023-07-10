const initialState= {
    data: [],
    showLoading: false
};

const allProducts=(state=initialState,action)=>{
    switch(action.type){
        case "GET_PRODUCT" : return {...state,data:action.payload};
        case "GET_PRODUCT_BY_BRAND" : return {...state,data:action.payload};
        case "LOADING": return { ...state, showLoading: action.payload };
        default: return state;
    }
}

export default allProducts;