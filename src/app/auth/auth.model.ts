export type ErrorMessage={
  type:string;
  message:string;
}

type PlayerScore={
  points:number;
  won:number;
  lost:number;
}

export type UserData = {
  id: number;
  email: string;
  name: string;
  avatar:string;
  playerScore: PlayerScore;
};
export interface AuthResponseData {
  accessToken: string;
  user: UserData;
}

export class User {
  constructor(public userData:UserData, private _token:string) {}
  get token(){
    return this._token
  }
}
