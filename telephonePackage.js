const prompt = require("prompt-sync")({ sigint: true });
const fs = require("fs");

let dbFilePath = "./phoneNumberDb.json";

// Initialize database file if it doesn't exist
if (!fs.existsSync(dbFilePath)) {
    fs.writeFileSync(dbFilePath, JSON.stringify([]), "utf-8");
}

// Load initial phone numbers
let db = fs.readFileSync(dbFilePath, "utf-8");
let phoneNumbers = db ? JSON.parse(db) : [];

// introduction to the app
const appTitle = "Your Telephone Package App";
console.clear();
console.log(`🚀 Welcome to ${appTitle} 🚀\n`);

class Telephone {
    constructor() {
        this.phoneNumbers = phoneNumbers;
        this.observers = [];
    }

    addPhoneNumber(number) {
        if (this.phoneNumbers.includes(number)) {
            console.log(`❌ This number ${number} is already added.`);
            return;
        }
        this.phoneNumbers.push(number);
        fs.writeFileSync(dbFilePath, JSON.stringify(this.phoneNumbers), "utf-8");
        console.log(`✅ Phone number ${number} added successfully!`);
    }

    removePhoneNumber(number) {
        const index = this.phoneNumbers.indexOf(number);
        if (index === -1) {
            console.log(`❌ This number ${number} is not in the database.`);
            return;
        }
        this.phoneNumbers.splice(index, 1);
        fs.writeFileSync(dbFilePath, JSON.stringify(this.phoneNumbers), "utf-8");
        console.log(`✅ Phone number ${number} removed successfully!`);
    }

    dialPhoneNumber(number) {
        if (this.phoneNumbers.includes(number)) {
            this.notifyObservers(number);
        } else {
            console.log("❌ Cannot dial. Phone number not added.");
        }
    }

    viewContacts() {
        if (this.phoneNumbers.length === 0) {
            console.log("📭 Your contact list is empty.");
        } else {
            console.log(`\n 📖 Your Contacts:`);
            this.phoneNumbers.forEach((number, index) => {
                console.log(`${index + 1}. ${number}`);
            });
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

// Create observers, you can also create more observers here
const printNumberObserver = new Observer((number) => console.log(`📞 Number: ${number}`));
const dialingObserver = new Observer((number) =>
    console.log(`🔄 Now Dialing ${number}...`)
);

// here I have instantiated telephone and added the observers.
const telephone = new Telephone();

// adding observers.
telephone.addObserver(printNumberObserver);
telephone.addObserver(dialingObserver);

// Main interaction loop
let userIsDone = false;
while (!userIsDone) {
    console.log("🌟 TELEPHONE MANAGER 🌟");
    console.log("1. 📞 Dial a Phone Number");
    console.log("2. ➕ Add a Phone Number");
    console.log("3. ➖ Remove a Phone Number");
    console.log("4. 📖 View Contacts");
    console.log("5. 🚪 Exit");

    const choice = parseInt(
        prompt("🎯 Enter your choice (1-5): ")
    );

    switch (choice) {
        case 1: {
            const number = prompt("Enter phone number to dial: ");
            telephone.dialPhoneNumber(number);
            break;
        }
        case 2: {
            const number = prompt("Enter phone number to add: ");
            telephone.addPhoneNumber(number);
            break;
        }
        case 3: {
            const number = prompt("Enter phone number to remove: ");
            telephone.removePhoneNumber(number);
            break;
        }
        case 4: {
            telephone.viewContacts();
            break;
        }
        case 5: {
            userIsDone = true;
            console.log("👋 Goodbye! Thank you for using the Telephone Manager!");
            break;
        }
        default: {
            console.log("❌ Invalid choice. Please enter a number between 1-5.");
        }
    }
}