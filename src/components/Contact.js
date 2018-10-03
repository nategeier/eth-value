import React from 'react'
import styled from 'styled-components'
import MainImage from './MainImage'
import * as styles from '../styles'
import { Header, Copy } from './Typography'

const Page = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`

const Single = styled.div`
  display: flex;
  max-width: ${styled.SCREEN_XL};
  flex-grow: 1;
  max-width: ${styles.SCREEN_XL};
  margin-top: ${styles.PADDING_MD};
  align-items: center;
  padding: ${styles.PADDING_XL};
  @media (max-width: ${styles.SCREEN_SM}) {
    flex-direction: column;
  }
`

const SingleImg = styled.img``

const SingleText = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 480px;
  padding: ${styles.PADDING_MD};
`

const Button = styled.a`
  background-color: ${styles.TURKISH};
  border: none;
  cursor: pointer;
  text-decoration: none;
  color: ${styles.OFF_WHITE};
  padding: ${styles.PADDING_SM};
  font-size: 0.8em;
  text-align: center;
`

export default () => (
  <Page>
    <MainImage headline="Let's get to know each other" path="/coconut.jpg" />
    <Single>
      <SingleImg src="/nate.jpg" />
      <SingleText>
        <Header>
Hello There
        </Header>

        <Copy>
          Nate has been traveling the last six months fully immersing himself in the global blockchain community through
          independent research. He has attended and spoke at meetups in Lisboa, Portugal, Bangkok and Chiang Mai
          Thailand, Singapore, and the Dojo community in Bali, Indonesia.
        </Copy>
        <Copy>
          Nate’s background helping Nike build large applications such as NikeiD and its Claims and Returns application
          makes him understand the struggles large corporations have to experiment with new technologies. His previous
          role at a FinTech startup called Bumped is what pushed him over the edge to start focusing full time on
          blockchain. He worked with clearing firms specifically that managed customers stock positions, AML, and KYC
          processes. The application was a platform that automatically gave users fractional shares of any publicly
          traded company as a reward from the users daily spending occurrences pulled from Plaid. Ex: Users buys a
          coffee at Starbucks, the user gets 0.0021 SBUX.
        </Copy>
        <Button href="mailto:nae@ethvalue.com">
Email Nate
        </Button>
      </SingleText>
    </Single>
  </Page>
)
