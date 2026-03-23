import { HashRouter, Routes, Route } from 'react-router-dom'

import { PageTransitionProvider } from './context/PageTransitionContext'
import { Layout } from './components/Layout/Layout'
import { ScrollToTop } from './components/ScrollToTop'
import { HomePage } from './pages/HomePage/HomePage'
import { WorksPage } from './pages/WorksPage/WorksPage'
import { AboutPage } from './pages/AboutPage/AboutPage'
import { RoastPage } from './pages/CasePages/RoastPage'
import { DrCoffeePage } from './pages/CasePages/DrCoffeePage'
import { CleannerPage } from './pages/CasePages/CleannerPage'

function App() {
  return (
    <HashRouter>
      <PageTransitionProvider>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/works" element={<WorksPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/works/roast" element={<RoastPage />} />
            <Route path="/works/dr-coffee" element={<DrCoffeePage />} />
            <Route path="/works/cleanner" element={<CleannerPage />} />
          </Route>
        </Routes>
      </PageTransitionProvider>
    </HashRouter>
  )
}

export default App
