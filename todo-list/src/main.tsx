import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { GlobalStyles } from './styles/GlobalStyles'

// ReactDOM apisi ile tarayıcıya render et
ReactDOM.createRoot(document.getElementById('root')!).render(
  // Geliştirme sırasında potansiyel sorunları belirlemek için 
  <React.StrictMode>
    {/* Tüm uygulamaya uygulanacak global CSS stilleri */}
    <GlobalStyles />
    
    {/* Ana uygulama bileşeni */}
    <App />
  </React.StrictMode>
)

