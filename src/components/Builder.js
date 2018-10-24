/* eslint-disable prefer-reflect */
import React, { PureComponent } from 'react'
import Web3 from 'web3'
import styled from 'styled-components'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Buzz from '@web3/buzz'
// import queryString from 'query-string'
import NoConnection from './NoConnection'
import Users from '../data/users'
import * as colors from '../styles/colors'
import * as measurments from '../styles/measurments'
import * as styles from '../styles'

const host = 'http://127.0.0.1'
const thingCoinAddress = '0x598e012fbe47930f5c960a1f2e501af3443a17e0'
const thingAddress = '0x523c94a39546c35381d9d627fd8a9aa4bfa79ec4'
const custodian = '0x592A714714A54Ff9387e8D1579e4b2878E49e212'
const wellAddress = '0x068b0c3B92909AEd83630Be8D5c2e41A4a09A7cE'

const table = '/apexUsers'
const Input = styled.div`
  display: flex;
  margin-bottom: ${measurments.PADDING_MD};
`

const Page = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${styles.LESS_TURKISH};
  width: 100%;
`

const LeftSplit = styled.div`
  display: flex;
  min-width: 400px;
  flex-direction: column;
  flex-grow: 1;
`

const RightSplit = styled.div`
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
`
// const Page = styled.div`
//   display: flex;
//   padding: 2rem;
//   flex-grow: 1 0 0;
// `

const Button = styled.button`
  align-items: center;
  margin: 0;
  text-decoration: none;
  cursor: pointer;
  margin-bottom: ${measurments.PADDING_XS};
  border: none;
  padding: ${measurments.PADDING_SM};
  background-color: ${colors.TURKISH};
  text-align: center;
  color: ${colors.OFF_WHITE};
`

const Human = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${colors.OFF_WHITE};
  flex-direction: column;
  margin: 1px;
  flex: 1 0 0;
  padding: 20px;
  min-width: 250px;
`
const Form = styled(FormControl)`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`

const Block = styled.div`
  padding: ${measurments.PADDING_SM};
  display: flex;
  margin-right: ${measurments.PADDING_SM};
`
const Collectables = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const ThingContainer = styled.div`
  background-color: ${styles.OFF_WHITE}
  padding: ${styles.PADDING_MD}
  flex-direction: column;
  display: flex;
`

const ThingImg = styled.img`
  max-width: 100px;
`

const Stat = styled.div`
  display: flex;
  align-items: stretch;
  padding: ${measurments.PADDING_SM};
  background-color: ${colors.OFF_WHITE};
  margin-bottom: ${measurments.PADDING_XS};
`

const LeftStat = styled.div`
  display: flex;
  color: #898989;
`

const RightStat = styled.div`
  text-align: right;
  flex-grow: 1;
`

const End = styled.div`
  display: flex;
  margin-top: ${measurments.PADDING_MD}
  flex-grow: 1;
  flex-direction: column;
