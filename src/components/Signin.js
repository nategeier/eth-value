import React, { PureComponent } from 'react'
import styled from 'styled-components'
import * as styles from '../styles'

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
`

export default class Signin extends PureComponent {
  handleSignin = () => {
    console.log('fire====', this.props)

    const { firebase } = this.props
    var provider = new firebase.auth.FacebookAuthProvider()
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = result.credential.accessToken
        // The signed-in user info.
        const user = result.user
        console.log('signed in======', user)
        // ...
      })
      .catch(error => {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        console.log('errorMessage in======', errorMessage)
        // The email of the user's account used.
        var email = error.email
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential
        console.log('broke in======', error)
        // ...
      })
  }

  render() {
    return (
      <Button variant="contained" color="primary" onClick={this.handleSignin}>
        Create Thing
      </Button>
    )
  }
}
