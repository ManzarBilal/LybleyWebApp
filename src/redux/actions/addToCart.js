import http from "../../http-common"
import {   toast } from 'react-toastify';

export const getCartItems = (id) => {
    return async (dispatch) => {
        try {
            let response = await http.get(`/getCartItemsById/${id}`);
            dispatch({
                type: "GET_CARTITEMS",
                payload: response.data,
            })
           
        }
        catch (err) {
            console.log(err)
        }
    }
}
 
export const handleQuantity = (cartData) => {
    return (dispatch) => {
            dispatch({
                type: "QUANTITY",
                payload: cartData, 
            })
    }
}

export const addCart = (cartData) => {
    return (dispatch) => {
            dispatch({
                type: "ADD_CART",
                payload: cartData, 
            })
    }
}

export const deleteCart = (cartData) => {
    return (dispatch) => {
            dispatch({
                type: "DELETE_CART",
                payload: cartData, 
            })
    }
}

export const addToCart = (cartData) => {
    return async (dispatch) => {
        try {
            let response = await http.post(`/addToCart`,cartData);
            dispatch({
                type: "ADD_TOCART",
                payload: response.data, 
            })

            toast.success(`${response.data?.msg}!`, {
                position: toast.POSITION.TOP_CENTER
              });
        }
       
        catch (err) {
            console.log(err)

        
        }
       
    }
}
export const deleteCartItem = (id) => {
    return async (dispatch) => {
        try {
            let response = await http.deleteData(`/deleteCartItemBy/${id}`);
            dispatch({
                type: "DELETE_CARTITEM",
                payload: response.data,
            })
        }
        catch (err) {
            console.log(err)
        }
    }
}

 