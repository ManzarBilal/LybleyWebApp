import http from "../../http-common"

export const userResendOtp = (regResendOtp) => {
    return async (dispatch) => {
        try {
            let response = await http.patch("/resendOtp", regResendOtp);
            dispatch({
                type: "USER_RESENDOTP",
                payload: response.data,
            })
        }
        catch (err) {
            console.log(err)
        }
    }
}