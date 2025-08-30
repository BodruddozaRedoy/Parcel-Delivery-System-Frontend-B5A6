import ProtectedRoute from '@/routes/ProtectedRoute'
import DashboardLayout from '@/layouts/DashboardLayout'

export default function ProtectedDashboardLayout() {
  return (
    <ProtectedRoute>
      <DashboardLayout />
    </ProtectedRoute>
  )
}