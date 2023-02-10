import { autorun, makeObservable, observable, runInAction } from "mobx";

class LayoutStore {
  open = true;

  constructor() {
    makeObservable(this, {
      open: observable,
    });
  }

  changeOpen() {
    // console.log(this.open);
    this.open = !this.open;
  }
}

export default LayoutStore;
