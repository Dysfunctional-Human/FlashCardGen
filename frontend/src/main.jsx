import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './Layout.jsx'
import TrialApp from './trialApp.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Login from './pages/Login.jsx'
import NotFound from './pages/NotFound.jsx'
import Layout from './Layout.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import { ThemeProvider } from './components/themeprovider.jsx'
import { AuroraBackground } from './components/ui/aurora-background'
createRoot(document.getElementById('root')).render(
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AuroraBackground>
        <Router>
          <Routes>
            <Route path='/' element={<Layout/>}>
              <Route index element={<Landing/>}/>
              <Route path='about' element={<About/>}/>
              <Route path='contact' element={<Contact/>}/>
              <Route path='Generate' element={<TrialApp/>}/>
            </Route>
            <Route path='/login' element={<Login/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
      </Router>
      </AuroraBackground>
  </ThemeProvider>,
)
