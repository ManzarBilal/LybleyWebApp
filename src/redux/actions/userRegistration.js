import http from "../../http-common"

export const userReg = (regForm) => {
    return async (dispatch) => {
        try {
            let response = await http.post("/userRegistration", regForm);
            dispatch({
                type: "USER_REGISTRATION",
                payload: response.data,
            })
        }
        catch (err) {
            console.log(err)
        }
    }
}