import { Navigate } from "react-router-dom";

import { useAuth } from "@/Context/AuthContext";

const PermissionRoute = ({
  children,
  permission,
}) => {
  const { user } = useAuth();

  if (
    !user?.permission?.includes(permission)
  ) {
    return (
      <Navigate
        to="/admin/dashboard"
        replace
      />
    );
  }

  return children;
};

export default PermissionRoute;