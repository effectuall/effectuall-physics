import { Link, Outlet, useNavigate } from "react-router-dom";
import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

const Layout = () => {
  const navigate = useNavigate();
  return (
    <ClerkProvider
      navigate={navigate}
      afterSignInUrl="/dashboard"
      afterSignUpUrl="/dashboard"
      publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
    >
      <header>
        <p>netlify-react-clerk</p>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <SignedIn>
            <li>
              <UserButton afterSignOutUrl="/" />
            </li>
          </SignedIn>
          <SignedOut>
            <li>
              <Link to="/sign-in">Sign In</Link>
            </li>
            <li>
              <Link to="/sign-up">Sign Up</Link>
            </li>
          </SignedOut>
        </ul>
      </header>
      <main>
        <Outlet />
      </main>
    </ClerkProvider>
  );
};

export default Layout;