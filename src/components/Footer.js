import React from 'react'
import styled from 'styled-components'
import * as styles from '../styles'

const Footer = styled.div`
  background-color: ${styles.WAVE_BLUE};
  display: flex;
  flex-grow: 1;
  margin-top: ${styles.PADDING_XL};
  width: 100%;
  justify-content: center;
`
const FooterContent = styled.div`
  display: flex;
  flex-grow: 1;
  padding: ${styles.PADDING_XL};
  max-width: ${styles.SCREEN_XL};
  flex-direction: column;
  @media (max-width: ${styles.SCREEN_SM}) {
    flex-direction: column;
  }
`
const ThreeBlock = styled.div`
  display: flex;
  @media (max-width: ${styles.GRID_SM}px) {
    flex-direction: column;
    padding: ${styles.PADDING_MD};
  }
`

const Block = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

export const Header = styled(styles.Thin)`
  font-size: ${({ size }) => size || '2em'};
  color: ${({ color }) => color || styles.LIGHT_GREY};
  margin-bottom: ${styles.PADDING_SM};
`

const FooterLink = styled.a`
  font-size: ${({ size }) => size || '1em'};
  color: ${({ color }) => color || styles.LIGHT_GREY};
  margin-bottom: ${styles.PADDING_SM};
`
const items = [
  {
    name: 'Contact',
    links: [
      {
        title: 'Email',
        path: 'mailto:nate@ethvalue.com'
      },
      {
        title: 'Twitter',
        path: 'https://twitter.com/nategeier'
      },
      {
        title: 'Instagram',
        path: 'https://www.instagram.com/ethvalue/?hl=en'
      }
    ]
  },
  {
    name: 'Developer Resources',
    links: [
      {
        title: 'Ethereum',
        path: 'https://www.ethereum.org/'
      },
      {
        title: 'Truffle: Developer Ecosystem',
        path: 'https://truffleframework.com/'
      },
      {
        title: 'Reddit EthTrader',
        path: 'https://www.reddit.com/r/ethtrader/'
      },
      {
        title: 'Reddit Ethereum',
        path: 'https://www.reddit.com/r/ethereum/'
      },
      {
        title: 'Web3 Docs',
        path: 'https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html'
      },
      {
        title: 'Solidity Docs',
        path: 'https://solidity.readthedocs.io/en/v0.4.25/'
      },
      {
        title: 'Etherscan',
        path: 'https://etherscan.io/'
      }
    ]
  },
  {
    name: 'News',
    links: [
      {
        title: 'Gemini Adds GUSD stable coin',
        path: 'https://techcrunch.com/2018/09/11/the-winklevoss-stablecoin-is-one-small-step-toward-crypto-acceptance/'
      },
      {
        title: 'Michael Novogratz calls a bottom',
        path: 'https://www.cnbc.com/2018/09/13/michael-novogratz-calls-a-bottom-in-cryptocurrencies.html'
      },
      {
        title: 'Manhattan: $30M Real Estate Property Tokenized',
        path:
          'https://www.forbes.com/sites/rachelwolfson/2018/10/03/a-first-for-manhattan-30m-real-estate-property-tokenized-with-blockchain/'
      }
    ]
  }
]
export default () => (
  <Footer>
    <FooterContent>
      <ThreeBlock>
        {items.map(({ name, links }) => (
          <Block>
            <Header>
              {name}
            </Header>
            {links.map(({ title, path }) => (
              <FooterLink size="0.8em" target="_blank" href={path} color={styles.TURKISH}>
                {title}
              </FooterLink>
            ))}
          </Block>
        ))}
      </ThreeBlock>
    </FooterContent>
  </Footer>
)