`

const getDecimalValue = num => {
  if (num % 1 === 0) {
    return (num / 100).toFixed(2)
  }
  return num
}

const createUser = key => ({
  id: `USER-10${key}`,
  name: 'Sally Rich',
  key,
  cash: 10 + key
})

export default class Apex extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      web3: null,
      contract: null,
      minted: 0,
      amountToMint: 0,
      users: [],
      wellBalance: 0,
      custodianBalance: 0,
      db: null,
      numUsers: 0,
      bzz: null,
      thingName: '',
      myThings: []
    }
  }

  async componentDidMount() {
    this.getBalanceOfOwners = this.getBalanceOfOwners.bind(this)
    this.setBalances = this.setBalances.bind(this)
    this.airDrop = this.airDrop.bind(this)
    this.createAccounts = this.createAccounts.bind(this)
    this.handleUpload = this.handleUpload.bind(this)
    const { setBalances, props } = this
    const { firebase } = props
    const db = await firebase.database()
    const web3 = new Web3(Web3.givenProvider)
    const contractData = await fetch('http://127.0.0.1:3030/abi')
    const { abi } = await contractData.json()

    const thingContractData = await fetch('http://127.0.0.1:3030/thing')
    const data = await thingContractData.json()

    const thingContract = new web3.eth.Contract(data.abi, thingAddress)
    console.log('abi====', thingContract.methods)

    const bzz = new Buzz({ provider: `${host}:8500` })

    const totalSupply = await thingContract.methods.totalSupply().call({ from: custodian })

    const numbers = []

    for (var i = 0; i < totalSupply; i++) {
      numbers.push(i)
    }

    const ids = await Promise.all(numbers.map(async number => thingContract.methods.tokenByIndex(number).call()))

    // const myThings = await Promise.all(
    //   ids.map(async id => queryString.parse(await thingContract.methods.tokenURI(id).call()))
    // )
    const myThings = []

    console.log('-----myThings=====', myThings)
    await this.setState(
      {
        web3,
        db,
        contract: new web3.eth.Contract(abi, thingCoinAddress),
        thingContract,
        bzz,
        myThings
      },
      () => setBalances()
    )
  }

  async setBalances() {
    const { web3, db, contract } = this.state

    const users = await db.ref(table).once('value')
    const userVal = await users.val()

    if (!userVal) {
      await this.createAccounts()
    }

    const usersWithBalance = await Promise.all(
      Object.entries(userVal).map(async ([key, user]) => {
        const balance = await contract.methods.balanceOf(user.address).call()
        return {
          ...user,
          balance
        }
      })
    )

    this.setState({
      web3,
      db,
      contract,
      users: await usersWithBalance
    })
    //
    this.getBalanceOfOwners()
  }

  async createThing() {
    const { thingContract, thingName } = this.state
    const id = await thingContract.methods.totalSupply().call({ from: custodian })
    console.log('total supply=====', id, custodian)
    console.log(thingContract.methods)

    const path = 'https://pinchofyum.com/wp-content/uploads/Cashew-Coffee-1-3.jpg'
    const uri = `?name=${thingName}&path=${path}`
    thingContract.methods
      .mintWithTokenURI(custodian, id + 1, uri)
      .send({ from: custodian })
      .on('transactionHash', hash => {
        console.log('hash======', hash)
      })
      .on('confirmation', (confirmationNumber, receipt) => {
        console.log('confirmation==========', confirmationNumber)
      })
      .on('receipt', receipt => {
        console.log('on receipt========', receipt)
      })
  }

  async airDrop() {
    const { contract, users } = this.state
    const { setBalances } = this

    const addresses = Object.entries(users).map(([key, user]) => user.address)
    const amounts = Object.entries(users).map(([key, user]) => user.cash * 100)
    contract.methods
      .drop(addresses, amounts)
      .send({ from: custodian })
      .on('transactionHash', hash => {
        console.log('hash======', hash)
      })
      .on('confirmation', (confirmationNumber, receipt) => {
        console.log('confirmation==========', confirmationNumber)
        setBalances()
      })
      .on('receipt', receipt => {
        console.log('on receipt========', receipt)
      })
  }

  async createAccounts() {
    const { db, web3, numUsers } = this.state

    await db.ref(table).remove()
    let users = []
    for (var i = 0; i < numUsers; i++) {
      users.push(createUser(i))
    }

    await Promise.all(
      users.map(async user => {
        const account = await web3.eth.accounts.create()
        console.log('account====', account)
        return db.ref(`${table}/${user.id}`).set({
          ...user,
          address: account.address,
          privateKey: account.privateKey
        })
      })
    )

    this.setBalances()
  }

  async journalToken(index) {
    const { contract, users } = this.state
    const { getBalanceOfOwners } = this
    const user = users[index]
    console.log(index, user)

    // contract.methods
    //   .custodianTransfer(
    //     user.address,
    //     '0xEbfe46913c4BCe7e25dc4F2ad6eEE38291539059',
    //     100.0 * 100
    //   )
    //   .send({
    //     from: custodian
    //   })
    //   .on('transactionHash', (hash) => {
    //     console.log('hash======', hash)
    //   })
    //   .on('confirmation', (confirmationNumber, receipt) => {
    //     console.log('confirmation==========', confirmationNumber)
    //     getBalanceOfOwners()
    //   })
    //   .on('receipt', (receipt) => {
    //     console.log('on receipt========', receipt)
    //   })
  }

  async getBalanceOfOwners() {
    const { contract } = this.state
    const custodianBalance = await contract.methods.balanceOf(custodian).call()
    const wellBalance = await contract.methods.balanceOf(wellAddress).call()
    const minted = await contract.methods.totalSupply().call()

    this.setState({
      custodianBalance: getDecimalValue(custodianBalance),
      wellBalance: getDecimalValue(wellBalance),
      minted: getDecimalValue(minted)
    })
  }

  async mintCoin() {
    const { contract, amountToMint } = this.state
    const { getBalanceOfOwners } = this
    contract.methods
      .mint(custodian, amountToMint * 100)
      .send({
        from: custodian
      })
      .on('transactionHash', hash => {
        console.log('hash======', hash)
      })
      .on('confirmation', (confirmationNumber, receipt) => {
        console.log('confirmation==========', confirmationNumber)
        getBalanceOfOwners()
      })
      .on('receipt', receipt => {
        console.log('on receipt========', receipt)
      })
  }

  handleChange = props => event => {
    this.setState({ [props]: event.target.value })
  }

  async handleUpload() {
    const { bzz } = this.state

    const uploadHash = await bzz.upload('http://localhost:3000/uploads/potential.jpg')

    console.log('uploadHash===', uploadHash)
  }

  async handleDownload() {
    const { bzz } = this.state
    const download = await bzz.download('df57a9a1c97aa2728eee1774193d7c0616edac278a1069de23419268d8f83004')

    console.log('downloads--=-=-----', download)
  }

  render() {
    const {
      minted,
      thingName,
      amountToMint,
      users,
      wellBalance,
      custodianBalance,
      web3,
      numUsers,
      myThings
    } = this.state

    if (!web3) {
      return <NoConnection />
    }
    return (
      <Page>
        <LeftSplit>
          <Block>
            <Form>
              <Stat>
                <LeftStat>
Minted
                </LeftStat>
                <RightStat>
                  $
                  {minted}
                  APX
                </RightStat>
              </Stat>

              <Stat>
                <LeftStat>
Well Balance
                </LeftStat>
                <RightStat>
                  $
                  {wellBalance}
                  APX
                </RightStat>
              </Stat>
              <Stat>
                <LeftStat>
Custodian Balance
                </LeftStat>
                <RightStat>
                  $
                  {custodianBalance}
                  APX
                </RightStat>
              </Stat>
              <End>
                <Input>
                  <TextField
                    label="Amount to Mint"
                    margin="dense"
                    id="content"
                    placeholder="Content"
                    value={amountToMint}
                    onChange={this.handleChange('amountToMint')}
                  />
                </Input>

                <Button variant="contained" color="primary" onClick={() => this.mintCoin()}>
                  Mint ThingCoin
                </Button>

                <Button variant="contained" color="primary" onClick={() => this.airDrop()}>
                  Air Drop
                </Button>
                <Input>
                  <TextField
                    label="Number of Wallets"
                    margin="dense"
                    id="content"
                    placeholder="Content"
                    value={numUsers}
                    onChange={this.handleChange('numUsers')}
                  />
                </Input>
                <Button variant="contained" color="primary" onClick={() => this.createAccounts()}>
                  Create Ethereum Accounts
                </Button>
                <Input>
                  <TextField
                    label="Thing Name"
                    margin="dense"
                    id="content"
                    placeholder="Thing Name"
                    value={thingName}
                    onChange={this.handleChange('thingName')}
                  />
                </Input>
                <Button variant="contained" color="primary" onClick={() => this.createThing()}>
                  Create Thing
                </Button>
                <Button variant="contained" color="primary" onClick={() => this.handleUpload()}>
                  Upload Thing
                </Button>
                <Button variant="contained" color="primary" onClick={() => this.handleDownloadph()}>
                  Download Thing
                </Button>
              </End>
            </Form>
          </Block>
          <Collectables>
            {myThings.map(({ name, path }) => (
              <ThingContainer>
                <p>
                  {name}
                </p>
                <ThingImg src={path} />
              </ThingContainer>
            ))}
          </Collectables>
        </LeftSplit>
        <RightSplit>
          {users &&
            Object.entries(users).map(([key, value]) => (
              <Human key={key}>
                <TextField id="standard-uncontrolled" label="id" margin="normal" value={value.id} />
                <TextField id="standard-uncontrolled" label="Name" margin="normal" value={value.name} />
                <TextField id="standard-uncontrolled" label="Cash" margin="normal" value={`$${value.cash}`} />
                <TextField
                  id="standard-uncontrolled"
                  label="APX"
                  margin="normal"
                  value={getDecimalValue(value.balance)}
                />
                <TextField id="standard-uncontrolled" label="Address" margin="normal" value={value.address} />
                <TextField id="standard-uncontrolled" label="Private Key" margin="normal" value={value.privateKey} />
                {/* <TextField id="standard-uncontrolled" label="Move Amount" margin="normal" value={value.moveAmount} />
                <TextField
                  id="standard-uncontrolled"
                  label="Move to Address"
                  margin="normal"
                  onChange={(text) => this.updateUserSentToAdddress(key, text)}
                  value={value.moveToAddress}
                />
                <Button variant="contained" color="primary" onClick={() => this.journalToken(key)}>
                  Move Funds
                </Button> */}
              </Human>
            ))}
        </RightSplit>
      </Page>
    )
  }
}
