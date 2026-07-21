// import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
// import Loader from '../components/common/Loader.jsx'
// import useAuth from '../hooks/useAuth.js'
// import AboutPage from '../features/about/pages/AboutPage.jsx'
// import AdminLeadsPage from '../features/admin/pages/AdminLeadsPage.jsx'
// import AdminLoginPage from '../features/admin/pages/AdminLoginPage.jsx'
// import AdminPackagesPage from '../features/admin/pages/AdminPackagesPage.jsx'
// import AdminPaymentsPage from '../features/admin/pages/AdminPaymentsPage.jsx'
// import DashboardOverviewPage from '../features/admin/pages/DashboardOverviewPage.jsx'
// import ContactPage from '../features/contact/pages/ContactPage.jsx'
// import HomePage from '../features/home/pages/HomePage.jsx'
// import PackageDetailsPage from '../features/packages/pages/PackageDetailsPage.jsx'
// import PackagesPage from '../features/packages/pages/PackagesPage.jsx'
// import DashboardLayout from '../layouts/DashboardLayout.jsx'
// import MainLayout from '../layouts/MainLayout.jsx'

// function ProtectedOutlet() {
//   const { isAuthenticated, isReady } = useAuth()

//   if (!isReady) {
//     return (
//       <div className="flex min-h-screen items-center justify-center">
//         <Loader label="Preparing dashboard" />
//       </div>
//     )
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/admin/login" replace />
//   }

//   return <Outlet />
// }

// function AppRoutes() {
//   return (
//     <Routes>
//       <Route element={<MainLayout />}>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/packages" element={<PackagesPage />} />
//         <Route path="/packages/:slug" element={<PackageDetailsPage />} />
//         <Route path="/about" element={<AboutPage />} />
//         <Route path="/contact" element={<ContactPage />} />
//       </Route>

//       <Route path="/admin/login" element={<AdminLoginPage />} />

//       <Route element={<ProtectedOutlet />}>
//         <Route path="/admin" element={<DashboardLayout />}>
//           <Route index element={<Navigate to="dashboard" replace />} />
//           <Route path="dashboard" element={<DashboardOverviewPage />} />
//           <Route path="packages" element={<AdminPackagesPage />} />
//           <Route path="leads" element={<AdminLeadsPage />} />
//           <Route path="payments" element={<AdminPaymentsPage />} />
//         </Route>
//       </Route>

//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   )
// }

// export default AppRoutes




import { Navigate, Outlet, Route, Routes } from 'react-router-dom'

import Loader from '../components/common/Loader.jsx'
import useAuth from '../hooks/useAuth.js'

import AboutPage from '../features/about/pages/AboutPage.jsx'
import ContactPage from '../features/contact/pages/ContactPage.jsx'
import HomePage from '../features/home/pages/HomePage.jsx'
import PackageDetailsPage from '../features/packages/pages/PackageDetailsPage.jsx'
import PackagesPage from '../features/packages/pages/PackagesPage.jsx'

import AdminLeadsPage from '../features/admin/pages/AdminLeadsPage.jsx'
import AdminLoginPage from '../features/admin/pages/AdminLoginPage.jsx'
import AdminPackagesPage from '../features/admin/pages/AdminPackagesPage.jsx'
import AdminPaymentsPage from '../features/admin/pages/AdminPaymentsPage.jsx'
import DashboardOverviewPage from '../features/admin/pages/DashboardOverviewPage.jsx'

import DashboardLayout from '../layouts/DashboardLayout.jsx'
import MainLayout from '../layouts/MainLayout.jsx'
import AdminPackageDetailsPage from '../features/admin/pages/AdminPackageDetailsPage.jsx'

function ProtectedOutlet() {
  const { isAuthenticated, isReady } = useAuth()

  if (!isReady) {
    return <Loader />
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  return <Outlet />
}

function GuestOnlyOutlet() {
  const { isAuthenticated, isReady } = useAuth()

  if (!isReady) {
    return <Loader />
  }

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />
  }

  return <Outlet />
}

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="packages" element={<PackagesPage />} />
        <Route path="packages/:slug" element={<PackageDetailsPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>

      <Route element={<GuestOnlyOutlet />}>
        <Route path="/admin/login" element={<AdminLoginPage />} />
      </Route>

      <Route element={<ProtectedOutlet />}>
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardOverviewPage />} />
          <Route path="packages" element={<AdminPackagesPage />} />
          <Route path="packages/:id" element={<AdminPackageDetailsPage />} />
          <Route path="leads" element={<AdminLeadsPage />} />
          <Route path="payments" element={<AdminPaymentsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes
