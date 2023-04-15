const initialState={
    allBrands:[],
    brand:{}

};

const allBrands=(state=initialState,action)=>{
    switch(action.type){
        case "GET_BRANDS" : return {...state,allBrands:action.payload};
        case "BRAND" : return {...state,brand:action.payload};
        default: return state;
    }
}

export default allBrands;