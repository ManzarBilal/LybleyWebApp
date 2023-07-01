import http from "../../http-common"
import { showLoading } from "./sparePart";
export const getAllCategories = (id) => {
    return async (dispatch) => {
        try {
            let response = await http.get(`/getProductCategoryBy/${id}`);
            dispatch({
                type: "GET_CATEGORY",
                payload: response.data,
            })
            dispatch(showLoading(false))
        }
        
        catch (err) {
            console.log(err)
            dispatch(showLoading(false))

        }
    }
}
export const getAllBrandCategories = (id) => {
    return async (dispatch) => {
        try {
            let response = await http.get(`/getAllProductCategories`);
            dispatch({
                type: "GET_ALL_BRAND_CATEGORY",
                payload: response.data,
            })
            dispatch(showLoading(false))
        }
        
        catch (err) {
            console.log(err)
            dispatch(showLoading(false))

        }
    }
}