import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import Checkin from "./pages/Checkin";

import { Toaster } from "react-hot-toast";
import Booking from "./pages/Booking";
import ProtectedRoute from "./ui/ProtectedRoute";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60,
    },
  },
});

function App() {
  const router = createBrowserRouter([
    {
      element: (
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Navigate replace to="dashboard" /> },
        { path: "/dashboard", element: <Dashboard /> },
        { path: "/bookings", element: <Bookings /> },
        { path: "/bookings/:bookingId", element: <Booking /> },
        { path: "/checkin/:bookingId", element: <Checkin /> },
        { path: "/cabins", element: <Cabins /> },
        { path: "/users", element: <Users /> },
        { path: "/settings", element: <Settings /> },
        { path: "/account", element: <Account /> },
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "*", element: <PageNotFound /> },
  ]);
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <RouterProvider router={router}></RouterProvider>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            fontSize: "16px",
            background: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
            padding: "16px 24px",
            maxWidth: "500px",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
