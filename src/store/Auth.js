import { observable, action } from 'mobx';
import Urls from '../network/Urls';
import NetworkOps from '../network/NetworkOps';

export default class Auth {
  constructor(store) {
      this.store = store;
  }
  
  @observable authToken = '';

  @action
  async login(data) {
    this.store.home.setLoading(true);
    const res = await NetworkOps.postToJson(Urls.login, data);
    this.store.home.setLoading(false);
    if(res) {
      this.store.profile.setUsername(data.username);
      localStorage.setItem('username', data.username);
    }
    return true;
  }

  @action
  async signup(data) {
    const options = {
      'Content-Type': 'multipart/form-data'
    }
    this.store.home.setLoading(true);
    const res = await NetworkOps.postRaw(Urls.signup, data, options);
    this.store.home.setLoading(false);
    console.log('signup',res);
    return true;
  }

  @action
  async forgotPassword(data) {
    this.store.home.setLoading(true);
    const res = await NetworkOps.postToJson(Urls.forgotPassword, data);
    this.store.home.setLoading(false);
    console.log(res);
    return true;
  }
}