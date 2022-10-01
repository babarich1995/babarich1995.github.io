export class User {
    constructor(
      public username: string,
      public password: string,
      private request_token: string,
     
    ) {}
  
    get token() {
      
      return this.request_token;
    }
  }
  