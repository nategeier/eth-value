export const TOGGLE_MOBILE_NAV = 'TOGGLE_MOBILE_NAV'

export const toggleMobileNav = () => ({
  type: TOGGLE_MOBILE_NAV
})

export default function mobile(state = { mobileNavOpen: false }, action) {
  switch (action.type) {
  case TOGGLE_MOBILE_NAV:
    return {
      mobileNavOpen: !state.mobileNavOpen
    }
  default:
    return {
      mobileNavOpen: false
    }
  }
}
