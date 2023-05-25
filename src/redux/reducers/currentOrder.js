const initialState={};

const currentOrder=(state=initialState,action)=>{
        switch(action.type){
            case "CURRENT_ORDER": return action.payload;
            default : return state;
        }
}

export default currentOrder;