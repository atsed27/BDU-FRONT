import * as AuthApi from "../api/AuthRequests";
export const logIn = (formData, navigate) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.logIn(formData);
    if(data.user.isAdmin || data.user.activeStatus === "active") {
      dispatch({ type: "AUTH_SUCCESS", data: data });
    navigate("../home", { replace: true });
    }
    else {
      console.log("you are not an admin or active")
      dispatch({ type: "AUTH_FAIL" });
    }
    
  } catch (error) {
    console.log(error);
    dispatch({ type: "AUTH_FAIL" });
  }
};

export const signUp = (formData, navigate) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.signUp(formData);
    //dispatch({ type: "AUTH_SUCCESS", data: data });
    dispatch({type: "SIGNUP_SUCCESS"});
    //navigate("../home", { replace: true });
  } catch (error) {
    console.log(error);
    dispatch({ type: "AUTH_FAIL" });
  }
};


export const logout = ()=> async(dispatch)=> {
  dispatch({type: "LOG_OUT"})
}
