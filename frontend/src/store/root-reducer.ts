import { combineReducers } from "@reduxjs/toolkit";
import forgotPass from "./slices/forgot-password-slice";
import login from "./slices/login-slice";
import passupdate from "./slices/password-update-slice";
import bookmark from "./slices/post-bookmark-slice";
import reply from "./slices/post-reply-slice";
import review from "./slices/post-review-slice";
import professor from "./slices/professor-slice";
import school from "./slices/school-slice";
import securityAnswer from "./slices/security-answer-slice";
import snackbar from "./slices/snackbar-slice";
import user from "./slices/user-slice";
import userupdate from "./slices/user-update-slice";

const rootReducer = combineReducers({
  user,
  snackbar,
  login,
  forgotPass,
  school,
  professor,
  userupdate,
  passupdate,
  securityAnswer,
  review,
  bookmark,
  reply,
});

export default rootReducer;
