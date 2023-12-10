import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

export const generateHash = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(saltOrRounds); // Generate a random salt
  const hash = await bcrypt.hash(password, salt); // Hash the password using the generated salt
  return hash;
};

export const compareHash = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, match) => {
      if (err) {
        reject(err);
      } else {
        resolve(match);
      }
    });
  });
};
