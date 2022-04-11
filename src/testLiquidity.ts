import { BigNumber, Contract, logger } from 'ethers';
import {
  Fetcher,
  Route,
  Token,
  TokenAmount,
  Trade,
  TradeType
} from 'capricorn-swap-sdk';

import { cusda, cusdt } from './wallet/index';
import { ETH, USDA, USDT } from './token';
import { expandTo18Decimals, quote } from './helper';
import { slippageTolerance, MINIMUM_LIQUIDITY } from './constant';
import { signer, PAIR_ABI } from './wallet';
import {
  addLiquidity,
  addLiquidityETH,
  removeLiquidity,
  removeLiquidityETH,
  removeLiquidityETHSupportingFeeOnTransferTokens,
  removeLiquidityETHWithPermit,
  removeLiquidityETHWithPermitSupportingFeeOnTransferTokens,
  removeLiquidityWithPermit
} from './liquidity';

export async function taddLiquidity() {
  const ctokenA = cusda;
  const ctokenB = cusdt;
  const tokenA = USDA;
  const tokenB = USDT;
  const ctokens: [Contract, Contract] = [ctokenA, ctokenB];
  const tokens: [Token, Token] = [tokenA, tokenB];
  const amountA = expandTo18Decimals(10);
  let amountB = expandTo18Decimals(20);
  try {
    const pair = await Fetcher.fetchPairData(tokenA, tokenB);
    if (pair) {
      const route = new Route([pair], tokenA, tokenB);
      const amountIn = new TokenAmount(tokenA, amountA);
      const trade = new Trade(route, amountIn, TradeType.EXACT_INPUT);
      const amountOutMin = trade.minimumAmountOut(slippageTolerance);
      amountB = amountOutMin.raw.toString();
    }
  } catch (error) {
    logger.info(`[${tokenA.symbol},${tokenB.symbol}] pair is not exist`);
  }
  const amounts: [string, string] = [amountA, amountB];
  const tx = await addLiquidity(ctokens, tokens, amounts);
  logger.info(`tx hash: ${tx.hash}`);
}

export async function taddLiquidityETH() {
  const ctokenA = cusda;
  const tokenA = USDA;
  const amountA = expandTo18Decimals('1');
  let amountAMin = amountA;
  let amountB = BigNumber.from(expandTo18Decimals('1')).div(1000).toString();
  try {
    const pair = await Fetcher.fetchPairData(tokenA, ETH);
    if (pair) {
      const route = new Route([pair], tokenA, ETH);
      const amountIn = new TokenAmount(tokenA, amountA);
      const trade = new Trade(route, amountIn, TradeType.EXACT_INPUT);
      const amountOutMin = trade.minimumAmountOut(slippageTolerance);
      amountB = amountOutMin.raw.toString();

      // amountAMin
      const reserveA = pair.reserve0;
      const reserveB = pair.reserve1;
      const amountAOptimal = quote(
        amountOutMin.raw.toString(),
        reserveB.raw.toString(),
        reserveA.raw.toString()
      );
      amountAMin = BigNumber.from(amountAOptimal).sub(10).toString();
    }
  } catch (error) {
    logger.info(`[${tokenA.symbol},ETH] pair is not exist`);
  }
  const amounts: [string, string, string] = [amountA, amountAMin, amountB];
  const tx = await addLiquidityETH(ctokenA, USDA, amounts);
  logger.info(`tx hash: ${tx.hash}`);
}

export async function tremoveLiquidity(): Promise<void> {
  const tokenA = USDA;
  const tokenB = USDT;

  const pair = await Fetcher.fetchPairData(tokenA, tokenB);
  if (!pair) {
    throw Error(
      `[${tokenA.symbol},${tokenB.symbol}] has not created a trading pair`
    );
  }
  const cpair = new Contract(pair.liquidityToken.address, PAIR_ABI).connect(
    signer
  );
  const lpBalance = await cpair.balanceOf(signer.address);
  if (!BigNumber.from(lpBalance).gt(0)) {
    throw Error("You're not adding liquidity");
  }
  // Remove 50% liquidity
  const expectedLiquidity = lpBalance.div(2).sub(MINIMUM_LIQUIDITY).toString();
  const tx = await removeLiquidity(cpair, expectedLiquidity, [tokenA, tokenB]);
  console.log(`tx hash: ${tx.hash}`);
}

