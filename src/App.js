import React, { PureComponent } from 'react'
import { Provider } from 'react-redux'
import styled from 'styled-components'
import { Route, Switch } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import store, { history } from './store/store'
import routes from './data/routes'
import Footer from './components/Footer'
import TopNav from './components/TopNav'
import * as styles from './styles/index'

import './App.css'

var configs = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  secretKey: 'VOZ8iWvnxWTtn0dlYTRNdwyTUnhrFNuq4CBF0l2U'
}

firebase.initializeApp(configs)

const Page = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

export default class App extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { width: 0, height: 0 }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  render() {
    const { width } = this.state
    const isMobile = width <= styles.GRID_SM
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Page>
            <TopNav isMobile={isMobile} />
            <Switch>
              {routes.map(({ path, text, Component }) => (
                <Route
                  key={path}
                  exact
                  path={path}
                  render={() => <Component firebase={firebase} isMobile={isMobile} />}
                />
              ))}
            </Switch>
            <Footer isMobile={isMobile} />
          </Page>
        </ConnectedRouter>
      </Provider>
    )
  }
}
