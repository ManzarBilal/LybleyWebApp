import http from "../../http-common"

export const getOrderById = (id) => {
    return async (dispatch) => {
        try {
            let response = await http.get(`/getOrderByCustomer/${id}`);
            dispatch({
                type: "ORDERS",
                payload: response.data,
            })
        }
        catch (err) {
            console.log(err)
        }
    }
}