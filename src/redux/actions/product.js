import http from "../../http-common"


export const getProductById = (id) => {
    return async (dispatch) => {
        try {
            let response = await http.get(`/allProducts/${id}`);
            dispatch({
                type: "GET_PRODUCT",
                payload: response.data,
            })
        }
        catch (err) {
            console.log(err)
        }
    }
}