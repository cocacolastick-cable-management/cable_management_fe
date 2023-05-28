import React from 'react'
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'
import "./views/styles/_index.scss"
import {RootRouter} from "./routers"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    <RootRouter/>
  </React.StrictMode>
)

reportWebVitals()
