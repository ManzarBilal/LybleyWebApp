import http from "../../http-common"
import { showLoading } from "./sparePart";


export const getProductById = (id) => {
    return async (dispatch) => {
        try {
            let response = await http.get(`/allProducts/${id}`);
            dispatch({
                type: "GET_PRODUCT",
                payload: response.data,
            })
            dispatch(showLoading(false))

        }
        catch (err) {
            dispatch(showLoading(false))

            console.log(err)
        }
    }
}
export const getProductByBrand = (id) => {
    return async (dispatch) => {
        try {
            let response = await http.get(`/allProductsByBrand/${id}`);
            dispatch({
                type: "GET_PRODUCT_BY_BRAND",
                payload: response.data,
            })
            dispatch(showLoading(false))

        }
        catch (err) {
            dispatch(showLoading(false))

            console.log(err)
        }
    }
}