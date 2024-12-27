import { SolanaAgentKit } from "../index";
import { PublicKey, Transaction } from "@solana/web3.js";
import { createMintToInstruction } from "@solana/spl-token";
import { sendTx } from "../utils/send_tx";

/**
 * Mint an SPL token to the specified token account
 * @param agent - SolanaAgentKit instance
 * @param token_address - SPL token mint address
 * @param token_account - Solana token account address
 * @param amount - Amount of tokens to mint
 * @param decimals - The number of decimals the token has
 * @returns Promise 
 */
export async function mint_token(
  agent: SolanaAgentKit,
  token_address: PublicKey,
  token_account: PublicKey,
  amount: number,
  decimals: number,
): Promise<string> {
  const tx = new Transaction().add(
    createMintToInstruction(
      token_address,
      token_account,
      agent.wallet_address,
      amount * Math.pow(10, decimals),
    ),
  );

  const txid = await sendTx(agent, tx, [agent.wallet]);


  
  return txid;
}
