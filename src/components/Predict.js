import React, { PureComponent } from 'react'
import Web3 from 'web3'
import { abi } from '../abis/eththou'

const contractAddress = '0x523c94a39546c35381d9d627fd8a9aa4bfa79ec4'

const donerAddress1 = '0x068b0c3B92909AEd83630Be8D5c2e41A4a09A7cE'
const donerAddress2 = '0x8a96b6223C751FBdeA0b6470349fE1e8c7C1Ef53'

export default class Predict extends PureComponent {
  componentDidMount() {
    let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
    const eventProvider = new Web3.providers.WebsocketProvider('ws://localhost:8545')
    web3.setProvider(eventProvider)

    const contract = new web3.eth.Contract(abi, contractAddress)
    this.setState({ web3, contract })
  }

  state = {
    web3: null,
    contract: null
  }

  async handleOnClick() {
    const { contract, web3 } = this.state

    await contract.methods
      ._createDonor(web3.utils.asciiToHex('dan'), false)
      .send({ from: donerAddress1, value: 100000000000000000 })
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

  async handleContract() {
    console.log(this.state.contract.methods)
  }

  render() {
    if (this.state.contract) {
      this.state.contract.events
        .allEvents({}, this.handleEvent)
        .on('data', (event) => {
          console.log('event happened====', event)
        })
        .on('changed', (event) => {
          console.log('changed', event)
        })
        .on('error', console.error)
    }

    return (
      <div>
        <h1>
Predict 1000
        </h1>
        <p>
          {' '}
Home page for Nate
        </p>
        <button value="hey" onClick={this.handleOnClick.bind(this)}>
          Click this
        </button>
        <button value="hey" onClick={this.handleContract.bind(this)}>
          Get Contract
        </button>
      </div>
    )
  }
}
