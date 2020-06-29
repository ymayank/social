import { observable, action } from 'mobx';

export default class Offer {
  @observable isLoading = false;

  @action
  fetchOffers() {
    console.log('called')
  }
}