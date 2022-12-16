import { makeAutoObservable, reaction } from 'mobx';
import { ServerError } from '../models/ServerError';

export default class CommonStore {
  error: ServerError | null = null;
  token: string | null = localStorage.getItem('jwt');
  appLoaded = false;
  constructor() {
    makeAutoObservable(this);
    reaction(
      () => this.token,
      (token) => {
        if (token) {
          localStorage.setItem('jwt', token);
        } else {
          localStorage.removeItem('jwt');
        }
      }
    );
  }

  serServerError(error: ServerError) {
    this.error = error;
  }

  setToken(token: string | null) {
    this.token = token;
  }

  setApploaded() {
    this.appLoaded = true;
  }
}