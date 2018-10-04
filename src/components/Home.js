import React, { PureComponent } from 'react'
import styled, { keyframes } from 'styled-components'
import firebase from 'firebase'
import FormControl from '@material-ui/core/FormControl'
import { fadeIn } from 'react-animations'
import ThreeBlocks from './ThreeBlocks'
import * as styles from '../styles'
import { Header, Copy, Headline } from './Typography'

var config = {
  apiKey: 'AIzaSyBCkQDSd9dsT9MvQLzjuDvAR8jAefzXZKI',
  authDomain: 'eth-value.firebaseapp.com',
  databaseURL: 'https://eth-value.firebaseio.com/'
}

firebase.initializeApp(config)

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
  @media (max-width: ${styles.SCREEN_SM}) {
    flex-direction: column;
  }
`

const Button = styled.button`
  background-color: ${styles.TURKISH};
  border: none;
  width: 100px;
  cursor: pointer;
`
const InputField = styled.input.attrs({
  type: 'email',
  margin: ({ size }) => size || '1em',
  padding: ({ size }) => size || '1em'
})`
  background: rgba(255, 255, 255, 0.3);
  padding: ${styles.PADDING_SM};
  width: 250px;
  color: #ffffff;
  border: none;
  font-size: 1em;
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

const ImageContainer = styled.div`
  max-width: ${styles.SCREEN_XL};
  height: 573px;
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
  background-image: url('/big-wave-2.jpg');
  width: 100%;
  animation: 2s ${fadeInAnimation};
  display: flex;
  height: 573px;
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

const Single = styled.div`
  display: flex;
  max-width: ${styled.SCREEN_XL};
  flex-grow: 1;
  max-width: ${styles.SCREEN_XL};
  margin-top: ${styles.PADDING_MD};
  align-items: center;
  padding: ${styles.PADDING_XL};
  @media (max-width: ${styles.SCREEN_SM}) {
    flex-direction: column;
  }
`

const SingleImg = styled.img`
  width: 100%;
  height: auto;
`

const SingleText = styled.div`
  max-width: 550px;
  padding: ${styles.PADDING_MD};
`

const offers = [
  {
    id: 'block1',
    path: '/research.jpg',
    title: 'Research',
    body:
      'Blockchain is a new technology and we don’t know everything. The space is constantly evolving. Every day a new developer tool or institutional adoption opens the doors to new possibilities. This reality comes with several traps and the sheer newness of the technology leaves a lot to explore keeping in mind the landmines of bugs, immutability, scalability, regulations, and user adoption. Lean on our experience to look into your companies friction points and we’ll go from there.'
  },
  {
    id: 'block2',
    path: '/prototype.jpg',
    title: 'Prototype',
    body:
      'Once the research is completed, we’ll give you our expert opinion on whether or not we should move on to prototyping. The interface or code in this phase will not win any awards, but the real star of the show will be measurements and speed of the build. The goal would be to build to move along with existing services to see if we can truly help increase speed of transactions, reduce internal and external developer friction, and reduce cost.'
  },
  {
    id: 'block3',
    path: '/production.jpg',
    title: 'Production',
    body:
      'Once deemed a win, we’ll build you the most intuitive, beautifully designed interface for everyone involved from stake holders to internal and external developers, and customers. If you have an internal developer team, we’ll work the best we can to bring them into this build process to eventually take over or create a proper licensing contract.'
  }
]
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
Exploring the power of blockchain for you
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
                        Set up call
                      </Button>
                    </FormItems>
                  </Form>
                )}
                {sentEmail && (
                  <Copy>
Thanks! We'll get back to as soon as we can
                  </Copy>
                )}
              </VirCenter>
            </MainImg>
          </ImageContainer>
        </Main>

        <Single>
          <SingleImg src="/singapore-small.jpg" />
          <SingleText>
            <Header size="1.7em">
Your team is busy, but so is the world
            </Header>
            <Copy size="1.3em">
Our job is to get you up to speed
            </Copy>
            <Copy>
              Understanding decentralized computing doesn't happen overnight and in most situations, blockchain is not
              the right solution. However, the world is becoming increasingly connected and our current financial system
              will not keep up. It’s time now to dip you and your teams foot in the blockchain waters and we want to
              help you get started.
            </Copy>
          </SingleText>
        </Single>

        <ThreeBlocks blocks={offers} />

        <Single>
          <SingleImg src="/homestead.jpg" />
          <SingleText>
            <Header>
Ethereum is King for now
            </Header>

            <Copy>
              There are many blockchains out there and all claim to be the best, for some some they are the best at its
              niche, for example Z-Cash is better than Ethereum at Privacy, and EOS is better than Ethereum at speed
              (transactions per second) and Bitcoin is better than Ethereum as far as markets cap and brand awareness,
              and most others are just outright scams like Bitconnect. Figuring out what’s best for your company is hard
              and anytime you take on a new technology there is extreme risk.
            </Copy>
          </SingleText>
        </Single>
      </Page>
    )
  }
}
