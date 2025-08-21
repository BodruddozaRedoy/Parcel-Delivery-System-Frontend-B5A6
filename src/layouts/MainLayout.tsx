import Footer from '@/components/layouts/Footer/Footer'
import Navbar from '@/components/layouts/Navbar/Navbar'
import { Outlet } from 'react-router'

export default function MainLayout() {
    return (
        <div>
            <nav>
                <Navbar />
            </nav>
            <main>
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}
