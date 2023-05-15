const initialState=[];

const allOrders=(state=initialState,action)=>{
    switch(action.type){
        case "ORDERS" : return action.payload;
        default: return state;
    }
}

export default allOrders;