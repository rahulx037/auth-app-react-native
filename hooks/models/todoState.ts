
export interface Data{
    _id?: string
    title: string
    description: string
    userId?: UserId
    createdAt?: string
    updatedAt?: string
    __v?: number
}

export interface Todo {
    success:boolean,
    message:string,
    data: Data [] | Data
  }
  
export interface TodoState {
    loading: boolean
    todos: Data []
  }

export class initialTodoData implements Todo {
     data= [];
     success=false;
     message="";
  }
  
  export interface UserId {
    _id: string
    email: string
  }