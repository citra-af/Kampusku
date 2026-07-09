import React from "react";
import ReactDOM from "react-dom/client";
import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthProvider } from "@/Context/AuthContext";

import "./app.css";

import { Toaster } from "react-hot-toast";

import AuthLayout from "@/Pages/Auth/AuthLayout";
import AdminLayout from "@/Pages/Admin/AdminLayout";

import ProtectedRoute from "@/Pages/Admin/Components/ProtectedRoute";
import PermissionRoute from "@/Pages/Admin/Components/PermissionRoute";

import Login from "@/Pages/Auth/Login/login";
import Register from "@/Pages/Auth/Register/Register";

import Dashboard from "@/Pages/Admin/Dashboard/Dashboard";

import Mahasiswa from "@/Pages/Admin/Mahasiswa/Mahasiswa";
import MahasiswaDetail from "@/Pages/Admin/MahasiswaDetail/MahasiswaDetail";

import Dosen from "@/Pages/Admin/Dosen/Dosen";

import MataKuliah from "@/Pages/Admin/MataKuliah/MataKuliah";

import Kelas from "@/Pages/Admin/Kelas/Kelas";

import RencanaStudi from "@/Pages/Admin/RencanaStudi/RencanaStudi";

import User from "@/Pages/Admin/User/User";

import PageNotFound from "@/Pages/Error/PageNotFound";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "mahasiswa",
        children: [
          {
            index: true,
            element: <Mahasiswa />,
          },
          {
            path: ":id",
            element: <MahasiswaDetail />,
          },
        ],
      },
      {
        path: "dosen",
        children: [
          {
            index: true,
            element: <Dosen />,
          },
        ],
      },
      {
        path: "matakuliah",
        element: <MataKuliah />,
      },
      {
        path: "kelas",
        element: (
          <PermissionRoute permission="kelas.page">
            <Kelas />
          </PermissionRoute>
        ),
      },
      {
        path: "rencanastudi",
        element: (
          <PermissionRoute permission="rencanastudi.page">
            <RencanaStudi />
          </PermissionRoute>
        ),
      },
      {
        path: "user",
        element: (
          <PermissionRoute permission="user.page">
            <User />
          </PermissionRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster position="top-right" />
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);