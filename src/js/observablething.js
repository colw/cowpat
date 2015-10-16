export default class ObservableThing {
	constructor(thing) {
	  this.thing = thing;
    this.onChangeListener = null;
	}

	set(newValue) {
	  this.thing = newValue;
	  this.notify();
	}
	
	get() {
	  return this.thing;
	}

	setChangeListener(listener) {
	  this.onChangeListener = listener;
	}

	notify() {
	  if (this.onChangeListener !== null) {
	    this.onChangeListener();
	  }
	}
}