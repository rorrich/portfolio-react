import { lazy, Suspense } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'

import { PageTransitionProvider } from './context/PageTransitionContext'
import { Layout } from './components/Layout/Layout'
import { ScrollToTop } from './components/ScrollToTop'
import { HomePage } from './pages/HomePage/HomePage'

const WorksPage = lazy(() =>
  import('./pages/WorksPage/WorksPage').then((m) => ({ default: m.WorksPage })),
)
const AboutPage = lazy(() =>
  import('./pages/AboutPage/AboutPage').then((m) => ({ default: m.AboutPage })),
)
const RoastPage = lazy(() =>
  import('./pages/CasePages/RoastPage').then((m) => ({ default: m.RoastPage })),
)
const DrCoffeePage = lazy(() =>
  import('./pages/CasePages/DrCoffeePage').then((m) => ({ default: m.DrCoffeePage })),
)
const CleannerPage = lazy(() =>
  import('./pages/CasePages/CleannerPage').then((m) => ({ default: m.CleannerPage })),
)

function App() {
  return (
    <HashRouter>
      <PageTransitionProvider>
        <ScrollToTop />
        <Suspense fallback={null}>
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
        </Suspense>
      </PageTransitionProvider>
    </HashRouter>
  )
}

export default App
