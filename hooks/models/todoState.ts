export interface Todo {
    _id?: string
    title: string,
    description:string,
    userId:string,
    success:boolean,
    message:string,
  }
  
export interface TodoState {
    loading: boolean
    todos: Todo []
  }

export class initialTodoData implements Todo {
    _id?: string | undefined;
     title: string = "";
     description:string ="";
     userId:string="";
     success=false;
     message="";
  }