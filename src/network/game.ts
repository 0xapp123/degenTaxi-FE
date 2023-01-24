export type Game = {
  "version": "0.1.0",
  "name": "game",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "solVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "desposit",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "solVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "solAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "withdraw",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "solVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "solAmount",
          "type": "u64"
        },
        {
          "name": "vaultBump",
          "type": "u8"
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidInputAmount",
      "msg": "Invalid HTO or SOL Input Amount"
    },
    {
      "code": 6001,
      "name": "InsufficientSolBalance",
      "msg": "Insufficient Sol Balance in the Pool"
    },
    {
      "code": 6002,
      "name": "InsufficientHtoBalance",
      "msg": "Insufficient HTO Balance in the Pool"
    },
    {
      "code": 6003,
      "name": "LessMinSolAmount",
      "msg": "Sol Balance is Less Than Min Amount"
    },
    {
      "code": 6004,
      "name": "LessMinHtoAmount",
      "msg": "HTO Balance is Less Than Min Amount"
    },
    {
      "code": 6005,
      "name": "MoreMaxHtoAmount",
      "msg": "HTO Balance is More Than Max Amount"
    },
    {
      "code": 6006,
      "name": "MoreMaxSolAmount",
      "msg": "SOL Balance is More Than Max Amount"
    }
  ]
};

export const IDL: Game = {
  "version": "0.1.0",
  "name": "game",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "solVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "desposit",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "solVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "solAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "withdraw",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "solVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "solAmount",
          "type": "u64"
        },
        {
          "name": "vaultBump",
          "type": "u8"
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidInputAmount",
      "msg": "Invalid HTO or SOL Input Amount"
    },
    {
      "code": 6001,
      "name": "InsufficientSolBalance",
      "msg": "Insufficient Sol Balance in the Pool"
    },
    {
      "code": 6002,
      "name": "InsufficientHtoBalance",
      "msg": "Insufficient HTO Balance in the Pool"
    },
    {
      "code": 6003,
      "name": "LessMinSolAmount",
      "msg": "Sol Balance is Less Than Min Amount"
    },
    {
      "code": 6004,
      "name": "LessMinHtoAmount",
      "msg": "HTO Balance is Less Than Min Amount"
    },
    {
      "code": 6005,
      "name": "MoreMaxHtoAmount",
      "msg": "HTO Balance is More Than Max Amount"
    },
    {
      "code": 6006,
      "name": "MoreMaxSolAmount",
      "msg": "SOL Balance is More Than Max Amount"
    }
  ]
};
