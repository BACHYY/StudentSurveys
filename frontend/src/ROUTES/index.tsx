import React from "react";
import { useAppSelector } from "../Components/useReactRedux";
import AuthorizedRoutes from "./AuthorizedRoutes";
import UnauthorizedRoutes from "./UnauthorizedRoutes";

export default function Routes() {
  const userId = useAppSelector((state) => state.login.data._id);

  return <>{userId ? <AuthorizedRoutes /> : <UnauthorizedRoutes />}</>;
}
