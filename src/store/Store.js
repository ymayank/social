import NetworkOps from '../network/NetworkOps';
import Home from './Home';
import Auth from './Auth';
import Profile from './Profile';

class Store {
  constructor() {
    this.home = new Home(this);
    this.auth = new Auth(this);
    this.profile = new Profile(this);

    NetworkOps.init(this.auth);
  }

  async init() {
    await this.profile.init();
  }
}
export default new Store();