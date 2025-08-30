import ProtectedRoute from '@/routes/ProtectedRoute'
import DashboardPage from '@/pages/Dashboard/components/DashboardPage'
import SenderParcel from '@/pages/Dashboard/Sender/SenderParcel'
import ReceiverParcel from '@/pages/Dashboard/Receiver/ReceiverParcel'
import AdminParcel from '@/pages/Dashboard/Admin/AdminParcel'
import UserPage from '@/pages/Dashboard/Admin/UserPage'
import DeliveryHistory from '@/pages/Dashboard/Receiver/DeliveryHistory'

export function SenderDashboardRoute() {
  return (
    <ProtectedRoute allowedRoles={['sender']}>
      <DashboardPage />
    </ProtectedRoute>
  )
}

export function ReceiverDashboardRoute() {
  return (
    <ProtectedRoute allowedRoles={['receiver']}>
      <DashboardPage />
    </ProtectedRoute>
  )
}

export function AdminDashboardRoute() {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <DashboardPage />
    </ProtectedRoute>
  )
}

export function SenderParcelRoute() {
  return (
    <ProtectedRoute allowedRoles={['sender']}>
      <SenderParcel />
    </ProtectedRoute>
  )
}

export function ReceiverParcelRoute() {
  return (
    <ProtectedRoute allowedRoles={['receiver']}>
      <ReceiverParcel />
    </ProtectedRoute>
  )
}

export function AdminParcelRoute() {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <AdminParcel />
    </ProtectedRoute>
  )
}

export function AdminUserRoute() {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <UserPage />
    </ProtectedRoute>
  )
}

export function ReceiverDeliveryHistoryRoute() {
  return (
    <ProtectedRoute allowedRoles={['receiver']}>
      <DeliveryHistory />
    </ProtectedRoute>
  )
}

