export const increment=(value)=>{
    return (dispatch)=>{
        dispatch({
        type:"INCREMENT",
        payload:value
    })
    }
}

export const setOne=(value)=>{
    return (dispatch)=>{
        dispatch({
        type:"SETONE",
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
