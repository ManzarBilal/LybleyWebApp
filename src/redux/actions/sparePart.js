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

export const allSparePart=(search)=>{
    return async(dispatch)=>{
        try{
            let response=await http.get(`/allSparePart?sparePart=${search}`);
            dispatch({
                type:"ALL_SPAREPARTS",
                payload:response.data
            })
        }catch(err){
            console.log(err);
        }
    }
}
export const showLoading = (status) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: "LOADING",
                payload: status,
            })
        } catch (err) {
            console.log(err);
        }
    }
}