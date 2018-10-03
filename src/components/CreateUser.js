import React, { PureComponent } from 'react'
import Web3 from 'web3'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import styled from 'styled-components'
import FormControl from '@material-ui/core/FormControl'
import Icon from '@material-ui/core/Icon'
import Buzz from '@web3/buzz'
import * as colors from '../styles/colors'
import * as measurments from '../styles/measurments'
import { abi, implAbi } from '../abis/escrow'

const host = 'http://127.0.0.1'
const redix = 10
const implContractAddress = '0x21fdbd52f9dfdc0fb71edd4fb2d6712c35250d33'
const contractAddress = '0xc42d2a3fbc91170e35a5c70dc217a212d8b13c07'
const escrowAccount = '0x44331D8f8Da887bd61782d16AB78338F0B7Aa393'
const buyerAccount = '0xdf274f66d7abd64e1c27983d21ad3e137a1a7a88'
const sellerAccount = '0x8a96b6223C751FBdeA0b6470349fE1e8c7C1Ef53'
const witnessAccount = '0x12CB50781E4f601dc2D027400eeB78a8d22d9A02'
const escrowIndex = 4

const Page = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
  flex-direction: column;
`

const Main = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.LIGHTER_GREY};
  padding: 2rem;
  flex-grow: 1;
  justify-content: space-around;
  margin: ${measurments.PADDING_SM};
`
const Actions = styled.div`
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
`
const getStatus = (isCheck) => {
  if (isCheck) {
    return (
      <Icon>
check
      </Icon>
    )
  }

  return (
    <Icon>
close
    </Icon>
  )
}

const Input = styled(TextField)``

