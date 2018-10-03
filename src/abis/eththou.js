export const abi = [
  {
    constant: true,
    inputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    name: 'donors',
    outputs: [
      {
        name: 'addr',
        type: 'address',
      },
      {
        name: 'name',
        type: 'bytes32',
      },
      {
        name: 'amount',
        type: 'uint256',
      },
      {
        name: 'isAnonymous',
        type: 'bool',
      },
      {
        name: 'numDonations',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'name',
        type: 'bytes32',
      },
      {
        indexed: false,
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'NewDonor',
    type: 'event',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_name',
        type: 'bytes32',
      },
      {
        name: '_isAnonymous',
        type: 'bool',
      },
    ],
    name: '_createDonor',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
]
