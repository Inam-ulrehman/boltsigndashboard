import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ChangePassword, WebsiteContent } from './components/dashboard'
import {
  ContentAboutUs,
  ContentContact,
  ContentLogo,
  ContentSectionOne,
  ContentSectionThree,
  ContentSectionTwo,
  ContentSocialLinks,
  EditSlot,
  Slots,
} from './components/dashboard/WebsiteContentComponents'
import { EditAboutUs } from './components/dashboard/WebsiteContentComponents/aboutComponent'
import ScrollToTopHook from './hooks/ScrollToTopHook'
import {
  SharedLayout,
  ErrorPage,
  ProtectedRoute,
  Register,
  Test,
} from './pages'
import {
  Appointment,
  RegisterAppointment,
  SingleAppointment,
} from './pages/appointmentPages'

import { Contact, SingleContact } from './pages/contactPages'
import {
  SharedDashboardLayout,
  Dashboard,
  DashboardHome,
} from './pages/dashboardPages'
import { Orders, SingleOrder } from './pages/orderPages'
import { Products, UploadProduct, SingleProduct } from './pages/productPages'
import { AdminRegisterUser, SingleUser, Users } from './pages/userPages'

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTopHook />
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<Register />} />
          <Route
            path='/dashboard'
            element={
              <ProtectedRoute>
                <SharedDashboardLayout />
              </ProtectedRoute>
            }
          >
            {/* ===============Dashboard inside route===============Start */}
            <Route path='/dashboard' element={<Dashboard />}>
              <Route index element={<DashboardHome />} />
              <Route path='/dashboard/contact' element={<Contact />} />
              <Route
                path='/dashboard/contact/:_id'
                element={<SingleContact />}
              />
              <Route path='/dashboard/products' element={<Products />} />
              <Route
                path='/dashboard/products/:_id'
                element={<SingleProduct />}
              />
              <Route path='/dashboard/orders' element={<Orders />} />
              <Route path='/dashboard/orders/:_id' element={<SingleOrder />} />
              <Route path='/dashboard/users' element={<Users />} />
              <Route path='/dashboard/users/:_id' element={<SingleUser />} />
              <Route
                path='/dashboard/users/register'
                element={<AdminRegisterUser />}
              />
              <Route path='/dashboard/Appointment' element={<Appointment />} />
              <Route
                path='/dashboard/Appointment/:_id'
                element={<SingleAppointment />}
              />
              <Route
                path='/dashboard/Appointment/register'
                element={<RegisterAppointment />}
              />
              <Route path='/dashboard/Test' element={<Test />} />
            </Route>
            {/* ===============Dashboard inside route===============Finish */}
            <Route path='/dashboard/upload' element={<UploadProduct />} />
            <Route
              path='/dashboard/changePassword'
              element={<ChangePassword />}
            />
            {/* ============update Content Route=======================Start */}
            <Route
              path='/dashboard/websiteContent'
              element={<WebsiteContent />}
            >
              <Route index element={<ContentLogo />} />
              <Route
                path='/dashboard/websiteContent/sectionOne'
                element={<ContentSectionOne />}
              />
              <Route
                path='/dashboard/websiteContent/sectionTwo'
                element={<ContentSectionTwo />}
              />
              <Route
                path='/dashboard/websiteContent/sectionThree'
                element={<ContentSectionThree />}
              />
              <Route
                path='/dashboard/websiteContent/aboutUs'
                element={<ContentAboutUs />}
              />
              <Route
                path='/dashboard/websiteContent/aboutUs/:_id'
                element={<EditAboutUs />}
              />
              <Route
                path='/dashboard/websiteContent/contact'
                element={<ContentContact />}
              />
              <Route
                path='/dashboard/websiteContent/SocialLinks'
                element={<ContentSocialLinks />}
              />
              <Route
                path='/dashboard/websiteContent/Slots'
                element={<Slots />}
              />
              <Route
                path='/dashboard/websiteContent/Slots/:_id'
                element={<EditSlot />}
              />
            </Route>
            {/* ============update Content Route=======================Finish */}
          </Route>

          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
