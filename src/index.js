import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import styled from 'styled-components'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

const Main = styled(App)``

ReactDOM.render(<Main />, document.getElementById('root'))
registerServiceWorker()
