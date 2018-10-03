import React from 'react'
import styled, { keyframes } from 'styled-components'
import { fadeIn } from 'react-animations'
import * as styles from '../styles'
import { Headline, SanHeader } from './Typography'

const fadeInAnimation = keyframes`${fadeIn}`

const ImageContainer = styled.div`
  max-width: ${styles.SCREEN_XL};
  width: 100%;
`

const Main = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  align-items: center;
  flex-direction: column;
  background-color: ${styles.WAVE_BLUE};
  @media (max-width: ${styles.SCREEN_SM}) {
    padding: 2rem;
  }
`

const MainImg = styled.div`
  background-image: url(${({ path }) => path || '/big-wave-2.jpg'});
  width: ${styles.SCREEN_XL};
  animation: 2s ${fadeInAnimation};
  display: flex;
  height: ${({ height }) => height || '573px'};
  align-items: center;
  text-align: center;
  background-repeat: no-repeat;
  justify-content: center;
`

const VirCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Page = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  align-items: center;
  background-color: yellow;
`

export default ({
  headline, path, height, subHead
}) => (
  <Page>
    <Main>
      <ImageContainer>
        <MainImg path={path} height={height}>
          <VirCenter>
            <Headline>
              {headline}
            </Headline>
            {subHead && (
              <SanHeader size="1.2em" color={styles.OFF_WHITE}>
                {subHead}
              </SanHeader>
            )}
          </VirCenter>
        </MainImg>
      </ImageContainer>
    </Main>
  </Page>
)
