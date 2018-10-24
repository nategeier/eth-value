import React, { PureComponent } from 'react'
import styled, { keyframes } from 'styled-components'
import FormControl from '@material-ui/core/FormControl'
import { fadeIn } from 'react-animations'
import ThreeBlocks from './ThreeBlocks'
import Single from './Single'
import * as styles from '../styles'
import { Copy, Headline } from './Typography'

const fadeInAnimation = keyframes`${fadeIn}`

const Form = styled(FormControl)`
  display: flex;
  width: 100%;
`

const FormItems = styled.div`
  margin-top: 30px;
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  @media (max-width: ${styles.GRID_SM}px) {
    flex-direction: column;
    align-items: center;
  }
`

const Button = styled.button`
  background-color: ${styles.ACCENT};
  border: none;
  width: 100px;
  cursor: pointer;
  color: ${styles.OFF_WHITE};
  @media (max-width: ${styles.GRID_SM}px) {
    margin-top: ${styles.PADDING_SM};
    padding: ${styles.PADDING_SM};
  }
`
const InputField = styled.input.attrs({
  type: 'email',
  margin: ({ size }) => size || '1em',
  padding: ({ size }) => size || '1em'
})`
  background: rgba(255, 255, 255, 0.3);
  border-radius: 0;
  width: 250px;
  color: #ffffff;
  border: none;
  font-size: 1em;
  padding: ${styles.PADDING_SM};

  &::-webkit-input-placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  &:focus {
    border: 1px solid #eee;
    outline-width: 0;
  }
`

const Page = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  align-items: center;
`

const Main = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  align-items: center;
  flex-direction: column;
  background-size: contain;
  background-color: ${styles.WAVE_BLUE};
`

const ImageContainer = styled.div`
  max-width: ${styles.SCREEN_XL};
  width: 100%;
  height: auto;
`

const MainImg = styled.div`
  background-image: url('/big-wave-2.jpg');
  width: 100%;
  height: 573px;
  animation: 2s ${fadeInAnimation};
  display: flex;
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

const IntroBlock = {
  path: '/sing.png',
  header: 'Your team is busy, but so is the world',
  subHeader: 'Our job is to get you up to speed',
  copy: [
    {
      type: styles.CONTENT_TYPE_TEXT,
      text:
        'Understanding decentralized computing doesn\'t happen overnight, and in most situations, blockchains as they stands today are probably not the right path. However, the world is becoming increasingly connected and our current financial system will not keep up. It’s now time to dip yourself and your teams foot in the blockchain waters and we want to help you get started.'
    }
  ]
}

const offers = [
  {
    id: 'block1',
    path: '/research.jpg',
    title: 'Research',
    body: [
      {
        type: styles.CONTENT_TYPE_TEXT,
        text:
          'Blockchain is a new technology and we don’t know everything. The space is constantly evolving. Everyday a new developer tool or institutional adoption opens the doors to new possibilities. This reality comes with several traps and the sheer newness of the technology leaves a lot to explore. Some things to keep in mind are the landmines of bugs, immutability issues with not being able to update code, scalability network clogs, fees, slow transactions per second, regulations, and user adoption. Lean on our experience to look into your companies friction points and we’ll go from there.'
      }
    ]
  },
  {
    id: 'block2',
    path: '/prototype.jpg',
    title: 'Prototype',
    body: [
      {
        type: styles.CONTENT_TYPE_TEXT,
        text:
          'Once the research is completed, we’ll give you our opinion on whether or not we should move on to the prototyping phase. The interface or code in this phase will not win any awards, but the real star of the show will be measurements, and speed of creation. We can both build to move along with existing services to see if we can truly help increase speed of transactions, reduce internal and external developer friction, and reduce cost or build new endpoints not possible with the current infrastructure.'
      }
    ]
  },
  {
    id: 'block3',
    path: '/production.jpg',
    title: 'Production',
    body: [
      {
        type: styles.CONTENT_TYPE_TEXT,
        text:
          'Once deemed a win in the prototyping phase, we’ll build you an intuitive, well designed, interface for everyone involved from stake holders, to internal and external developers, and customers. If you have an internal development team, we’ll work the best we can to bring them into this build process to eventually take over, or create a proper licensing contract.'
      }
    ]
  }
]

const EthereumBlock = {
  path: '/homestead.jpg',
  header: 'Ethereum is king (for now)',
  subHeader: 'But we\'ll always use the best tool for the job',
  copy: [
    {
      type: styles.CONTENT_TYPE_TEXT,
      text:
        'There are many blockchains in use or are currently being built toughing they are the Ethereum killer. The Ethereum blockchain is dominating the space if you you look at developer and institutional adoption. This isn’t to say something better will not come along and we are constantly playing with new tools in the space so we can choose the best solution for your project.'
    }
  ]
}

export default class Home extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      db: null,
      email: '',
      sentEmail: false
    }
  }

  async componentDidMount() {
    const { firebase } = this.props
    const db = await firebase.database()
    this.setState({
      db
    })
  }

  async createUser() {
    const { db, email } = this.state
    const userKey = await db
      .ref()
      .child('users')
      .push().key
    await db.ref(`users/${userKey}`).set({
      email
    })
    this.setState({ sentEmail: true })
  }

  handleChange = props => event => {
    this.setState({ [props]: event.target.value })
  }

  render() {
    const { email, sentEmail } = this.state
    return (
      <Page>
        <Main>
          <ImageContainer>
            <MainImg>
              <VirCenter>
                <Headline>
Exploring the Power of Blockchain
                </Headline>
                {!sentEmail && (
                  <Form>
                    <FormItems>
                      <InputField
                        label="Amount to Mint"
                        margin="dense"
                        id="content"
                        placeholder="Email"
                        value={email}
                        onChange={this.handleChange('email')}
                      />
                      <Button variant="contained" color="primary" onClick={() => this.createUser()}>
                        BEGIN
                      </Button>
                    </FormItems>
                  </Form>
                )}
                {sentEmail && (
                  <Copy color={styles.OFF_WHITE}>
Thanks! We'll get back to you as soon as we can.
                  </Copy>
                )}
              </VirCenter>
            </MainImg>
          </ImageContainer>
        </Main>
        <Single block={IntroBlock} />
        <ThreeBlocks blocks={offers} />
        <Single block={EthereumBlock} />
      </Page>
    )
  }
}
