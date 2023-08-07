export interface userDetailsBackend {
    _id?: string;
    isBlocked: boolean;
  }

  export interface userInputData extends userDetailsBackend{
    name: string;
    email: string;
    password: string;
    image?: string;
  }

export interface userState {
    user:userInputData | null;
    token:string | null
}

