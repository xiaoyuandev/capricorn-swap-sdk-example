import { BigNumber } from "ethers";
import {
  swapETHForExactTokens,
  swapExactTokensForETH,
  swapExactTokensForTokens,
  swapTokensForExactETH,
  swapTokensForExactTokens,
  swapExactTokensForTokensSupportingFeeOnTransferTokens,
  swapExactETHForTokensSupportingFeeOnTransferTokens,
  swapExactTokensForETHSupportingFeeOnTransferTokens,
} from "../src/swap";
import { ETH, USDA, BTCA } from "../src/token";
import { cusda } from "../src/wallet";

describe("test swap module", () => {
  it("swapETHForExactTokens", async () => {
    const amountOut = "100";
    const tx = await swapETHForExactTokens(amountOut, [ETH, USDA]);
    expect(typeof tx.hash === "string").toEqual(true);
  });

  it("swapExactTokensForETH", async () => {
    const amount = "100";
    const tx = await swapExactTokensForETH(cusda, amount, [USDA, ETH]);
    expect(typeof tx.hash === "string");
  });

  it("swapExactTokensForTokens", async () => {
    const amount = BigNumber.from(100)
      .mul(BigNumber.from(10).pow(18))
      .toString();
    const tx = await swapExactTokensForTokens(cusda, amount, [USDA, BTCA]);
    expect(typeof tx.hash === "string");
  });

  it("swapTokensForExactETH", async () => {
    const amount = "100";
    const tx = await swapTokensForExactETH(amount, [USDA, ETH]);
    expect(typeof tx.hash === "string");
  });

  it("swapTokensForExactTokens", async () => {
    const amount = BigNumber.from(1).mul(BigNumber.from(10).pow(18)).toString();
    const tx = await swapTokensForExactTokens(cusda, amount, [USDA, BTCA]);
    expect(typeof tx.hash === "string");
  });

  it("swapExactTokensForTokensSupportingFeeOnTransferTokens", async () => {
    const amount = BigNumber.from(1).mul(BigNumber.from(10).pow(18)).toString();
    const tx = await swapExactTokensForTokensSupportingFeeOnTransferTokens(
      cusda,
      amount,
      [USDA, BTCA]
    );
    expect(typeof tx.hash === "string");
  });

  it("swapExactETHForTokensSupportingFeeOnTransferTokens", async () => {
    const amount = BigNumber.from(1)
      .mul(BigNumber.from(10).pow(18))
      .div(1000)
      .toString();
    const tx = await swapExactETHForTokensSupportingFeeOnTransferTokens(
      amount,
      [ETH, USDA]
    );
    expect(typeof tx.hash === "string");
  });

  it("swapExactTokensForETHSupportingFeeOnTransferTokens", async () => {
    const amount = BigNumber.from(10)
      .mul(BigNumber.from(10).pow(18))
      .toString();
    const tx = await swapExactTokensForETHSupportingFeeOnTransferTokens(
      cusda,
      amount,
      [USDA, ETH]
    );
    expect(typeof tx.hash === "string");
  });
});
