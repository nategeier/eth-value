import styled from 'styled-components'

export const CONTENT_TYPE_TEXT = 'CONTENT_TYPE_TEXT'
export const CONTENT_TYPE_IMG = 'CONTENT_TYPE_IMG'
export const CONTENT_TYPE_BUTTON = 'CONTENT_TYPE_BUTTON'

export const LOGO = 'Dagnabit'

const FONT_SARIF = 'IBM Plex Serif'

export const Thin = styled.div`
  font-family: ${FONT_SARIF}, serif;
  font-weight: 200;
`

export const Gill = styled.div`
  font-family: 'Gill Sans', 'Gill Sans MT', serif;
  font-weight: 200;
`

export const GillWide = styled.div`
  font-family: 'Gill Sans', 'Gill Sans MT', serif;
  font-weight: 200;
  letter-spacing: 3px;
`

export const Normal = styled.div`
  font-family: ${FONT_SARIF}, serif;
  font-weight: 400;
`

// font-family: 'IBM Plex Sans', sans-serif;
// font-family: 'IBM Plex Sans Condensed', sans-serif;
// font-family: 'IBM Plex Serif', serif;
// font-family: 'IBM Plex Mono', monospace;
