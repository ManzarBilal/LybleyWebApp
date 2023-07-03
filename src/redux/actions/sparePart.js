import http from "../../http-common"
 

export const getAllSpareParts = (id) => {
    return async (dispatch) => {
        try {
            let response = await http.get(`/sparePart/${id}`);
            dispatch({
                type: "GET_SPAREPARTS",
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

export const getSparePartsByCat = (data) => {
    return async (dispatch) => {
            dispatch({
                type: "GET_SPAREPARTS",
                payload: data,
            })
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
            dispatch(showLoading(false))

        }catch(err){
            dispatch(showLoading(false))
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