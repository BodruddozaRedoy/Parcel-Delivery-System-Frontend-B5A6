import LoadingScreen from '@/components/common/LoadingScreen'
import Footer from '@/components/layouts/Footer/Footer'
import Navbar from '@/components/layouts/Navbar/Navbar'
import { useGetProfileQuery } from '@/redux/features/auth/auth.api'
import { Outlet } from 'react-router'
import { Toaster } from 'sonner'

export default function MainLayout() {
    const { isLoading } = useGetProfileQuery()
    return (
        <>
            {
                isLoading ? <LoadingScreen /> : <div className='h-screen flex flex-col'>
                    <nav>
                        <Navbar />
                    </nav>
                    <main className='flex-1'>
                        <Outlet />
                    </main>
                    <footer>
                        <Footer />
                    </footer>
                    <Toaster />
                </div>
            }
        </>
    )
}
