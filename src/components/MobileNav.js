import React, { PureComponent } from 'react'
import styled, { keyframes } from 'styled-components'
import { NavLink } from 'react-router-dom'
import { fadeIn } from 'react-animations'
import * as styles from '../styles'
import routes from '../data/routes'
import * as typo from './Typography'

const fadeInAnimation = keyframes`${fadeIn}`

const NavButton = styled(NavLink)`
  text-decoration: none;
  margin-left: 1px;
  flex-grow: 1;
  align-items: center;
  background-color: ${styles.LESS_TURKISH};
  font-size: 0.8rem;
  color: ${styles.OFF_WHITE};
  &:hover {
    background-color: ${styles.LESS_TURKISH};
    animation: 0.6s ${fadeInAnimation};
    cursor: pointer;
  }
`

const MenuText = styled(typo.SanHeader)`
  text-align: right;
  font-size: 1em;
`

const Button = styled.div`
  background-color: ${styles.LESS_TURKISH};
  display: flex;
  padding-bottom: ${styles.PADDING_XS};
  padding-right: ${styles.PADDING_SM};
  padding-left: ${styles.PADDING_SM};
  padding-top: ${styles.PADDING_SM};
`

const NavBar = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
  max-width: ${styles.SCREEN_XL};
`

export const Header = styled(styles.Thin)`
  font-size: 2em;
  color: ${({ color }) => color || styles.LIGHT_GREY};
  margin-bottom: ${styles.PADDING_SM};
`

const Container = styled.div`
  animation: 0.6s ${fadeInAnimation};
  background-color: ${styles.TURKISH};
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
`

const MobileButton = styled.div`
  background-color: ${styles.LESS_TURKISH};
  display: flex;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  flex-grow: 1;
  width: 100%;
  padding: ${styles.PADDING_SM};
  color: #ffffff;
  justify-content: center;
  text-align: center;
  align-items: : center;
`

const NavText = styled(typo.SanHeader)`
  text-align: center;
`
export default class MobileNav extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false
    }
  }

  handleOnClick = () => {
    console.log('=======', this.state)
    const { isOpen } = this.state
    this.setState({
      isOpen: !isOpen
    })
  }

  render() {
    const { isOpen } = this.state
    return (
      <NavBar>
        <Button onClick={this.handleOnClick}>
          <MenuText>
Menu
          </MenuText>
        </Button>
        {isOpen && (
          <Container>
            {routes.map(({ path, text, isNav }) => {
              if (process.env.NODE_ENV === 'production' && !isNav) {
                return false
              }
              return (
                <NavButton key={text} to={path}>
                  <MobileButton>
                    <NavText color={styles.OFF_WHITE}>
                      {text}
                    </NavText>
                  </MobileButton>
                </NavButton>
              )
            })}
          </Container>
        )}
      </NavBar>
    )
  }
}
