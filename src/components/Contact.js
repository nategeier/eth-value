import React from 'react'
import styled from 'styled-components'
import MainImage from './MainImage'
import * as styles from '../styles'
import Single from './Single'
import { Header, Copy } from './Typography'

const Page = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`

const IntroBlock = {
  path: '/nate.jpg',
  header: 'This is Nate: Founder',
  subHeader: 'Obsessed with blockchain for a while now',
  copy: [
    {
      type: styles.CONTENT_TYPE_TEXT,
      text:
        'Nate has been traveling since February 2018, fully immersing himself in the global blockchain community through independent research. He has attended and spoke at blockchain meetups in Lisbon Portugal, Bangkok and Chiang Mai Thailand, Singapore, and the Dojo community in Bali, Indonesia.'
    },
    {
      type: styles.CONTENT_TYPE_TEXT,
      text:
        'Nate’s background in helping Nike build large applications such as NikeiD and its Claims and Returns application makes him understand the struggles large corporations have to experiment with new technologies. His previous role at a FinTech startup called Bumped is what pushed him over the edge to start focusing full time on blockchain. He worked with clearing firms specifically that managed customers stock positions, anti money laundering, and know your customer processes.'
    },
    {
      type: styles.CONTENT_TYPE_TEXT,
      text:
        'We have a team of highly trained engineers to help meet your needs. We only take on one project at a time so get on the waitlist as soon as you can.'
    },
    {
      type: styles.CONTENT_TYPE_BUTTON,
      path: 'mailto:nae@ethvalue.com',
      text: 'Email Nate'
    }
  ]
}

export default () => (
  <Page>
    <MainImage headline="Let's get to know each other" path="/coconut.jpg" />
    <Single block={IntroBlock} />
  </Page>
)
