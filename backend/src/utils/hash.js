import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

export const hashValue = async (value) => 
  bcrypt.hash(value, SALT_ROUNDS);

export const compareValue = async (value, hashedValue) =>
  bcrypt.compare(value, hashedValue);
