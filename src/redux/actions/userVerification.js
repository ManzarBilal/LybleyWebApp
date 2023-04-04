import http from "../../http-common"

export const userVerification = (regVerify) => {
    return async (dispatch) => {
        try {
            let response = await http.patch("/otpVerification", regVerify);
            dispatch({
                type: "USER_VERIFICATION",
                payload: response.data,
            })
        }
        catch (err) {
            console.log(err)
        }
    }
}