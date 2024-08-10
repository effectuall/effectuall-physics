import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import "@fortawesome/fontawesome-free/css/all.min.css";
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ReactGA from 'react-ga4';

// Import the layouts
import RootLayout from './layouts/root-layout'
import DashboardLayout from './layouts/dashboard-layout'

// Import the components
import IndexPage from './routes'
import ContactPage from './routes/contact'
import SignInPage from './routes/sign-in'
import SignUpPage from './routes/sign-up'
import DashboardPage from './routes/dashboard'
import ScenePage from './routes/dashboard.scene'
import WebPage from './routes/webPage';
import Simulations from './routes/simulations'
import ChatBot from './components/chatBot';
import AboutPage from './routes/about';
import VisualPage from './routes/visualization';

// Initialize Google Analytics
// const trackingId = 'G-8Q7GMVMJT7'; // Replace with your Google Analytics tracking ID G-8Q7GMVMJT7
// ReactGA.initialize(trackingId);

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <IndexPage /> },
      { path: "/chatbot", element: <ChatBot /> },
      { path: "/simulations", element: <Simulations /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/sign-in/*", element: <SignInPage /> },
      { path: "/sign-up/*", element: <SignUpPage /> },
      { path: "/visualpage/:url", element: <VisualPage /> },
      {
        element: <DashboardLayout />,
        path: "dashboard",
        children: [
          { path: "/dashboard", element: <DashboardPage /> },
          { path: "/dashboard/scene", element: <ScenePage /> },
          { path: "/dashboard/webpage/:url", element: <WebPage /> }
        ]
      }
    ]
  }
])

// Log page views to Google Analytics
// router.subscribe((location) => {
//   ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
// });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
