export const increment=(value)=>{
    return (dispatch)=>{
        dispatch({
        type:"INCREMENT",
        payload:value
    })
    }
}

export const decrement=(value)=>{
    return (dispatch)=>{
        dispatch({
        type:"DECREMENT",
        payload:value
    })
    }
}
