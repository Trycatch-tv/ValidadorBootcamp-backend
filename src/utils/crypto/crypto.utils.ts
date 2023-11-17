import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

export const generateHash = async (password: string): Promise<string> => {
  const hash = await bcrypt.hash(password, saltOrRounds);
  return hash;
};

export const compareHash = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  const match = await bcrypt.compare(password, hash);
  return match;
};
