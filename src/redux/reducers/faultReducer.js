const initialState=[];

const allSpareParts=(state=initialState,action)=>{
    switch(action.type){
        case "GET_SPAREPARTS" : return action.payload;
        default: return state;
    }
}

export default allSpareParts;