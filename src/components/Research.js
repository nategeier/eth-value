import React from 'react'
import styled from 'styled-components'
import MainImage from './MainImage'
import * as styles from '../styles'
import Single from './Single'
import ThreeBlocks from './ThreeBlocks'

const Page = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`

const IntroBlock = {
  path: '/moto.jpg',
  header: 'Where do we begin?',
  subHeader: 'Let\'s look at the good, the bad, and the potential',
  copy: [
    {
      type: styles.CONTENT_TYPE_TEXT,
      text:
        'Blockchain is a new technology and we don’t know everything. The space is constantly evolving. Every day a new developer tool or institutional adoption opens the doors to new possibilities. This reality comes with several traps and the sheer newness lays loads of landmines including: Contract bugs that can/has drained millions of funds, immutability and the inability to update code, scalability, regulations, and user adoption. Lean on our experience to look into your companies friction points and we’ll go from there.'
    }
  ]
}

const offers = [
  {
    id: 'block1',
    path: '/good.jpg',
    title: 'The Good',
    body: [
      {
        type: styles.CONTENT_TYPE_TEXT,
        text:
          'Having worked with previous clearing firms that allocate fractional shares of publicly traded stock to users, and worked with systems that integrate with banks on card purchases, we know how messy the current financial system is. Doing a simple task requires integrating with several companies all trying to make sense of legacy code built in the nineties. Now, entrepreneurs and developers have the ability to transfer high value assets directly with the main line.'
      },
      {
        type: styles.CONTENT_TYPE_TEXT,
        text:
          'Blockchain is slow and expensive compared to internet, but in financial terms is 10x faster and 10x cheaper as far as actual transfer of value. Yes Visa does about 1,700 transactions per second (TPS) and Ethereum currently sits around 12 TPS, Bitcoin around 6 TPS, but you’ll notice those Visa transactions in your bank account as pending. It take days to actually move the funds, as they are nearly checking if you have the sufficient amount of funds before approving. Add international borders, and you will be looking at a stack of fees.'
      }
    ]
  },
  {
    id: 'block2',
    path: '/bad.jpg',
    title: 'The Bad',
    body: [
      {
        type: styles.CONTENT_TYPE_TEXT,
        text:
          'There is the chicken before the egg problem. In order to interact with the blockchain, most situations today require a person to have a native coin like Ether to get started. Converting fiat to a crypto currency  can take weeks through exchanged because there are various anti money laundering and know your customer verification checks that can take weeks to happen. The learning curve is steep, and when it comes to a persons money they are much more cautious.'
      }
    ]
  },
  {
    id: 'block3',
    path: '/potential.jpg',
    title: 'The Potential',
    body: [
      {
        type: styles.CONTENT_TYPE_TEXT,
        text:
          'Everything is fair game for overhaul using blockchain. The escrow industry could be overwritten with 200 lines of code. Banks store your value, and provide loans, and charge billions in fees, loans simply being an algorithm could be provided by anyone. The list is massive, and all we have to do is start informing ourselves to take part in this global revolution. '
      }
    ]
  }
]

export default () => (
  <Page>
    <MainImage
      headline="Money is speech, code is speech "
      subHead="And Money is becoming code"
      path="/banks-large.jpg"
    />
    <Single block={IntroBlock} />
    <ThreeBlocks blocks={offers} overview="The Good" />
  </Page>
)
