import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
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
  padding-top: ${styles.PADDING_XL};
  padding-bottom: ${styles.PADDING_XL};
  max-width: ${styles.SCREEN_XL};
  flex-direction: column;
  @media (max-width: ${styles.SCREEN_SM}) {
    flex-direction: column;
  }
`
const ThreeBlock = styled.div`
  display: flex;
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
      }
    ]
  },
  {
    name: 'News',
    links: [
      {
        title: 'Reddit EthTrader',
        path: 'https://www.reddit.com/r/ethtrader/'
      },
      {
        title: 'Reddit Ethereum',
        path: 'https://www.reddit.com/r/ethereum/'
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
