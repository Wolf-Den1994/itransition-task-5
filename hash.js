var md5 = require('md5');

export class Hash {
  static create(password) {
    return md5(password)
  }
}