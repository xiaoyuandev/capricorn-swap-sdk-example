import { Token, ChainId, WETH } from 'capricorn-swap-sdk';

export const ETH = WETH[ChainId.HECO_TESTNET];

export const USDT = new Token(
  ChainId.HECO_TESTNET,
  '0x8d4e0E8d003Bf491801B0C39ABbA55bb2deb7C4C',
  18,
  'USDT',
  'USDT Token'
);
export const HBTC = new Token(
  ChainId.HECO_TESTNET,
  '0x1D8684e6CdD65383AfFd3D5CF8263fCdA5001F13',
  18,
  'HBTC',
  'HBTC Token'
);
export const USDA = new Token(
  ChainId.HECO_TESTNET,
  '0xebb81e49B153B993624698AdBbB3AE6B2E9FD6cf',
  18,
  'USDA',
  'USDA Token'
);

export const BTCA = new Token(
  ChainId.HECO_TESTNET,
  '0x6Be5D364316438e4b5a59bc02d4819647131b74d',
  18,
  'BTCA',
  'BTCA Token'
);
