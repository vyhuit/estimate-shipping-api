import {createCipheriv, createDecipheriv, randomBytes, scrypt} from "crypto";
  import {promisify} from "util";

  export const encryptText = async (encryptPassword : string, textToEncrypt : string) => {
    const iv = randomBytes(16);

    const key = (await promisify(scrypt)(encryptPassword, 'salt', 32))as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, iv);
    const encryptedText = Buffer.concat([cipher.update(textToEncrypt), cipher.final()]);


    const decipher = createDecipheriv('aes-256-ctr', key, randomBytes(16));
    const decryptedText = Buffer.concat([decipher.update(encryptedText), decipher.final()]).toString();
    return {encryptedText, decryptedText};
  }; 