export async function tremoveLiquidityETH() {
  const tokenA = USDA;
  const tokenB = ETH;
  const pair = await Fetcher.fetchPairData(tokenA, tokenB);
  const cpair = new Contract(pair.liquidityToken.address, PAIR_ABI).connect(
    signer
  );
  const lpBalance = await cpair.balanceOf(signer.address);
  // Remove 50% liquidity
  const expectedLiquidity = lpBalance.div(2).sub(MINIMUM_LIQUIDITY).toString();
  const tx = await removeLiquidityETH(
    cpair,
    tokenA.address,
    expectedLiquidity,
    ['0', '0']
  );

  logger.info(`tx hash: ${tx.hash}`);
}

export async function tremoveLiquidityETHSupportingFeeOnTransferTokens() {
  const tokenA = USDA;
  const tokenB = ETH;
  const pair = await Fetcher.fetchPairData(tokenA, tokenB);
  const cpair = new Contract(pair.liquidityToken.address, PAIR_ABI).connect(
    signer
  );
  const lpBalance = await cpair.balanceOf(signer.address);
  const expectedLiquidity = lpBalance.div(2).sub(MINIMUM_LIQUIDITY).toString();
  const tx = await removeLiquidityETHSupportingFeeOnTransferTokens(
    cpair,
    tokenA.address,
    expectedLiquidity,
    ['0', '0']
  );
  logger.info(`tx hash: ${tx.hash}`);
}

export async function tremoveLiquidityETHWithPermit() {
  const tokenA = USDA;
  const tokenB = ETH;
  const pair = await Fetcher.fetchPairData(tokenA, tokenB);
  const cpair = new Contract(pair.liquidityToken.address, PAIR_ABI).connect(
    signer
  );

  const lpBalance = await cpair.balanceOf(signer.address);
  const expectedLiquidity = lpBalance.div(2);
  const tx = await removeLiquidityETHWithPermit(
    cpair,
    tokenA,
    expectedLiquidity,
    ['0', '0']
  );
  logger.info(`tx hash: ${tx.hash}`);
}

export async function tremoveLiquidityETHWithPermitSupportingFeeOnTransferTokens() {
  const tokenA = USDA;
  const tokenB = ETH;
  const pair = await Fetcher.fetchPairData(tokenA, tokenB);
  const cpair = new Contract(pair.liquidityToken.address, PAIR_ABI).connect(
    signer
  );
  const lpBalance = await cpair.balanceOf(signer.address);
  const expectedLiquidity = lpBalance.div(2);
  const tx = await removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
    cpair,
    tokenA,
    expectedLiquidity,
    ['0', '0']
  );
  logger.info(`tx hash: ${tx.hash}`);
}

export async function tremoveLiquidityWithPermit(): Promise<void> {
  const tokenA = USDA;
  const tokenB = USDT;
  const pair = await Fetcher.fetchPairData(tokenA, tokenB);
  if (!pair) {
    `[${tokenA.symbol},${tokenB.symbol}] has not created a trading pair`;
  }
  const cpair = new Contract(pair.liquidityToken.address, PAIR_ABI).connect(
    signer
  );
  const lpBalance = await cpair.balanceOf(signer.address);
  if (lpBalance.eq(0)) {
    throw Error("You're not adding liquidity");
  }
  const expectedLiquidity = lpBalance.div(2);
  const tx = await removeLiquidityWithPermit(
    cpair,
    [tokenA, tokenB],
    expectedLiquidity,
    ['0', '0']
  );
  logger.info(`tx hash: ${tx.hash}`);
}

// taddLiquidity();
// taddLiquidityETH();
// tremoveLiquidity();
// tremoveLiquidityETH();
// tremoveLiquidityETHSupportingFeeOnTransferTokens();
// tremoveLiquidityETHWithPermit();
// tremoveLiquidityETHWithPermitSupportingFeeOnTransferTokens();
// tremoveLiquidityWithPermit();
