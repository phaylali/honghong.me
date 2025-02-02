import Footer from '../Footer'
import Navbar from '../Navbar'
import { useEffect, ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'
interface Props {
  children: ReactNode
}

const LayoutWrapper = ({ children }: Props) => {
  useEffect(() => {
    console.log(
      '%c小康 Blog',
      'color:white;background-color:#f90606;padding:16px 52px;border-radius:12px;font-size: 36px;font-weight: bold;'
    )
    console.log(
      '%cWebsite',
      'color:white;background-color:#f90606;padding:4px 8px;border-radius:12px;',
      'https://honghong.me'
    )
    console.log(
      '%cGithub',
      'color:#161b22;background-color:white;padding:4px 8px;border-radius:12px;',
      'https://github.com/tszhong0411'
    )
    console.log(
      '%cInstagram',
      'color:white;background-color:#d12e90;padding:4px 8px;border-radius:12px;',
      'https://instagram.com/tszhong0411/'
    )
    console.log(
      '%cFacebook',
      'color:white;background-color:#1299f6;padding:4px 8px;border-radius:12px;',
      'https://www.facebook.com/tszhonglai.0411/'
    )
  }, [])

  return (
    <>
      <div className="flex flex-col justify-between">
        <Navbar />
        <main className="mx-auto w-full max-w-3xl px-8 py-12 sm:px-6 xl:px-0">{children}</main>
        <Footer />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="dark"
        />
      </div>
    </>
  )
}

export default LayoutWrapper
