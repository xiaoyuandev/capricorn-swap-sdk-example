import { Contract, Transaction } from 'ethers';
import {
  Route,
  Fetcher,
  Trade,
  TokenAmount,
  TradeType,
  Token
} from 'capricorn-swap-sdk';

import { slippageTolerance, deadline } from './constant';
import { crouter, signer } from './wallet';
import { approve } from './helper';

export async function swapETHForExactTokens(
  amount: string,
  amountInAmountOut: [Token, Token]
): Promise<Transaction> {
  const [token0, token1] = amountInAmountOut;
  const pair = await Fetcher.fetchPairData(token0, token1);
  const route = new Route([pair], token0, token1);
  const amountOut = new TokenAmount(token1, amount);
  const trade = new Trade(route, amountOut, TradeType.EXACT_OUTPUT);
  const amountIn = trade.maximumAmountIn(slippageTolerance);
  const path = [token0.address, token1.address];
  return crouter.swapETHForExactTokens(amount, path, signer.address, deadline, {
    value: amountIn.raw.toString()
  });
}

export async function swapExactETHForTokensSupportingFeeOnTransferTokens(
  amount: string,
  amountInAmountOut: [Token, Token]
): Promise<Transaction> {
  const [token0, token1] = amountInAmountOut;
  const pair = await Fetcher.fetchPairData(token0, token1);
  const route = new Route([pair], token0, token1);
  const amountIn = new TokenAmount(token0, amount);
  const trade = new Trade(route, amountIn, TradeType.EXACT_INPUT);
  const amountOutMin = trade.minimumAmountOut(slippageTolerance);
  const path = [token0.address, token1.address];
  return crouter.swapExactETHForTokensSupportingFeeOnTransferTokens(
    amountOutMin.raw.toString(),
    path,
    signer.address,
    deadline,
    {
      value: amount
    }
  );
}

export async function swapExactTokensForETH(
  erc20: Contract,
  amount: string,
  amountInAmountOut: [Token, Token]
): Promise<Transaction> {
  const [token0, token1] = amountInAmountOut;
  const pair = await Fetcher.fetchPairData(token0, token1);
  const route = new Route([pair], token0, token1);
  const amountIn = new TokenAmount(token0, amount);
  const trade = new Trade(route, amountIn, TradeType.EXACT_INPUT);
  const amountOutMin = trade.minimumAmountOut(slippageTolerance);
  const path = [token0.address, token1.address];
  await approve(erc20, amountIn.raw.toString());
  return crouter.swapExactTokensForETH(
    amountIn.raw.toString(),
    amountOutMin.raw.toString(),
    path,
    signer.address,
    deadline
  );
}

export async function swapExactTokensForETHSupportingFeeOnTransferTokens(
  erc20: Contract,
  amount: string,
  amountInAmountOut: [Token, Token]
): Promise<Transaction> {
  const [token0, token1] = amountInAmountOut;
  const pair = await Fetcher.fetchPairData(token0, token1);
  const route = new Route([pair], token0, token1);
  const amountIn = new TokenAmount(token0, amount);
  const trade = new Trade(route, amountIn, TradeType.EXACT_INPUT);
  const amountOutMin = trade.minimumAmountOut(slippageTolerance);
  const path = [token0.address, token1.address];

  // approve
  await approve(erc20, amountIn.raw.toString());
  return crouter.swapExactTokensForETHSupportingFeeOnTransferTokens(
    amountIn.raw.toString(),
    amountOutMin.raw.toString(),
    path,
    signer.address,
    deadline
  );
}

export async function swapExactTokensForTokens(
  erc20: Contract,
  amount: string,
  amountInAmountOut: [Token, Token]
): Promise<Transaction> {
  const [token0, token1] = amountInAmountOut;
  const pair = await Fetcher.fetchPairData(token0, token1);
  const route = new Route([pair], token0, token1);
  const amountIn = new TokenAmount(token0, amount);
  const trade = new Trade(route, amountIn, TradeType.EXACT_INPUT);
  const amountOutMin = trade.minimumAmountOut(slippageTolerance);
  const path = [token0.address, token1.address];
  // approve
  await approve(erc20, amountIn.raw.toString());
  return crouter.swapExactTokensForTokens(
    amountIn.raw.toString(),
    amountOutMin.raw.toString(),
    path,
    signer.address,
    deadline
  );
}

export async function swapExactTokensForTokensSupportingFeeOnTransferTokens(
  erc20: Contract,
  amount: string,
  amountInAmountOut: [Token, Token]
): Promise<Transaction> {
  const [token0, token1] = amountInAmountOut;
  const pair = await Fetcher.fetchPairData(token0, token1);
  const route = new Route([pair], token0, token1);
  const amountIn = new TokenAmount(token0, amount);
  const trade = new Trade(route, amountIn, TradeType.EXACT_INPUT);
  const amountOutMin = trade.minimumAmountOut(slippageTolerance);
  const path = [token0.address, token1.address];

  // approve
  await approve(erc20, amountIn.raw.toString());
  return crouter.swapExactTokensForTokensSupportingFeeOnTransferTokens(
    amountIn.raw.toString(),
    amountOutMin.raw.toString(),
    path,
    signer.address,
    deadline
  );
}

export async function swapTokensForExactETH(
  amount: string,
  amountInAmountOut: [Token, Token]
): Promise<Transaction> {
  const [token0, token1] = amountInAmountOut;
  const pair = await Fetcher.fetchPairData(token0, token1);
  const route = new Route([pair], token0, token1);
  const amountOut = new TokenAmount(token1, amount);
  const trade = new Trade(route, amountOut, TradeType.EXACT_OUTPUT);
  const amountInMax = trade.maximumAmountIn(slippageTolerance);
  const path = [token0.address, token1.address];
  return crouter.swapTokensForExactETH(
    amountOut.raw.toString(),
    amountInMax.raw.toString(),
    path,
    signer.address,
    deadline
  );
}

export async function swapTokensForExactTokens(
  erc20: Contract,
  amount: string,
  amountInAmountOut: [Token, Token]
): Promise<Transaction> {
  const [token0, token1] = amountInAmountOut;
  const pair = await Fetcher.fetchPairData(token0, token1);
  const route = new Route([pair], token0, token1);
  const amountOut = new TokenAmount(token1, amount);
  const trade = new Trade(route, amountOut, TradeType.EXACT_OUTPUT);
  const amountInMax = trade.maximumAmountIn(slippageTolerance);
  const path = [token0.address, token1.address];

  // approve
  await approve(erc20, amountInMax.raw.toString());
  return crouter.swapTokensForExactTokens(
    amountOut.raw.toString(),
    amountInMax.raw.toString(),
    path,
    signer.address,
    deadline
  );
}
