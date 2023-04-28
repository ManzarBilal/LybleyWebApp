export const handleCheckout=(data)=>{
    return (dispatch)=>{
        dispatch({
           type:"CHECKOUT",
           payload:data
        })
    }
}