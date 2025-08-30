import React from 'react'
import { Navigate, useLocation } from 'react-router'
import { useGetProfileQuery } from '@/redux/features/auth/auth.api'
import LoadingScreen from '@/components/common/LoadingScreen'

type Role = 'sender' | 'receiver' | 'admin'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: Role[]
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const location = useLocation()
  const { data: profile, isLoading, isError } = useGetProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  })

  if (isLoading) return <LoadingScreen />

  if (isError || !profile?.data) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (allowedRoles && !allowedRoles.includes(profile.data.role as Role)) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

