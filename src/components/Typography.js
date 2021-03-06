import styled from 'styled-components'
import * as styles from '../styles'

export const Header = styled(styles.Thin)`
  font-size: ${({ size }) => size || '2em'};
  color: ${({ color }) => color || styles.BLACK};
  margin-bottom: ${styles.PADDING_SM};
`

export const Copy = styled(styles.Gill)`
  font-size: ${({ size }) => size || '1.2em'};
  color: ${({ color }) => color || styles.BLACK};
  margin-bottom: ${styles.PADDING_SM};
  line-height: 1.3;
`

export const SanHeader = styled(styles.GillWide)`
  font-size: ${({ size }) => size || '2em'};
  color: ${({ color }) => color || styles.LIGHT_GREY};
  margin-bottom: ${styles.PADDING_SM};
  text-transform: uppercase;
`
export const Headline = styled(styles.Thin)`
  width: 100%;
  color: ${styles.OFF_WHITE};
  font-size: 2rem;
  letter-spacing: 3px;
  margin-bottom: ${styles.PADDING_SM};
`

export const ComboHeader = styled(styles.Thin)`
  font-size: ${({ size }) => size || '1.5rem'};
  color: ${({ color }) => color || styles.ACCENT};
`

export const ComboSubHeader = styled(styles.Gill)`
  font-size: ${({ size }) => size || '1.3rem'};
  color: ${({ color }) => color || styles.LIGHT_GREY};
  margin-bottom: ${styles.PADDING_SM};
`

export const SubHeader = styled(styles.Gill)`
  font-size: ${({ size }) => size || '1.3rem'};
  color: ${({ color }) => color || styles.LIGHT_GREY};
  text-transform: uppercase;
`
