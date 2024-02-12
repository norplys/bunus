import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ReactNode } from 'react'
export default function NavbarWrapper({ children }: { children: ReactNode }) {
  return (
    <section>
        <Navbar />
        {children}
        <Footer />
    </section>
  )
}