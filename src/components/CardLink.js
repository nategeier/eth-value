import React, { PureComponent } from 'react'
import PlaidLink from 'react-plaid-link'
import styled from 'styled-components'
import * as styles from '../styles'

const host = 'http://127.0.0.1:4000'

const Button = styled.button`
  align-items: center;
  margin: 0;
  text-decoration: none;
  cursor: pointer;
  margin-bottom: ${styles.PADDING_XS};
  border: none;
  padding: ${styles.PADDING_SM};
  background-color: ${styles.TURKISH};
  text-align: center;
  color: ${styles.OFF_WHITE};
  margin: 1px;
`

class CardLink extends PureComponent {
  handleOnSuccess(token, metadata) {
    // send token to client server
    console.log('token---------', token)
    console.log('token---------', metadata)
    // this.setState({
    //   spending: metadata
    // })
  }

  handleOnEvent(stuff) {
    console.log('stuff======', stuff)
  }

  handleOnLoad(load, more) {
    console.log('load======', load)
    console.log('more======', more)
  }

  handleOnExit() {
    // handle the case when your user exits Link
    // this.setState({
    //   spending: null
    // })
    console.log('fin')
  }

  async handleGetAccess() {
    const thing = {
      public_token: 'public-development-0d923247-3cda-4909-9293-b77afd4aefce'
    }
    const transactions = await fetch(`${host}/get_access_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(thing)
    })
    const access = await transactions.json()
    console.log('access===', access)
  }

  async handleGetTransactions() {
    const transactionsData = await fetch(`${host}/transactions`)
    const transactions = await transactionsData.json()
    console.log('transactions===', transactions)
  }

  render() {
    return (
      <div>
        <PlaidLink
          clientName="Your app name"
          env={process.env.REACT_APP_PLAID_ENV}
          product={['auth', 'transactions']}
          publicKey={process.env.REACT_APP_PLAID_PUBLIC_KEY}
          secretKey={process.env.REACT_APP_PLAID_SECRET}
          onExit={this.handleOnExit}
          onSuccess={this.handleOnSuccess}
          onEvent={this.handleOnEvent}
          onLoad={this.handleOnLoad}
        >
          Open Link and connect your bank!
        </PlaidLink>
        <Button onClick={this.handleGetAccess}>
Get Access
        </Button>
        <Button onClick={this.handleGetTransactions}>
Get Transactions
        </Button>
      </div>
    )
  }
}
export default CardLink
