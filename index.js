class Telephone {
    constructor() {
      this.phoneNumbers = new Set();
      this.observers = [];
    }
  
    addPhoneNumber(number) {
      this.phoneNumbers.add(number);
    }
  
    removePhoneNumber(number) {
      this.phoneNumbers.delete(number);
    }
  
    dialPhoneNumber(number) {
      if (this.phoneNumbers.has(number)) {
        this.notifyObservers(number);
      } else {
        console.log("Cannot dial. Phone number not added.");
      }
    }
  
    addObserver(observer) {
      this.observers.push(observer);
    }
  
    removeObserver(observer) {
      const index = this.observers.indexOf(observer);
      if (index !== -1) {
        this.observers.splice(index, 1);
      }
    }
  
    notifyObservers(number) {
      for (const observer of this.observers) {
        observer.notify(number);
      }
    }
  }
  
  class Observer {
    constructor(notificationHandler) {
      this.notificationHandler = notificationHandler;
    }
  
    notify(number) {
      this.notificationHandler(number);
    }
  }
  
  // Creating observers
  const printNumberObserver = new Observer((number) => console.log(number));
  const dialingObserver = new Observer((number) =>
    console.log(`Now Dialling ${number}`)
  );
  
  // Example usage:
  const telephone = new Telephone();
  telephone.addObserver(printNumberObserver);
  telephone.addObserver(dialingObserver);
  
  telephone.addPhoneNumber("2347023232");
  telephone.dialPhoneNumber("2347023232");
  // Output:
  // 2347023232
  // Now Dialling 2347023232
  
  telephone.removePhoneNumber("2347023232");
  telephone.dialPhoneNumber("2347023232");
  // Output: Cannot dial. Phone number not added.