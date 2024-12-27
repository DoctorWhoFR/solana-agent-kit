import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { SolanaAgentKit } from "../index";

/**
 * Get the balance of SOL for the agent's wallet or specific wallet
 * @param agent - SolanaAgentKit instance
 * @param wallet_address - Optional wallet address. If not provided, returns SOL balance for the agent's wallet
 * @returns Promise resolving to the balance as a number (in UI units) or null if account doesn't exist
 */
export async function get_balance(
  agent: SolanaAgentKit,
  wallet_address?: PublicKey,
): Promise<number> {
  if (!wallet_address) {
    return (
      (await agent.connection.getBalance(agent.wallet_address)) /
      LAMPORTS_PER_SOL
    );
  }

  const wallet_account = await agent.connection.getBalance(wallet_address);
  return wallet_account / LAMPORTS_PER_SOL || 0;
}
