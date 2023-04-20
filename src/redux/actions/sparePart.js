import http from "../../http-common"
export const getAllSpareParts = (id) => {
    return async (dispatch) => {
        try {
            let response = await http.get(`/sparePart/${id}`);
            dispatch({
                type: "GET_SPAREPARTS",
                payload: response.data,
            })
        }
        catch (err) {
            console.log(err)
        }
    }
}