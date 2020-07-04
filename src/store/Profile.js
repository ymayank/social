import { observable, action } from 'mobx';
import Urls from '../network/Urls';
import NetworkOps from '../network/NetworkOps';

export default class Profile {
  @observable username = '';

  async init() {
    this.username = await localStorage.getItem('username');
  }

  @action
  setUsername(username) {
      this.username = username;
  }

}