import React from 'react'
import styled, { keyframes } from 'styled-components'
import { NavLink } from 'react-router-dom'
import { fadeIn } from 'react-animations'
import * as styles from '../styles'
import routes from '../data/routes'

const fadeInAnimation = keyframes`${fadeIn}`

const Logo = styled(styles.GillWide)`
  color: ${styles.DARK_BLUE};
  font-size: 1.2rem;
  padding: ${styles.PADDING_SM};
`

const Nav = styled.div`
  display: flex;
  min-width: 400px;
`

const NavButton = styled(NavLink)`
  text-decoration: none;
  margin-left: 1px;
  flex-grow: 1;
  text-align: center;
  align-items: center;
  font-size: 0.8rem;
  color: ${styles.TURKISH};
  background-color: ${styles.LESS_TURKISH};
  animation: 0.6s ${fadeInAnimation};
  &:hover {
    background-color: ${styles.TURKISH};
    color: ${styles.OFF_WHITE};
    animation: 0.6s ${fadeInAnimation};
    cursor: pointer;
  }
`

const LogoButton = styled(NavLink)`
  text-decoration: none;
  color: ${styles.TURKISH};
`

const NavBar = styled.div`
  display: flex;
  flex-grow: 1;
  width: 100%;
  justify-content: space-between;
  max-width: ${styles.SCREEN_XL};
`

export const Header = styled(styles.Thin)`
  font-size: 2em;
  color: ${({ color }) => color || styles.LIGHT_GREY};
  margin-bottom: ${styles.PADDING_SM};
`

export default ({ isMobile }) => (
  <NavBar>
    <LogoButton to="/">
      <Logo>
ETHVALUE
      </Logo>
    </LogoButton>

    {!isMobile && (
      <Nav>
        {routes.map(({ path, text, isNav }) => {
          if (!isNav) {
            return false
          }
          return (
            <NavButton key={text} to={path}>
              <p>
                {text}
              </p>
            </NavButton>
          )
        })}
      </Nav>
    )}
  </NavBar>
)
