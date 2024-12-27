import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { createAssociatedTokenAccount } from "@solana/spl-token";
import { SolanaAgentKit } from "solana-agent-kit/src";

const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');
const ASSOCIATED_TOKEN_PROGRAM_ID = new PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL');

/**
 * Create a token account for the specified mint address and wallet address
 * @param agent - SolanaAgentKit instance
 * @param token_address - SPL token mint address
 * @param wallet_address - Solana wallet address
 * @returns Promise resolving to the token account
 */
export async function create_token_account(
  agent: SolanaAgentKit,
  token_address: PublicKey,
  wallet_address?: PublicKey,
): Promise<PublicKey> {
  if (!wallet_address) {
    wallet_address = agent.wallet_address;
  }

  const address = await createAssociatedTokenAccount(agent.connection, agent.wallet, token_address, wallet_address);

  console.log('Token account created: ', address.toBase58());

  return address;
}
