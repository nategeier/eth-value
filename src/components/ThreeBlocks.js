import React from 'react'
import styled from 'styled-components'
import * as styles from '../styles'
import { Header, Copy } from './Typography'

const FullWidthBox = styled.div`
  background-color: ${styles.LESS_TURKISH};
  width: 100%;
  display: flex;
  justify-content: center;
`

const ThreeBlocks = styled.div`
  display: flex;
  max-width: ${styles.SCREEN_XL};
  width: 100%;
  justify-content: space-between;
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
  flex-direction: column;
  width: 33%;
  @media (max-width: ${styles.SCREEN_SM}) {
    width: 95%;
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
          <Copy>
            {body}
          </Copy>
          <Copy>
            {more}
          </Copy>
        </ThreeBlock>
      ))}
    </ThreeBlocks>
  </FullWidthBox>
)
