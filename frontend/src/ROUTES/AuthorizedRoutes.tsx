import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useSearchParams } from 'react-router-dom';
import AddProfessors from '../Components/AddProfessors';
import AddSchools from '../Components/AddSchools';
import Review from '../Components/Review';
import Snack from '../Components/Snack';
import { useAppSelector } from '../Components/useReactRedux';
import BookmarkedReviews from '../Pages/BookmarkedReviews';
import ChangePassword from '../Pages/ChangePassword';
import MainPage from '../Pages/MainPage';
import School from '../Pages/School';
import SecurityQuestion from '../Pages/SecurityQuestion';
import SettingsReviews from '../Pages/SettingsReviews';
import UserSettings from '../Pages/UserSettings';
import Course from '../Components/Course';

export default function AuthorizedRoutes() {
    const userid = useAppSelector((state) => state.login.data._id);
    const { pathname } = useLocation();

    const [, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (!userid) return;
        setSearchParams({ userid: userid });
    }, [userid, pathname]);

    return (
        <>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/school/:name" element={<School />} />
                <Route path="/course/:course_id" element={<Course />} />

                <Route path="/professor/:_id" element={<Review />} />
                <Route path="/usersettings" element={<UserSettings />} />
                <Route path="/usersettings/securityquestion" element={<SecurityQuestion />} />

                <Route path="/usersettings/securityquestion/changepassword" element={<ChangePassword />} />
                <Route path="/userSettings/reviews" element={<SettingsReviews />} />
                <Route path="/userSettings/bookmarkedReviews" element={<BookmarkedReviews />} />
                <Route path="/admin/addSchools" element={<AddSchools />} />

                <Route path="/admin/addProfessors" element={<AddProfessors />} />

                <Route path={'*'} element={<Navigate to={'/'} />} />
            </Routes>
            <Snack />
        </>
    );
}
