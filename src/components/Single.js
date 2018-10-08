/* eslint-disable no-alert, no-console */
import React from 'react'
import styled from 'styled-components'
import * as styles from '../styles'
import { ComboHeader, ComboSubHeader, Copy } from './Typography'

const Single = styled.div`
  display: flex;
  flex-grow: 1;
  max-width: ${styles.SCREEN_XL};
  margin-top: ${styles.PADDING_MD};
  align-items: center;
  padding: ${styles.PADDING_XL};
  @media (max-width: ${styles.SCREEN_MD_RAW}px) {
    flex-direction: column;
    padding: ${styles.PADDING_SM};
  }
`

const SingleImg = styled.img`
  width: 100%;
  max-width: 500px;
  height: auto;
`

const SingleText = styled.div`
  max-width: 550px;
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
  display: block;
  width: 250px;
  margin-top: ${styles.PADDING_SM};
`

export default ({ block }) => (
  <Single>
    <SingleImg src={block.path} />
    <SingleText>
      <ComboHeader>
        {block.header}
      </ComboHeader>
      <ComboSubHeader>
        {block.subHeader}
      </ComboSubHeader>
      {block.copy.map(({ text, type, path }, index) => {
        if (type === styles.CONTENT_TYPE_TEXT) {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <Copy key={`single${index}`}>
              {text}
            </Copy>
          )
        }
        return (
          <Button href={path}>
            {text}
          </Button>
        )
      })}
    </SingleText>
  </Single>
)
