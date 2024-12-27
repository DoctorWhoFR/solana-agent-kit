import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { SolanaAgentKit } from "solana-agent-kit/src";

/**
 * Get the balance of an SPL token for the specified token account
 * @param agent - SolanaAgentKit instance
 * @param token_address - SPL token mint address
 * @returns Promise resolving to the balance as a number (in UI units) or null if account doesn't exist
 */
export async function get_balance_token_accounts(
  agent: SolanaAgentKit,
  token_address: PublicKey,
): Promise<number> {
  const token_account = await agent.connection.getTokenAccountBalance(token_address);

  return token_account.value.uiAmount || 0;
}
