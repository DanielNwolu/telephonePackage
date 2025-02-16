# Telephone Package CLI

A command-line interface application for managing phone numbers with real-time dialing notifications.

## Demo
```
https://replit.com/@nwoludanielc/telephonePackage
```

## Features

- Add and store phone numbers
- Remove existing phone numbers
- Dial phone numbers with notification system
- View all stored contacts
- Persistent storage using JSON file
- Observer pattern for dialing notifications

## Prerequisites

- Node.js (v12.0.0 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/DanielNwolu/telephonePackage.git
cd telephonePackage
```

2. Install dependencies:
```bash
npm install
```

## Usage

Start the application:
```bash
npm start
```

### Available Commands

The CLI provides the following options:

1. **Dial a Phone Number**: Call an existing contact
2. **Add a Phone Number**: Store a new phone number
3. **Remove a Phone Number**: Delete an existing contact
4. **View Contacts**: List all stored phone numbers
5. **Exit**: Close the application

## Technical Details

- Built with Node.js
- Uses `prompt-sync` for CLI interactions
- Implements Observer pattern for dialing notifications
- Stores data in `phoneNumberDb.json`

## Dependencies

- `prompt-sync`: CLI input handling
- `fs`: File system operations for data persistence

## Data Storage

Phone numbers are persistently stored in `phoneNumberDb.json` in the root directory. The file is automatically created on first run if it doesn't exist.

## License

MIT

---