import React, { PureComponent } from 'react'
import styled from 'styled-components'
import * as styles from '../styles'

const Page = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${styles.LESS_TURKISH};
  width: 100%;
`

export default class Party extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      hasTicket: false
    }
  }

  render() {
    const { hasTicket } = this.state
    return (
      <Page>
        <p>
          Party
          {hasTicket}
        </p>
      </Page>
    )
  }
}
