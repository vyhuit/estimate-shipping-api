import {
  Cipher,
  createCipheriv,
  createDecipheriv,
  Decipher,
  randomBytes,
  scrypt
} from "crypto";
import {promisify} from "util";

class EncryptionModel {
  iv : Buffer;
  cipher : Cipher;
  decipher : Decipher;
  key : Buffer;
  password : string;
  constructor(password : any) {
    this.password = password;
    this.iv = randomBytes(16);
  }
  async activateEncryptKey() {
    this.key = (await promisify(scrypt)(this.password, 'salt', 32))as Buffer;
    this.cipher = createCipheriv('aes-256-ctr', this.key, this.iv);
    this.decipher = createDecipheriv('aes-256-ctr', this.key, this.iv);
  };
  encryptText(text : string) {
    return Buffer.concat([this.cipher.update(text), this.cipher.final()])
  };
  decryptText(data : {
    text: Buffer,
    password: string
  }) {
    if (this.password === data.password) {
      const decryptedText = Buffer.concat([
        this.decipher.update(data.text),
        this.decipher.final()
      ]).toString();
      return decryptedText;
    } else {
      throw "Wrong password";
    }
  }
};

export {
  EncryptionModel
};