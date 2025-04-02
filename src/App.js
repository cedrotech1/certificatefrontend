
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importing components from the landing pages
import Home from "./pages/landing/home";
import Login from "./pages/landing/login";
import NotFound from './pages/landing/notfound';
import Logout from './pages/landing/logout';
import Prof from "./pages/user/user-profile";
import UsersPage from "./pages/Admin/usersPage";
import Forgot from "./pages/landing/reset";
import Code from "./pages/landing/code";
import ResetPassword from "./pages/landing/resetPassword";
import Upload from "./pages/Admin/uploadpage";
import Certificates from "./pages/Admin/certificatespage";
import Setting from "./pages/Admin/user-profile";


// Main App component  Certificates
function App() {
  return (
    // Set up the BrowserRouter for handling routes
    <BrowserRouter>
      {/* Define the routes using the Routes component */}
      <Routes>
        {/* Landing Pages */}
        <Route path="/" element={<Home />} exact={true} />
        <Route path="/login" element={<Login />} exact={true} />
        <Route path="/logout" element={<Logout />} exact={true} />
        <Route path="/profile" element={<Prof />} exact={true} />
        <Route path="/forgot" element={<Forgot />} exact={true} />
        <Route path="/code/:email" element={<Code/>} exact={true} />
        <Route path="/resetPassword/:email" element={<ResetPassword/>} exact={true} />
        <Route path="*" element={<NotFound />} />
        <Route path="/users" element={<UsersPage />} exact={true} />
        <Route path="/upload" element={<Upload/>} exact={true} />
        <Route path="/certificates" element={<Certificates/>} exact={true} />
        <Route path="/settings" element={<Setting />} exact={true} />


        
      </Routes>
    </BrowserRouter>
  );
}

// Export the App component as the default export    OurResto
export default App;
