export interface Auth {
    _id?: string,
    username?: string,
    email?:string,
    token?:string,
    success:boolean,
    message:string,
  }
  
  export interface AuthState {
    loading: boolean
    auth: Auth
  }

  export class initialAuthData implements Auth {
    _id?: string | undefined;
    username = "";
    email = "";
    token = "";
    success= false;
    message="";
  }


  export type User = {
    email: string;
    password: string;
  };
  
  export type NewUser = User & {
    name: string;
  };


