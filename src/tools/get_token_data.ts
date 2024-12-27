import { PublicKey } from "@solana/web3.js";
import { JupiterTokenData } from "../types";

export async function getTokenDataByAddress(
  mint: PublicKey,
  ShowVolume: boolean = false,
  ShowPriceChange: boolean = false,
): Promise<any> {
  try {
    console.log("tetst");
    
    if (!mint) {
      throw new Error("Mint address is required");
    }

    const response = await fetch("https://api.dexscreener.com/latest/dex/tokens/" + mint.toBase58(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = (await response.json());

    const pairOne = data.pairs[0];
    let token = {
      url: pairOne.url,
      name: pairOne.baseToken.name,
      symbol: pairOne.baseToken.symbol,
      priceUsd: pairOne.priceUsd,
      priceNative: pairOne.priceNative,
      volume: null,
      priceChange: null,
    }


    if (ShowVolume) {
      token.volume = pairOne.volume;
    }

    if (ShowPriceChange) {
      token.priceChange = pairOne.priceChange;
    }

    return token;
  } catch (error: any) {
    console.log(error);

    throw new Error(`Error fetching token data: ${error.message}`);
  }
}

export async function getTokenAddressFromTicker(
  ticker: string,
): Promise<string | null> {
  try {
    const response = await fetch(
      `https://api.dexscreener.com/latest/dex/search?q=${ticker}`,
    );
    const data = await response.json();

    if (!data.pairs || data.pairs.length === 0) {
      return null;
    }

    // Filter for Solana pairs only and sort by FDV
    let solanaPairs = data.pairs
      .filter((pair: any) => pair.chainId === "solana")
      .sort((a: any, b: any) => (b.fdv || 0) - (a.fdv || 0));

    solanaPairs = solanaPairs.filter(
      (pair: any) =>
        pair.baseToken.symbol.toLowerCase() === ticker.toLowerCase(),
    );

    // Return the address of the highest FDV Solana pair
    return solanaPairs[0].baseToken.address;
  } catch (error) {
    console.error("Error fetching token address from DexScreener:", error);
    return null;
  }
}

export async function getTokenDataByTicker(
  ticker: string,
): Promise<JupiterTokenData | undefined> {
  const address = await getTokenAddressFromTicker(ticker);
  if (!address) {
    throw new Error(`Token address not found for ticker: ${ticker}`);
  }
  return getTokenDataByAddress(new PublicKey(address));
}
