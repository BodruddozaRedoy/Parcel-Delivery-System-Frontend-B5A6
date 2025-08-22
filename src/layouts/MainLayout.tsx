import Footer from '@/components/layouts/Footer/Footer'
import Navbar from '@/components/layouts/Navbar/Navbar'
import { Outlet } from 'react-router'
import { Toaster } from 'sonner'

export default function MainLayout() {
    return (
        <div className='h-screen flex flex-col'>
            <nav>
                <Navbar />
            </nav>
            <main className='flex-1'>
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
                <Toaster/>
        </div>
    )
}
