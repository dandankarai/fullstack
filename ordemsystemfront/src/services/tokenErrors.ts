export class TokenErros extends Error {
  constructor() {
    super("Error in authenticated token");
  }
}
