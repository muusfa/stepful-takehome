import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LandingPage from './pages/LandingPage';
import StudentPage from './pages/StudentPage';
import CoachPage from './pages/CoachPage';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { AppProvider } from './context/AppContext';
import { createTheme, ThemeProvider } from '@mui/material';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/student",
    element: <StudentPage />,
  },
  {
    path: "/coach",
    element: <CoachPage />,
  },
]);

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Your primary color
      dark: '#135ba1', // Darker shade for hover effect
      contrastText: '#fff', // Text color against primary color
    },
    // Add more colors here (secondary, error, etc.)
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AppProvider>
          <RouterProvider router={router} />
        </AppProvider>
      </LocalizationProvider>
    </ThemeProvider>
  </React.StrictMode >,
)
