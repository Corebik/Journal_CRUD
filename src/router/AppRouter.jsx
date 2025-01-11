import { Navigate, Route, Routes } from "react-router";
import { AuthRoutes } from "../auth/routes";
import { JournalRoutes } from "../app/routes";
import { CheckingAuth } from "../ui";
import { useCheckAuth } from "../hooks/useCheckAuth";

export const AppRouter = () => {

  const { status } = useCheckAuth();
  
  if( status === 'checking' ) {
    return <CheckingAuth />
  }

  return (
    <Routes>

      {
        ( status === 'authenticated' )
          ? <Route path="/*" element={<JournalRoutes />} />
          : <Route path="/auth/*" element={<AuthRoutes />} />
      }

      <Route path="/*" element={ <Navigate to="/auth/login" /> } />

      {/* Login & Register */}
      {/* <Route path="auth/*" element={<AuthRoutes />} /> */}

      {/* JournalApp */}
      {/* <Route path="/*" element={<JournalRoutes />} /> */}
      
    </Routes>
  )
}
