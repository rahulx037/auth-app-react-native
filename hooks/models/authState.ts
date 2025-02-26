export interface Auth {
    _id?: string,
    username: string,
    email:string,
    password:string
  }
  
  export interface AuthState {
    loading: boolean
    auth: Auth
  }

  export class authPayload implements Auth {
    _id?: string | undefined;
    username = "";
    email = "";
    password = "";
  }


  export type User = {
    email: string;
    password: string;
  };
  
  export type NewUser = User & {
    name: string;
  };

