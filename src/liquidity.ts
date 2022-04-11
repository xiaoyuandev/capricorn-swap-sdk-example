import { Transaction, Contract, BigNumber, ethers } from 'ethers';
import { ecsign } from 'ethereumjs-util';
import { Token } from 'capricorn-swap-sdk';

import { approve, getApprovalDigest } from './helper';
import { crouter, signer } from './wallet';
import { deadline, MINIMUM_LIQUIDITY } from './constant';

const { MaxUint256 } = ethers.constants;

export async function addLiquidity(
  ctokens: [Contract, Contract],
  tokens: [Token, Token],
  amounts: [string, string]
): Promise<Transaction> {
  const [ctokenA, ctokenB] = ctokens;
  const [tokenA, tokenB] = tokens;
  const [amountA, amountB] = amounts;

  //   approve
  await approve(ctokenA, MaxUint256.toString());
  await approve(ctokenB, MaxUint256.toString());

  return crouter.addLiquidity(
    tokenA.address,
    tokenB.address,
    amountA,
    amountB,
    amountA,
    amountB,
    signer.address,
    deadline
  );
}

export async function addLiquidityETH(
  ctoken: Contract,
  token: Token,
  amounts: [string, string, string]
): Promise<Transaction> {
  const [amountA, amountAMin, amountETHMin] = amounts;

  // approve
  await approve(ctoken, MaxUint256.toString());
  return crouter.addLiquidityETH(
    token.address,
    amountA,
    amountAMin,
    amountETHMin,
    signer.address,
    deadline,
    {
      value: amountETHMin
    }
  );
}

export async function removeLiquidity(
  cpair: Contract,
  liquidity: string,
  tokens: [Token, Token],
  amounts: [string, string] = ['0', '0']
): Promise<Transaction> {
  const [tokenA, tokenB] = tokens;
  const [amountAMin, amountBMin] = amounts;

  // approve
  await approve(cpair, MaxUint256.toString());
  return crouter.removeLiquidity(
    tokenA.address,
    tokenB.address,
    liquidity,
    amountAMin,
    amountBMin,
    signer.address,
    deadline
  );
}

export async function removeLiquidityETH(
  cpair: Contract,
  token: string,
  liquidity: string,
  amounts: [string, string]
): Promise<Transaction> {
  const [amountTokenMin, amountETHMin] = amounts;

  await approve(cpair, MaxUint256.toString());
  return crouter.removeLiquidityETH(
    token,
    liquidity,
    amountTokenMin,
    amountETHMin,
    signer.address,
    deadline
  );
}

export async function removeLiquidityETHSupportingFeeOnTransferTokens(
  cpair: Contract,
  token: string,
  liquidity: string,
  amounts: [string, string]
): Promise<Transaction> {
  const [amountTokenMin, amountETHMin] = amounts;

  // approve
  await approve(cpair, MaxUint256.toString());
  return crouter.removeLiquidityETHSupportingFeeOnTransferTokens(
    token,
    liquidity,
    amountTokenMin,
    amountETHMin,
    signer.address,
    deadline
  );
}

export async function removeLiquidityETHWithPermit(
  cpair: Contract,
  token: Token,
  liquidity: BigNumber,
  amounts: [string, string]
): Promise<Transaction> {
  const [amountTokenMin, amountETHMin] = amounts;
  const nonce = await cpair.nonces(signer.address);
  const digest = await getApprovalDigest(
    cpair,
    {
      owner: signer.address,
      spender: crouter.address,
      value: liquidity.sub(MINIMUM_LIQUIDITY)
    },
    nonce,
    BigNumber.from(deadline)
  );
  const { v, r, s } = ecsign(
    Buffer.from(digest.slice(2), 'hex'),
    Buffer.from(signer.privateKey.slice(2), 'hex')
  );
  return crouter.removeLiquidityETHWithPermit(
    token.address,
    liquidity.sub(MINIMUM_LIQUIDITY),
    amountTokenMin,
    amountETHMin,
    signer.address,
    deadline,
    false,
    v,
    r,
    s
  );
}

export async function removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
  cpair: Contract,
  token: Token,
  liquidity: BigNumber,
  amounts: [string, string]
): Promise<Transaction> {
  const [amountTokenMin, amountETHMin] = amounts;
  const nonce = await cpair.nonces(signer.address);
  const digest = await getApprovalDigest(
    cpair,
    {
      owner: signer.address,
      spender: crouter.address,
      value: liquidity.sub(MINIMUM_LIQUIDITY)
    },
    nonce,
    BigNumber.from(deadline)
  );
  const { v, r, s } = ecsign(
    Buffer.from(digest.slice(2), 'hex'),
    Buffer.from(signer.privateKey.slice(2), 'hex')
  );
  return crouter.removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
    token.address,
    liquidity.sub(MINIMUM_LIQUIDITY),
    amountTokenMin,
    amountETHMin,
    signer.address,
    deadline,
    false,
    v,
    r,
    s
  );
}

export async function removeLiquidityWithPermit(
  cpair: Contract,
  tokens: [Token, Token],
  liquidity: BigNumber,
  amounts: [string, string]
): Promise<Transaction> {
  const [tokenA, tokenB] = tokens;
  const [amountAMin, amountBMin] = amounts;
  const nonce = await cpair.nonces(signer.address);
  const digest = await getApprovalDigest(
    cpair,
    {
      owner: signer.address,
      spender: crouter.address,
      value: liquidity.sub(MINIMUM_LIQUIDITY)
    },
    nonce,
    BigNumber.from(deadline)
  );
  const { v, r, s } = ecsign(
    Buffer.from(digest.slice(2), 'hex'),
    Buffer.from(signer.privateKey.slice(2), 'hex')
  );
  return crouter.removeLiquidityWithPermit(
    tokenA.address,
    tokenB.address,
    liquidity.sub(MINIMUM_LIQUIDITY),
    amountAMin,
    amountBMin,
    signer.address,
    deadline,
    false,
    v,
    r,
    s
  );
}
