import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AuthContent from '@/components/AuthContent'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ToDoZen',
  description: 'A Notes Making App',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className='max-w-5xl mx-auto bg-white shadow-lg'>
          <AuthContent>
            <Header />
            {children}
            <Footer />
          </AuthContent>
        </main>
      </body>
    </html>
  )
}
