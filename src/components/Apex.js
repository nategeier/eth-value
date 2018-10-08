/* eslint-disable prefer-reflect */
import React, { PureComponent } from 'react'
import Web3 from 'web3'
import styled from 'styled-components'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import abi from '../abis/apexCoin'
import NoConnection from './NoConnection'
import Users from '../data/users'
import * as colors from '../styles/colors'
import * as measurments from '../styles/measurments'
import * as styles from '../styles'

const apexCoinAddress = '0x523c94a39546c35381d9d627fd8a9aa4bfa79ec4'
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
  justify-content: center;
  display: flex;
  min-width: 400px;
`

const RightSplit = styled.div`
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
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
  flex: 1;
  margin-right: ${measurments.PADDING_SM};
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
      numUsers: 3
    }
  }

  async componentDidMount() {
    this.getBalanceOfOwners = this.getBalanceOfOwners.bind(this)
    this.setBalances = this.setBalances.bind(this)
    this.airDrop = this.airDrop.bind(this)
    this.createAccounts = this.createAccounts.bind(this)
    const { setBalances, props } = this
    const { firebase } = props
    const db = await firebase.database()
    const web3 = new Web3(Web3.givenProvider)
    await this.setState(
      {
        web3,
        db,
        contract: new web3.eth.Contract(abi, apexCoinAddress)
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

  render() {
    const {
      minted, amountToMint, users, wellBalance, custodianBalance, web3, numUsers
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
                  Mint
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
              </End>
            </Form>
          </Block>
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
