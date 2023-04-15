const initialState=[];

const allCategories=(state=initialState,action)=>{
    switch(action.type){
        case "GET_CATEGORY" : return action.payload;
        default: return state;
    }
}

export default allCategories;