import { config } from "dotenv";
config();

import { Contract, ethers, Wallet } from "ethers";
import { arrayify } from "ethers/lib/utils";
import ROUTER_V2_ABI from "./abi/routerv2.abi.json";
import ERC20_ABI from "./abi/erc20.abi.json";
import PAIR_ABI from "./abi/pair.abi.json";

export { ERC20_ABI, PAIR_ABI };
const RPC = "https://http-testnet.hecochain.com";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
try {
  arrayify(`0x${PRIVATE_KEY.replace(/0x/, "")}`);
} catch (error) {
  throw Error("Please configure a correct private key ");
}
export const provider = new ethers.providers.JsonRpcProvider(RPC);
export const signer = new Wallet(PRIVATE_KEY, provider);

export const crouter = new Contract(
  "0x99Eb67dD84fFAa0e4F783cC34A4999a5EaB8D142",
  ROUTER_V2_ABI
).connect(signer);

export const cusdt = new Contract(
  "0x8d4e0E8d003Bf491801B0C39ABbA55bb2deb7C4C",
  ERC20_ABI
).connect(signer);

export const chbtc = new Contract(
  "0x1D8684e6CdD65383AfFd3D5CF8263fCdA5001F13",
  ERC20_ABI
).connect(signer);

export const cusda = new Contract(
  "0xebb81e49B153B993624698AdBbB3AE6B2E9FD6cf",
  ERC20_ABI
).connect(signer);
