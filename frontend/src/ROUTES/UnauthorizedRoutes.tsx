import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import AddProfessors from "../Components/AddProfessors";
import AddSchools from "../Components/AddSchools";
import Review from "../Components/Review";
import BookmarkedReviews from "../Pages/BookmarkedReviews";
import ChangePassword from "../Pages/ChangePassword";
import MainPage from "../Pages/MainPage";
import School from "../Pages/School";
import SecurityQuestion from "../Pages/SecurityQuestion";
import SettingsReviews from "../Pages/SettingsReviews";
import Signup from "../Pages/Signup";
import UserSettings from "../Pages/UserSettings";

import { useEffect } from "react";
import ForgotPassword from "../Components/ForgotPassword";
import Signin from "../Components/Signin";
import Snack from "../Components/Snack";
import UnAuthorizedSecurityQuestion from "../Components/UnAuthorizedSecurityQuestion";
import { useAppSelector } from "../Components/useReactRedux";

export default function UnauthorizedRoutes() {
  const userid = useAppSelector((state) => state.forgotPass.data._id);
  const { pathname } = useLocation();

  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!userid) return;
    setSearchParams({ userid: userid });
  }, [userid, pathname]);
  return (
    <>
      <Routes>
        <Route path="/signin" element={<Signin />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route
          path="/securityquestion"
          element={<UnAuthorizedSecurityQuestion />}
        />
        <Route path="/" element={<MainPage />} />
        <Route path="/school/:name" element={<School />} />
        <Route path="/professor/:name" element={<Review />} />
        <Route path="/usersettings" element={<UserSettings />} />
        <Route
          path="/usersettings/securityquestion"
          element={<SecurityQuestion />}
        />
        <Route
          path="/usersettings/securityquestion/changepassword"
          element={<ChangePassword />}
        />
        <Route path="/userSettings/reviews" element={<SettingsReviews />} />
        <Route
          path="/userSettings/bookmarkedReviews"
          element={<BookmarkedReviews />}
        />
        <Route path="/admin/addSchools" element={<AddSchools />} />

        <Route path="/admin/addProfessors" element={<AddProfessors />} />

        <Route path={"*"} element={<Navigate to={"/"} />} />
      </Routes>
      <Snack />
    </>
  );
}
