export interface Todo {
    _id?: string
    title: string,
    description:string,
    userId:string
  }
  
export interface TodoState {
    loading: boolean
    todos: Todo []
  }

export class todoPayload implements Todo {
    _id?: string | undefined;
     title: string = "";
    description:string ="";
    userId:string="";
  }