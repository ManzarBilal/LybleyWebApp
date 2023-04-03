import http from "../../http-common"

export const userLog = (regForm) => {
    return async (dispatch) => {
        try {
            let response = await http.post("/userLogin", regForm);
            dispatch({
                type: "USER_LOGIN",
                payload: response.data,
            })
        }
        catch (err) {
            console.log(err)
        }
    }
}