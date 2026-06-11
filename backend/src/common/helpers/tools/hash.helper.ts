import * as bcrypt from 'bcrypt';
export class HashHelper {
  saltOrRounds = 10;
  async hash(clearInput: string): Promise<string> {
    return await bcrypt.hash(clearInput, this.saltOrRounds);
  }

  async compare(clearInput: string, hash: string): Promise<boolean> {
    const result = await bcrypt.compare(clearInput, hash);
    return result;
  }
}
