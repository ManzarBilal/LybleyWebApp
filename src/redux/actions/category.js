import http from "../../http-common"
export const getAllCategories = (id) => {
    return async (dispatch) => {
        try {
            let response = await http.get(`/getProductCategoryBy/${id}`);
            dispatch({
                type: "GET_CATEGORY",
                payload: response.data,
            })
        }
        catch (err) {
            console.log(err)
        }
    }
}