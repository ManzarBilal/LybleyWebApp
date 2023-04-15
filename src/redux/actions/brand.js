import http from "../../http-common"

export const getAllBrands = () => {
    return async (dispatch) => {
        try {
            let response = await http.get("/getAllBrands");
            dispatch({
                type: "GET_BRANDS",
                payload: response.data,
            })
        }
        catch (err) {
            console.log(err)
        }
    }
}
export const getBrandById = (id) => {
    return async (dispatch) => {
        try {
            let response = await http.get(`/getBrandBy/${id}`);
            dispatch({
                type: "BRAND",
                payload: response.data,
            })
        }
        catch (err) {
            console.log(err)
        }
    }
}