import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { ThemeProvider } from './context/ThemeContext'
import { PageTransitionProvider } from './context/PageTransitionContext'
import { Layout } from './components/Layout/Layout'
import { ScrollToTop } from './components/ScrollToTop'
import { HomePage } from './pages/HomePage/HomePage'
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage'

const WorksPage = lazy(() =>
  import('./pages/WorksPage/WorksPage').then((m) => ({ default: m.WorksPage })),
)
const AboutPage = lazy(() =>
  import('./pages/AboutPage/AboutPage').then((m) => ({ default: m.AboutPage })),
)
const RoastPage = lazy(() =>
  import('./pages/CasePages/Roast/Roast').then((m) => ({ default: m.RoastPage })),
)
const DrCoffeePage = lazy(() =>
  import('./pages/CasePages/DrCoffee/DrCoffee').then((m) => ({ default: m.DrCoffeePage })),
)
const CleannerPage = lazy(() =>
  import('./pages/CasePages/Cleanner/Cleanner').then((m) => ({ default: m.CleannerPage })),
)

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
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
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </Suspense>
        </PageTransitionProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
