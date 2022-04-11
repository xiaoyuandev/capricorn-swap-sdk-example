import { BigNumber, BigNumberish } from 'ethers';
import {
  keccak256,
  defaultAbiCoder,
  toUtf8Bytes,
  solidityPack
} from 'ethers/lib/utils';
import { Contract } from 'ethers';
import { crouter, signer } from './wallet';

export async function approve(
  token: Contract,
  value: string,
  owner = signer.address,
  spender = crouter.address
) {
  const allowance = await token.allowance(owner, spender);
  if (BigNumber.from(allowance).lt(BigNumber.from(value))) {
    await token.approve(spender, value);
  }
}

export function expandTo18Decimals(n: BigNumberish): string {
  return BigNumber.from(n).mul(BigNumber.from(10).pow(18)).toString();
}

export function quote(
  amountA: string,
  reserveA: string,
  reserveB: string
): string {
  return BigNumber.from(amountA).mul(reserveB).div(reserveA).toString();
}

const PERMIT_TYPEHASH = keccak256(
  toUtf8Bytes(
    'Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)'
  )
);

function getDomainSeparator(
  name: string,
  tokenAddress: string,
  chainId = 1
): string {
  return keccak256(
    defaultAbiCoder.encode(
      ['bytes32', 'bytes32', 'bytes32', 'uint256', 'address'],
      [
        keccak256(
          toUtf8Bytes(
            'EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)'
          )
        ),
        keccak256(toUtf8Bytes(name)),
        keccak256(toUtf8Bytes('1')),
        chainId,
        tokenAddress
      ]
    )
  );
}

export async function getApprovalDigest(
  token: Contract,
  approve: {
    owner: string;
    spender: string;
    value: BigNumber;
  },
  nonce: BigNumber,
  deadline: BigNumber
): Promise<string> {
  const name = await token.name();
  const chainId = await token.signer.getChainId();
  const DOMAIN_SEPARATOR = getDomainSeparator(name, token.address, chainId);
  return keccak256(
    solidityPack(
      ['bytes1', 'bytes1', 'bytes32', 'bytes32'],
      [
        '0x19',
        '0x01',
        DOMAIN_SEPARATOR,
        keccak256(
          defaultAbiCoder.encode(
            ['bytes32', 'address', 'address', 'uint256', 'uint256', 'uint256'],
            [
              PERMIT_TYPEHASH,
              approve.owner,
              approve.spender,
              approve.value,
              nonce,
              deadline
            ]
          )
        )
      ]
    )
  );
}
