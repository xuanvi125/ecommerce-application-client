import { useAuth } from "../contexts/authContext";
import Forbidden from "../pages/Forbidden";

export default function AdminRoute({ children }) {
  const { user } = useAuth();
  if (!user || user.role.name != "ROLE_ADMIN") {
    return <Forbidden />;
  }
  return <>{children}</>;
}
