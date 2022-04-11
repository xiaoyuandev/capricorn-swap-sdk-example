import { BigNumber, logger } from 'ethers';
import {
  swapETHForExactTokens,
  swapExactTokensForETH,
  swapExactTokensForTokens,
  swapTokensForExactETH,
  swapTokensForExactTokens,
  swapExactTokensForTokensSupportingFeeOnTransferTokens,
  swapExactETHForTokensSupportingFeeOnTransferTokens,
  swapExactTokensForETHSupportingFeeOnTransferTokens
} from './swap';
import { ETH, USDA, BTCA } from './token';
import { cusda } from './wallet';

async function tswapETHForExactTokens() {
  const amountOut = '100';
  const tx = await swapETHForExactTokens(amountOut, [ETH, USDA]);
  logger.info(`tx hash: ${tx.hash}`);
}

async function tswapExactTokensForETH() {
  const amount = '100';
  const tx = await swapExactTokensForETH(cusda, amount, [USDA, ETH]);
  logger.info(`tx hash: ${tx.hash}`);
}

async function tswapExactTokensForTokens() {
  const amount = BigNumber.from(100).mul(BigNumber.from(10).pow(18)).toString();
  const tx = await swapExactTokensForTokens(cusda, amount, [USDA, BTCA]);
  logger.info(`tx hash: ${tx.hash}`);
}

async function tswapTokensForExactETH() {
  const amount = '100';
  const tx = await swapTokensForExactETH(amount, [USDA, ETH]);
  logger.info(`tx hash: ${tx.hash}`);
}

async function tswapTokensForExactTokens() {
  const amount = BigNumber.from(1).mul(BigNumber.from(10).pow(18)).toString();
  const tx = await swapTokensForExactTokens(cusda, amount, [USDA, BTCA]);
  logger.info(`tx hash: ${tx.hash}`);
}

async function tswapExactTokensForTokensSupportingFeeOnTransferTokens() {
  const amount = BigNumber.from(1).mul(BigNumber.from(10).pow(18)).toString();
  const tx = await swapExactTokensForTokensSupportingFeeOnTransferTokens(
    cusda,
    amount,
    [USDA, BTCA]
  );
  logger.info(`tx hash: ${tx.hash}`);
}

async function tswapExactETHForTokensSupportingFeeOnTransferTokens() {
  const amount = BigNumber.from(1)
    .mul(BigNumber.from(10).pow(18))
    .div(1000)
    .toString();
  const tx = await swapExactETHForTokensSupportingFeeOnTransferTokens(amount, [
    ETH,
    USDA
  ]);
  logger.info(`tx hash: ${tx.hash}`);
}

async function tswapExactTokensForETHSupportingFeeOnTransferTokens() {
  const amount = BigNumber.from(10).mul(BigNumber.from(10).pow(18)).toString();
  const tx = await swapExactTokensForETHSupportingFeeOnTransferTokens(
    cusda,
    amount,
    [USDA, ETH]
  );
  logger.info(`tx hash: ${tx.hash}`);
}

// tswapETHForExactTokens();
// tswapExactTokensForETH();
// tswapExactTokensForTokens();
// tswapTokensForExactETH();
// tswapTokensForExactTokens();
// tswapExactTokensForTokensSupportingFeeOnTransferTokens();
// tswapExactETHForTokensSupportingFeeOnTransferTokens();
// tswapExactTokensForETHSupportingFeeOnTransferTokens();
