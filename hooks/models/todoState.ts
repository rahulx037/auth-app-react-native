
export interface Data{
    _id?: string
    title: string,
    description:string,
}

export interface Todo {
    data: Data [] | Data
    success:boolean,
    message:string,
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