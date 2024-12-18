/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "../auth/useUser";
import Loader from "./Loader";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useUser();
  // console.log(user.id);

  // Redirect to login if not authenticated and not loading
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Show a loading spinner while the authentication state is loading
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-full w-full">
        <Loader />
      </div>
    );

  // Render the protected component if authenticated
  if (isAuthenticated) return children;

  // Return null while redirecting (prevents rendering)
  return null;
}

// export default ProtectedRoute;

// /* eslint-disable react/prop-types */
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import { useUser } from "../auth/useUser";

// function ProtectedRoute({ children }) {
//   const navigate = useNavigate();
//   // 1, load authenticated user
//   const { isAuthenticated, isLoading } = useUser();

//   // 2, redirect to login if not authenticated

//   useEffect(
//     function () {
//       if (!isAuthenticated && !isLoading) {
//         navigate("/login");
//       }
//     },
//     [isAuthenticated, isLoading, navigate]
//   );

//   // 3, load the spinner
//   if (isLoading) return <div>...loading</div>;

//   // 4, if there is render app
//   if (isAuthenticated) return children;
// }

export default ProtectedRoute;
