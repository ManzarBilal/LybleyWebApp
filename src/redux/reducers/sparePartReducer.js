const initialState={
    data: [],
    showLoading: false
};

const allSpareParts=(state=initialState,action)=>{
    switch(action.type){
        case "GET_SPAREPARTS" : return {...state,data:action.payload};
        case "ALL_SPAREPARTS" : return {...state,data:action.payload};
        case "LOADING": return { ...state, showLoading: action.payload };

        default: return state;
    }
}

export default allSpareParts;