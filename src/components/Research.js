import React from 'react'
import styled from 'styled-components'
import MainImage from './MainImage'
import * as styles from '../styles'
import { Header, Copy, SanHeader } from './Typography'

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
  max-width: 480px;
  padding: ${styles.PADDING_MD};
`

export default () => (
  <Page>
    <MainImage
      headline="Code is speech and money is speech"
      subHead="BLOCKCHAIN IS BLURRING THE LINES"
      path="/banks-large.jpg"
    />
    <Single>
      <SingleImg src="/homestead.jpg" />
      <SingleText>
        <Header>
Where do we begin?
        </Header>
        <SanHeader size="1.5em">
GOOD QUESTION
        </SanHeader>
        <Copy>
          At the end of the day, every blockchain is trying to solve three things: Speed (TPS), decentralization (The
          main benefit of blockchain), and Security. Right now you get to pick two for all of them. We look at as many
          points as we can, but what gets us most excited about a new technology is not the best technology, it’s the
          community. The Ethereum developer community is the strongest and this is what truly sets it apart with new
          implementations like Swarm, Plasma, and trusted Stable coins coming out weekly that strengthens the ecosystem.
        </Copy>
      </SingleText>
    </Single>
  </Page>
)
