import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { SolanaAgentKit } from "../index";
import {PinataSDK} from 'pinata'

/**
 * Upload a file to Pinata and return the signed URL
 * @param agent - SolanaAgentKit instance
 * @param file_content - The content of the file to upload
 * @param file_name - The name of the file to upload
 * @param file_type - The type of the file to upload
 * @returns Promise resolving to the signed URL
 */
export async function upload_file_pinata(
  agent: SolanaAgentKit,
  file_content: string,
  file_name: string,
  file_type: string,
): Promise<any> {
  if (!process.env.PINATA_API_KEY || !process.env.PINATA_GATEWAY) {
    throw new Error("PINATA_API_KEY and PINATA_GATEWAY must be set");
  }

  const pinata = new PinataSDK({
    pinataJwt: process.env.PINATA_API_KEY ,
    pinataGateway: process.env.PINATA_GATEWAY ,
  })

  const file = new File([file_content], file_name);
  const upload = await pinata.upload.file(file, {
    groupId: "019408ad-7a17-7d66-a1d7-a93180892b60",
  });
  console.log(`${process.env.PINATA_GATEWAY}/files/${upload.cid}`);

  return `${process.env.PINATA_GATEWAY}/files/${upload.cid}`;
}
