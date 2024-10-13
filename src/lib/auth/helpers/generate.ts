import { alphabet, generateRandomString } from 'oslo/crypto'

export const generateId = (length = 10) => generateRandomString(length, alphabet('a-z', 'A-Z', '0-9'))
export const generateCode = () => generateRandomString(6, alphabet('0-9'))
