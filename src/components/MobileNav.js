import React, { PureComponent } from 'react'
import styled, { keyframes } from 'styled-components'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { fadeIn } from 'react-animations'
import { push } from 'connected-react-router'
import * as styles from '../styles'
import routes from '../data/routes'
import * as typo from './Typography'
import { toggleMobileNav } from '../reducers/mobile'

const fadeInAnimation = keyframes`${fadeIn}`

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
  animation: 0.3s ${fadeInAnimation};
  background-color: ${styles.TURKISH};
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
`

const MobileButton = styled.button`
  background-color: ${styles.LESS_TURKISH};
  display: flex;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  flex-grow: 1;
  width: 100%;
  padding: ${styles.PADDING_SM};
  padding-top: ${styles.PADDING_MD};
  color: #ffffff;
  justify-content: center;
  text-align: center;
  align-items: : center;
`

const NavText = styled(typo.SanHeader)`
  text-align: center;
`

class MobileNav extends PureComponent {
  render() {
    const { isOpen, onToggle, linkTo } = this.props
    console.log('is open=====', isOpen)
    return (
      <NavBar>
        <Button onClick={onToggle}>
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
                <MobileButton key={text} onClick={() => linkTo(path)}>
                  <NavText color={styles.OFF_WHITE}>
                    {text}
                  </NavText>
                </MobileButton>
              )
            })}
          </Container>
        )}
      </NavBar>
    )
  }
}

const mapStateToProps = ({ mobile }) => ({
  isOpen: mobile.mobileNavOpen
})

const mapDispatchToProps = dispatch => ({
  onToggle: () => {
    dispatch(toggleMobileNav())
  },
  linkTo: path => {
    dispatch(toggleMobileNav())
    dispatch(push(path))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MobileNav)
