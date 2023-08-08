  export interface userInputData{
    _id?: string;
    isBlocked?: boolean;
    name: string;
    email: string;
    password: string;
    image?: string;
  }

export interface userModel {
    user:userInputData
    token:string 
}