export default class Escrow extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      amount: 0,
      balance: 0,
      amountToSend: 1000000000000000000,
      contract: '',
      implContract: '',
      web3: 'undefined',
      name: 3,
      content: 'CFE',
      buyer: buyerAccount,
      seller: sellerAccount,
      witness: witnessAccount,
      bzz: null,
      funded: true,
      status: 'blank'
    }
    this.getBalance = this.getBalance.bind(this)
    this.agree = this.agree.bind(this)
    this.getAmount = this.getAmount.bind(this)
    this.returnFunds = this.returnFunds.bind(this)
    this.userInfo = this.userInfo.bind(this)
    this.createAccount = this.createAccount.bind(this)
  }

  componentDidMount() {
    const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8545'))
    // const web3 = new Web3(Web3.givenProvider)
    const contract = new web3.eth.Contract(abi, contractAddress)
    const bzz = new Buzz({ provider: `${host}:8500` })

    const implContract = new web3.eth.Contract(implAbi, implContractAddress)

    // web3.setProvider(new Web3.providers.WebsocketProvider('ws://localhost:8545'))

    this.setState({
      contract,
      implContract,
      web3,
      bzz
    })
  }

  handleChange = (props) => (event) => {
    this.setState({ [props]: event.target.value })
  }

  async getStatus() {
    const { web3, bzz } = this.state
    console.log('======', bzz)
    const hash = 'df74bb49221b0bcdd17ef4fed90393c24a6b65d8bb0c8185828f398c7530c875'
    const thing = await bzz.download(hash)
    console.log('we-------', thing)
  }

  async handleOnCreateContract() {
    const {
      contract, name, content, buyer
    } = this.state
    console.log('create!', contract.methods)
    try {
      await contract.methods
        .mintUniqueTokenTo(buyer, name, content)
        .send({
          from: buyer
        })
        .on('transactionHash', (hash) => {
          console.log('hash======', hash)
        })
        .on('confirmation', (confirmationNumber, receipt) => {
          console.log('confirmation==========', confirmationNumber)
          console.log('receipt==========', receipt)
        })
        .on('receipt', (receipt) => {
          console.log('on receipt========', receipt)
        })
    } catch (e) {
      console.log('brk======', e)
    } finally {
    }
  }

  async checkIfFunded() {
    console.log('checkIfFunded')
    const { contract, buyer } = this.state
    console.log(contract.methods)
    const assets = await contract.methods.totalSupply().call({ from: buyerAccount })
    console.log('owner of======', assets)
    this.setState({ funded: true })
  }

  async returnFunds() {
    const { contract, buyer } = this.state

    await contract.methods
      .paybackBuyer(escrowIndex)
      .send({
        from: buyer
      })
      .on('transactionHash', (hash) => {
        console.log('hash======', hash)
      })
      .on('confirmation', (confirmationNumber, receipt) => {
        console.log('confirmation==========', confirmationNumber)
        console.log('receipt==========', receipt)
      })
      .on('receipt', (receipt) => {
        console.log('on receipt========', receipt)
      })
  }

  async agree(from: seller) {
    const { contract, amountToSend, buyer } = this.state
    const value = parseInt(amountToSend, redix)

    contract.methods
      .changeEscrowState(escrowIndex)
      .send({
        value,
        from
      })
      .on('transactionHash', (hash) => {
        console.log('hash======', hash)
      })
      .on('confirmation', (confirmationNumber, receipt) => {
        console.log('confirmation==========', confirmationNumber)
        console.log('receipt==========', receipt)
      })
      .on('receipt', (receipt) => {
        console.log('on receipt========', receipt)
      })
  }

  async getAmount() {
    const { contract, web3 } = this.state
    const amount = await contract.methods.getEscrowValue(escrowIndex).call({ from: buyerAccount })
    this.setState({ amount: web3.utils.fromWei(amount) })
  }

  async userInfo() {
    const { contract, web3 } = this.state
    const user = await contract.methods.userInfo().call({ from: buyerAccount })
    console.log('=======user', user)
  }

  async createAccount() {
    const { web3 } = this.state
    console.log('ruyn')
    const account = await web3.eth.accounts.create()
    console.log('account=======', account)
  }
  // async getBalance() {
  //   const { contract, web3 } = this.state
  //   console.log('contract.methods.', contract.methods)
  //   console.log('info====', await contract.methods.info(escrowIndex).call({ from: buyerAccount }))
  //   console.log('ok')
  //   const balance = await contract.methods.checkBalance().call({ from: buyerAccount })
  //   console.log('balance=======', balance)
  //   this.setState({ balance: web3.utils.fromWei(balance) })
  // }

  async getBalance() {
    const {
      contract, web3, buyer, seller, implContract
    } = this.state

    console.log('contract.methods.', contract.methods)
    //0x0762018fb322a6aa27c0a52e730ea2535e0337db6860d124ef7de4ba8232ce15
    // console.log('info====', await contract.methods.info(escrowIndex).call({ from: buyerAccount }))
    console.log('ok')
    const print = await implContract.methods.requestPrint(seller, 25).call({ from: buyer })
    console.log('print=======', print)
    const myBytes = await web3.utils.asciiToHex(print)
    console.log('myBytes========', myBytes)
    const thing = web3.utils.hexToBytes(myBytes)
    console.log('thing===hexToBytes', thing)
    // const confirm = await implContract.methods
    //   .confirmPrint(print)
    //   .send({
    //     from: buyer,
    //     gas: 1500000,
    //     gasPrice: '20000000000'
    //   })
    //   .on('transactionHash', (hash) => {
    //     console.log('hash======', hash)
    //   })
    //   .on('confirmation', (confirmationNumber, receipt) => {
    //     console.log('confirmation==========', confirmationNumber)
    //     console.log('receipt==========', receipt)
    //   })
    //   .on('receipt', (receipt) => {
    //     console.log('on receipt========', receipt)
    //   })
    //
    // const balance = await contract.methods.totalSupply().call()
    // console.log('balance=======', balance)
    //
    // this.setState({ balance: web3.utils.fromWei(balance) })
  }

  render() {
    const {
      implContract,
      amount,
      balance,
      amountToSend,
      name,
      content,
      buyer,
      seller,
      witness,
      funded,
      status,
      web3
    } = this.state
    if (!implContract) {
      return null
    }
    console.log('wtf')
    // implContract.events
    //   .Error(
    //     {
    //       filter: { myIndexedParam: [20, 23], myOtherIndexedParam: '0x123456789...' }, // Using an array means OR: e.g. 20 or 23
    //       fromBlock: 0
    //     },
    //     (error, event) => {
    //       console.log(event)
    //     }
    //   )
    //   .on('data', (event) => {
    //     console.log('GOT DATA!!!')
    //     console.log('EVENT===========', event) // same results as the optional callback above
    //   })
    //   .on('changed', (event) => {
    //     console.log('changed======', event)
    //     // remove event from local database
    //   })
    //   .on('error', console.error)

    implContract.events.allEvents(
      {
        fromBlock: 0
      },
      (error, event) => {
        console.log('anythign!!!')
        if (error) console.log(error)
        console.log('anythiung======', event)
      }
    )
    const buttons = [
      {
        action: this.getAmount,
        title: `Amount ${amount}`,
        buttonText: 'Amount'
      },
      {
        action: this.getBalance,
        title: `Contract Balance ${balance}`,
        buttonText: 'balance'
      },

      {
        action: this.userInfo,
        title: 'User Info',
        buttonText: 'User Info'
      },

      {
        action: this.agree,
        title: 'Agree from Buyer',
        buttonText: 'agree',
        param: buyerAccount
      },
      {
        action: this.agree,
        title: 'Agree from Seller',
        buttonText: 'agree',
        param: sellerAccount
      },
      {
        action: this.agree,
        title: 'Agree from Witness',
        buttonText: 'agree',
        param: witnessAccount
      },
      {
        action: this.returnFunds,
        title: 'Return funds',
        buttonText: 'return'
      },
      {
        action: this.createAccount,
        title: 'Create Account',
        buttonText: 'Create Account'
      }
    ]
    const accounts = web3.eth.accounts.wallet
    console.log('accounts=====', accounts)
    return (
      <Page>
        <Main>
          <h1>
Escrow amount
          </h1>
          <FormControl>
            <Input margin="dense" id="name" placeholder="Name" value={name} onChange={this.handleChange('name')} />
            <Input
              margin="dense"
              id="content"
              placeholder="Content"
              value={content}
              onChange={this.handleChange('content')}
            />
            <Input
              margin="dense"
              id="amount"
              placeholder="Amount"
              value={amountToSend}
              onChange={this.handleChange('amountToSend')}
            />
            <Input margin="dense" id="buyer" placeholder="Buyer" value={buyer} onChange={this.handleChange('buyer')} />
            <Input
              margin="dense"
              id="seller"
              placeholder="Seller"
              value={seller}
              onChange={this.handleChange('seller')}
            />
            <Input
              margin="dense"
              id="witness"
              placeholder="Witness"
              value={witness}
              onChange={this.handleChange('witness')}
            />
          </FormControl>
          <Button variant="contained" color="primary" onClick={() => this.handleOnCreateContract()}>
            Mint Item
          </Button>
        </Main>
        <Actions>
          <Main>
            <p>
Is funded
            </p>
            {getStatus(funded)}
            <Button variant="contained" color="secondary" onClick={() => this.checkIfFunded()}>
              Check funded
            </Button>
          </Main>
          <Main>
            <p>
              Status:
              {status}
            </p>
            <Button variant="contained" color="secondary" onClick={() => this.getStatus()}>
              get status
            </Button>
          </Main>

          {buttons.map((button, index) => (
            <Main key={index}>
              <p>
                {button.title}
              </p>
              <Button variant="contained" color="secondary" onClick={() => button.action(button.param)}>
                {button.buttonText}
              </Button>
            </Main>
          ))}
        </Actions>
        {}
      </Page>
    )
  }
}
