import localFont from 'next/font/local'
import { PrismicPreview } from '@prismicio/next'
import { repositoryName } from '@/prismicio'

import './app.css'
import Header from '@/components/Header'
import ViewCanvas from '@/components/ViewCanvas'
import Footer from '@/components/Footer'
import SmoothScroll from '@/components/SmoothScroll'
import Loader from '@/components/Loader'


const alpino = localFont({
  src: '../../public/fonts/Alpino-Variable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-alpino',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={alpino.variable}>
      <body className="overflow-x-hidden bg-yellow-300">
        <Loader>

          <Header />
          <main>
            <SmoothScroll>{children}</SmoothScroll>
            <ViewCanvas />
          </main>
          <Footer />
          <PrismicPreview repositoryName={repositoryName} />
        </Loader>
      </body>
    </html>
  )
}
