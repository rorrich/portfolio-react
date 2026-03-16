import { HashRouter, Routes, Route } from 'react-router-dom'

import { Layout } from './components/Layout/Layout'
import { ScrollToTop } from './components/ScrollToTop'
import { HomePage } from './pages/HomePage'
import { WorksPage } from './pages/WorksPage'
import { AboutPage } from './pages/AboutPage'
import { RoastPage } from './pages/RoastPage'
import { DrCoffeePage } from './pages/DrCoffeePage'
import { CleannerPage } from './pages/CleannerPage'

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/works" element={<WorksPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/roast" element={<RoastPage />} />
          <Route path="/dr-coffee" element={<DrCoffeePage />} />
          <Route path="/cleanner" element={<CleannerPage />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
