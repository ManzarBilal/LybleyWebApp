const initialState=[];

const allBrands=(state=initialState,action)=>{
    switch(action.type){
        case "GET_BRANDS" : return action.payload;
        default: return state;
    }
}

export default allBrands;