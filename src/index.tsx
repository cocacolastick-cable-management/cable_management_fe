import React from 'react'
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'
import "./views/styles/_index.scss"
import {RootRouter} from "./routers"
import { Provider } from 'react-redux'
import RootStore from "./stores/RootStore"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <>
     <Provider store={RootStore}>
        <RootRouter/>
     </Provider>
  </>
)

reportWebVitals()
