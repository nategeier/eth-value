import React from 'react'
import { Provider } from 'react-redux'
import styled from 'styled-components'
import { Route, Switch } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from './store/store'
import Home from './components/Home'
import routes from './data/routes'
import Footer from './components/Footer'
import TopNav from './components/TopNav'

import './App.css'

const Page = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

const App = () => (
  <div>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Page>
          <TopNav />
          <Switch>
            {routes.map(({ path, text, Component }) => <Route key={path} exact path={path} component={Component} />)}
            <Route component={Home} />
          </Switch>
          <Footer />
        </Page>
      </ConnectedRouter>
    </Provider>
  </div>
)

export default App
