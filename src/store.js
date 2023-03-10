import { configureStore } from '@reduxjs/toolkit'
import aboutUsSlice from './features/aboutUs/aboutUsSlice'
import editAboutUsSlice from './features/aboutUs/editAboutUsSlice'
import appointmentSlice from './features/appointment/appointmentSlice'
import contactSlice from './features/contact/contactSlice'
import functionSlice from './features/functions/functionSlice'
import orderSlice from './features/order/orderSlice'
import productSlice from './features/products/productSlice'
import serviceSlice from './features/services/serviceSlice'
import userSlice from './features/user/userSlice'

const store = configureStore({
  reducer: {
    user: userSlice,
    appointment: appointmentSlice,
    product: productSlice,
    service: serviceSlice,
    function: functionSlice,
    contact: contactSlice,
    order: orderSlice,
    aboutUs: aboutUsSlice,
    editAboutUs: editAboutUsSlice,
  },
})

export default store
