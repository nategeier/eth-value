import React, { PureComponent } from 'react'

import PlaidLink from 'react-plaid-link'

class CardLink extends PureComponent {
  handleOnSuccess(token, metadata) {
    // send token to client server
    console.log('token---------', metadata)
    // this.setState({
    //   spending: metadata
    // })
  }

  handleOnExit() {
    // handle the case when your user exits Link
    // this.setState({
    //   spending: null
    // })
    console.log('fin')
  }

  render() {
    return (
      <PlaidLink
        clientName="Your app name"
        env="sandbox"
        product={['auth', 'transactions']}
        publicKey="c2b6c69805dbd9341aa003bba8bc9e"
        onExit={this.handleOnExit}
        onSuccess={this.handleOnSuccess}
      >
        Open Link and connect your bank!
      </PlaidLink>
    )
  }
}
export default CardLink
