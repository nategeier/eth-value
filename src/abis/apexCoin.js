export default [
  {
    constant: true,
    inputs: [],
    name: 'mintingFinished',
    outputs: [
      {
        name: '',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
    signature: '0x05d2035b'
  },
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [
      {
        name: '',
        type: 'string'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
    signature: '0x06fdde03'
  },
  {
    constant: false,
    inputs: [
      {
        name: '_spender',
        type: 'address'
      },
      {
        name: '_value',
        type: 'uint256'
      }
    ],
    name: 'approve',
    outputs: [
      {
        name: '',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0x095ea7b3'
  },
  {
    constant: true,
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
    signature: '0x18160ddd'
  },
  {
    constant: false,
    inputs: [
      {
        name: '_from',
        type: 'address'
      },
      {
        name: '_to',
        type: 'address'
      },
      {
        name: '_value',
        type: 'uint256'
      }
    ],
    name: 'transferFrom',
    outputs: [
      {
        name: '',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0x23b872dd'
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        name: '',
        type: 'uint8'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
    signature: '0x313ce567'
  },
  {
    constant: false,
    inputs: [
      {
        name: '_to',
        type: 'address'
      },
      {
        name: '_amount',
        type: 'uint256'
      }
    ],
    name: 'mint',
    outputs: [
      {
        name: '',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0x40c10f19'
  },
  {
    constant: false,
    inputs: [
      {
        name: '_value',
        type: 'uint256'
      }
    ],
    name: 'burn',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0x42966c68'
  },
  {
    constant: false,
    inputs: [
      {
        name: '_spender',
        type: 'address'
      },
      {
        name: '_subtractedValue',
        type: 'uint256'
      }
    ],
    name: 'decreaseApproval',
    outputs: [
      {
        name: '',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0x66188463'
  },
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address'
      }
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
    signature: '0x70a08231'
  },
  {
    constant: false,
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0x715018a6'
  },
  {
    constant: false,
    inputs: [],
    name: 'finishMinting',
    outputs: [
      {
        name: '',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0x7d64bcb4'
  },
  {
    constant: true,
    inputs: [],
    name: 'owner',
    outputs: [
      {
        name: '',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
    signature: '0x8da5cb5b'
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        name: '',
        type: 'string'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
    signature: '0x95d89b41'
  },
  {
    constant: false,
    inputs: [
      {
        name: '_to',
        type: 'address'
      },
      {
        name: '_value',
        type: 'uint256'
      }
    ],
    name: 'transfer',
    outputs: [
      {
        name: '',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0xa9059cbb'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'recipients',
        type: 'address[]'
      },
      {
        name: 'values',
        type: 'uint256[]'
      }
    ],
    name: 'drop',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0xc01ae5d3'
  },
  {
    constant: false,
    inputs: [
      {
        name: '_spender',
        type: 'address'
      },
      {
        name: '_addedValue',
        type: 'uint256'
      }
    ],
    name: 'increaseApproval',
    outputs: [
      {
        name: '',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0xd73dd623'
  },
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address'
      },
      {
        name: '_spender',
        type: 'address'
      }
    ],
    name: 'allowance',
    outputs: [
      {
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
    signature: '0xdd62ed3e'
  },
  {
    constant: false,
    inputs: [
      {
        name: '_newOwner',
        type: 'address'
      }
    ],
    name: 'transferOwnership',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0xf2fde38b'
  },
  {
    constant: false,
    inputs: [
      {
        name: '_from',
        type: 'address'
      },
      {
        name: '_to',
        type: 'address'
      },
      {
        name: '_value',
        type: 'uint256'
      }
    ],
    name: 'custodianTransfer',
    outputs: [
      {
        name: '',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0xf807319f'
  },
  {
    inputs: [
      {
        name: 'name',
        type: 'string'
      },
      {
        name: 'symbol',
        type: 'string'
      },
      {
        name: 'decimals',
        type: 'uint8'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor',
    signature: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'burner',
        type: 'address'
      },
      {
        indexed: false,
        name: 'value',
        type: 'uint256'
      }
    ],
    name: 'Burn',
    type: 'event',
    signature: '0xcc16f5dbb4873280815c1ee09dbd06736cffcc184412cf7a71a0fdb75d397ca5'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'to',
        type: 'address'
      },
      {
        indexed: false,
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'Mint',
    type: 'event',
    signature: '0x0f6798a560793a54c3bcfe86a93cde1e73087d944c0ea20544137d4121396885'
  },
  {
    anonymous: false,
    inputs: [],
    name: 'MintFinished',
    type: 'event',
    signature: '0xae5184fba832cb2b1f702aca6117b8d265eaf03ad33eb133f19dde0f5920fa08'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'previousOwner',
        type: 'address'
      }
    ],
    name: 'OwnershipRenounced',
    type: 'event',
    signature: '0xf8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c64820'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'previousOwner',
        type: 'address'
      },
      {
        indexed: true,
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'OwnershipTransferred',
    type: 'event',
    signature: '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'owner',
        type: 'address'
      },
      {
        indexed: true,
        name: 'spender',
        type: 'address'
      },
      {
        indexed: false,
        name: 'value',
        type: 'uint256'
      }
    ],
    name: 'Approval',
    type: 'event',
    signature: '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'from',
        type: 'address'
      },
      {
        indexed: true,
        name: 'to',
        type: 'address'
      },
      {
        indexed: false,
        name: 'value',
        type: 'uint256'
      }
    ],
    name: 'Transfer',
    type: 'event',
    signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
  }
]
