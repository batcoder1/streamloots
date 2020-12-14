import config from 'config';
import crypto from 'crypto';

const encryptText = (text: string) => {
  // Create Cipher using the algorithm & salt password
  const cipher = crypto.createCipheriv(
    config.get('crypro.algorithm'),
    config.get('crypto.password'),
    'initiator',
  );

  // Update the cypher using as input encoding UTF-8 & hexadecimal
  // as output encoding and return the encrypted text
  return cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
};
/**
 * Decrypt text using the algorithm & salt password configured
 * @param  {string} text Password to decrypt
 * @return {string} Raw password
 */
const decryptText = (text: string) => {
  // Create Cipher using the algorithm & salt password
  const decipher = crypto.createDecipheriv(
    config.get('crypro.algorithm'),
    config.get('crypto.password'),
    'initiator',
  );

  // Update the cypher using as input encoding hexadecimal & UTF-8
  // as output encoding and return the decrypted text
  return decipher.update(text, 'hex', 'utf8') + decipher.final('utf8');
};

module.exports = {
  encryptText,
  decryptText,
};
