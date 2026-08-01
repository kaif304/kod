// import { Outlet } from 'react-router-dom'
// import FloatingContactBar from '../components/common/FloatingContactBar.jsx'
// import Footer from '../components/common/Footer.jsx'
// import Navbar from '../components/common/Navbar.jsx'

// function MainLayout() {
//   return (
//     <div className="soft-grid min-h-screen">
//       <Navbar />
//       <main>
//         <Outlet />
//       </main>
//       <Footer />
//       <FloatingContactBar />
//     </div>
//   )
// }

// export default MainLayout

import { Outlet } from 'react-router-dom'

import FloatingContactBar from '../components/common/FloatingContactBar.jsx'
import Footer from '../components/common/Footer.jsx'
import Navbar from '../components/common/Navbar.jsx'

function MainLayout() {
  return (
    <div className="soft-grid flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
      {/* <FloatingContactBar /> */}
    </div>
  )
}

export default MainLayout
