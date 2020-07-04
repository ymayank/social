import { observable, action } from 'mobx';
import Urls from '../network/Urls';
import NetworkOps from '../network/NetworkOps';

export default class Home {
  constructor(store) {
    this.store = store;
  }

  @observable toast = {
    open: false,
    vertical: 'top',
    horizontal: 'center',
    message: '',
    autoHideDuration: 1000
  }

  @observable isLoading = false;
  @observable homeListing = [];

  @action
  showToast(config) {
    this.toast = { ...this.toast, open: true, ...config}
  }

  @action
  hideToast = () => {
    this.toast = { ...this.toast, open: false, message: ''}
  }

  @action
  setLoading(isLoading) {
    this.isLoading = isLoading;
  }

  @action
  async getHomeListing(type) {
    const data = {
      username: this.store.profile.username,
      type: type
    }
    this.setLoading(true);
    const res = await NetworkOps.postToJson(Urls.homeListing, data);
    this.setLoading(false);
    if(res && res.length) {
      this.homeListing = res;
    }
  }
}