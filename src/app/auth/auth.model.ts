export type ErrorMessage={
  type:string;
  message:string;
}
export type UserData = {
  id: number;
  email: string;
  name: string;
};
export interface AuthResponseData {
  accessToken: string;
  user: UserData;
}

export class User {
  constructor(public id:number, public name:string, private _token:string, public email:string) {}
  get token(){
    return this._token
  }
}
