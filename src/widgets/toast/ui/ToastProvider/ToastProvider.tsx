import { Slide, ToastContainer } from 'react-toastify'

import { ToastCloseButton } from '../ToastCloseButton/ToastCloseButton'

export const ToastProvider = () => {
  return (
    <ToastContainer
      autoClose={5000}
      closeButton={<ToastCloseButton />}
      closeOnClick
      draggable={false}
      hideProgressBar
      icon={false}
      newestOnTop
      pauseOnFocusLoss={false}
      pauseOnHover
      position="bottom-left"
      rtl={false}
      theme="colored"
      transition={Slide}
    />
  )
}
