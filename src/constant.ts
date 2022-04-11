import { Percent } from 'capricorn-swap-sdk';
import { BigNumber } from 'ethers';

export const slippageTolerance = new Percent('50', '10000');
export const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
export const MINIMUM_LIQUIDITY = BigNumber.from(10).pow(3);
