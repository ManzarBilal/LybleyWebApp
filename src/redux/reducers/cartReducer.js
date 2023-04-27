const initialState=[];

const addToCart=(state=initialState,action)=>{
    switch(action.type){
        case "GET_CARTITEMS" : return action.payload;
        case "ADD_TOCART" : return action.payload;
        case "ADD_CART" : {
            let state1=[...state];
            let item=state1.find(s1=>s1?.sparePartId===action?.payload?.sparePartId);
            let state2=null;
            if(item){
                state2=state1.map(s1=> s1?.sparePartId===action?.payload?.sparePartId ? {...s1,quantity:s1.quantity+action?.payload?.quantity} : s1);
            }else{
                state2=[...state1,action.payload];
            }
            return state2;
        };
        case "QUANTITY" : {
            let state1=[...state];
            let item=state1.find(s1=>s1?.sparePartId===action?.payload?.sparePartId);
            let state2=null;
            if(item){
                state2=state1.map(s1=> s1?.sparePartId===action?.payload?.sparePartId ? {...s1,quantity:(s1.quantity<=1 && action?.payload?.quantity===-1) ? s1.quantity : s1.quantity+action?.payload?.quantity} : s1);
            }else{
                state2=[...state1];
            }
            return state2;
        }
        case "DELETE_CART" : {
            let state1=[...state];
            let index=state1.find(s1=>s1?.sparePartId===action?.payload?.sparePartId);
            let state2=null;
            if(index){
                state2=state1.filter(s1=>s1?.sparePartId!==action?.payload?.sparePartId)
            }else{
                state2=[...state1];
            }
            return state2;
        }
        case "DELETE_CARTITEM" : return action.payload;
        default: return state;
    }
}

export default addToCart;