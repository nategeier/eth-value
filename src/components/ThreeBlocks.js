import React from 'react'
import styled from 'styled-components'
import * as styles from '../styles'
import { Header, Copy } from './Typography'

const FullWidthBox = styled.div`
  background-color: ${styles.LESS_TURKISH};
  display: flex;
  justify-content: center;
  width: 100%;
`

const ThreeBlocks = styled.div`
  display: flex;
  width: ${styles.SCREEN_XL};
  margin-top: ${styles.PADDING_MD};
  @media (max-width: ${styles.SCREEN_SM}) {
    flex-direction: column;
  }
`

const BlockImg = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: ${styles.PADDING_SM};
`
const ThreeBlock = styled.div`
  padding: ${styles.PADDING_MD};
  display: flex;
  max-width: ${styles.SCREEN_XL};
  flex-direction: column;
  flex-grow: 1;
  @media (max-width: ${styles.SCREEN_SM}) {
    width: 90%;
  }
`

export default ({ blocks }) => (
  <FullWidthBox>
    <ThreeBlocks>
      {blocks.map(({
        path, title, body, id, more
      }) => (
        <ThreeBlock key={id}>
          <BlockImg src={path} />
          <Header>
            {title}
          </Header>
          {body.map(({ text }, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Copy key={`three${index}`}>
              {text}
            </Copy>
          ))}
        </ThreeBlock>
      ))}
    </ThreeBlocks>
  </FullWidthBox>
)
