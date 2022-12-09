import * as bcrypt from 'bcrypt';

export class HashingModel {
  saltOrRounds : number;
  constructor(saltOrRounds : number = 10) {
    this.saltOrRounds = saltOrRounds;
  }
  async hash(text : string): Promise < string > {
    return await bcrypt.hash(text, this.saltOrRounds);
  }
  getSalt(): number {
    return this.saltOrRounds;
  }
  async compare(text1 : string, text2 : string): Promise < boolean > {
    return await bcrypt.compare(text1, text2);
  }
};
