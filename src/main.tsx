import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';

import App from './App.tsx'
import './globals.css'

import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/context/AuthContext";
import { QueryProvider } from "@/lib/react-query/QueryProvider";


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <AuthProvider>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <App />
          </ThemeProvider>
        </AuthProvider>
      </QueryProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
