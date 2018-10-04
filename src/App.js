import React, { PureComponent } from 'react'
import { Provider } from 'react-redux'
import styled from 'styled-components'
import { Route, Switch } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from './store/store'
import Home from './components/Home'
import routes from './data/routes'
import Footer from './components/Footer'
import TopNav from './components/TopNav'
import * as styles from './styles/index'

import './App.css'

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
    const isMobile = width <= styles.SCREEN_XL_RAW
    return (
      <div>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Page>
              {width >= 700 && <TopNav />}
              <Switch>
                {routes.map(({ path, text, Component }) => (
                  <Route key={path} exact path={path} render={() => <Component isMobile={isMobile} />} />
                ))}
                <Route component={Home} />
              </Switch>
              <Footer />
            </Page>
          </ConnectedRouter>
        </Provider>
      </div>
    )
  }
}
