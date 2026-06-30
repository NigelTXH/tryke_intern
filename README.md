# Nigel's intern project for TRYKE

## Overview
This is a full-stack system consisting of:
- TCP parser service (handles incoming device packets and insertion into DB)
- Express API (data processing + database access)
- React frontend (dashboard + visualisation)
## Requirements

This project was developed and tested with:
- Node.js: v14.15.3
- npm: 6.14.9

## Installation

1. Clone the repository and navigate to the project root (`js_version`).

2. Install the backend dependencies.

```bash
npm install
```

3. Create a `.env` file in the project root (`js_version`) with the following:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=your_db
DB_PORT=3306

PORT=5000   # Express API port
```

4. Install the frontend dependencies.

```bash
cd frontend
npm install
```

5. Create a `.env` file in the `frontend` directory with the following:

```env
REACT_APP_GOOGLE_API=your_api_key
```

6. Create the database, then run `database/schema.sql` to create the required tables.

7. From the project root (`js_version`), start the required services:

```bash
npm run server   # TCP server
npm run api      # Express API server
npm run react    # React frontend
```

To simulate clients sending data:

```bash
npm run client
```

## File structure

```text
C:.
├── api
│   ├── main
│   │   ├── apiController.js
│   │   ├── apiQueries.js
│   │   └── app.js
│   ├── routes
│   │   └── routes.js
│   ├── services
│   │   └── service.js
│   └── utils
│       └── utils.js
│
├── database
│   ├── dbConnection.js
│   └── schema.sql
│
├── frontend
│   ├── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   │
│   └── src
│       ├── App.css
│       ├── App.js
│       ├── index.css
│       ├── index.js
│       ├── cards
│       │   ├── batteryStatus.js
│       │   ├── cards.css
│       │   ├── findImei.js
│       │   ├── weeklyErrors.js
│       │   └── weeklyPackets.js
│       │
│       ├── components
│       │   ├── Navbar.css
│       │   └── Navbar.js
│       │
│       ├── pages
│       │   ├── Dashboard.js
│       │   ├── Map.js
│       │   └── Table
│       │       ├── DataTable.js
│       │       ├── FilterBar.js
│       │       ├── Pagination.js
│       │       └── Table.js
│       │
│       └── utils
│           └── utils.js
│
├── tcp_parser
│   ├── helper
│   │   ├── utils.js
│   │   ├── controller_helper_functions
│   │   │   ├── connectionHandler.js
│   │   │   └── parser.js
│   │   ├── data_helper_functions
│   │   │   ├── handler
│   │   │   │   └── handler.js
│   │   │   ├── repo
│   │   │   │   ├── gtfri.js
│   │   │   │   ├── gthbd.js
│   │   │   │   ├── gtmls.js
│   │   │   │   ├── gtncn.js
│   │   │   │   └── standardPacket.js
│   │   │   └── validators
│   │   │       ├── ecuCheck.js
│   │   │       ├── gtmlsCheck.js
│   │   │       ├── networkCheck.js
│   │   │       └── powerCheck.js
│   │   └── validation_helper_functions
│   │       ├── error_handling
│   │       │   └── generatePacket.js
│   │       ├── field_helper
│   │       │   ├── ecu.js
│   │       │   ├── network.js
│   │       │   ├── position.js
│   │       │   ├── power.js
│   │       │   └── protocol.js
│   │       ├── packets
│   │       │   ├── gtfri.js
│   │       │   ├── gthbd.js
│   │       │   ├── gtmls.js
│   │       │   ├── gtncn.js
│   │       │   ├── packetFieldNames.js
│   │       │   └── standardPacket.js
│   │       └── parse_gtmls
│   │
│   ├── main
│   │   ├── parserController.js
│   │   ├── parserDataHelper.js
│   │   └── parserValidationHelper.js
│   │
│   └── test
│       └── fakeClient.js
│
├── logs
│   └── input
│       ├── TCPServer-2025-02-01_00.log
│       ├── TCPServer-2025-02-01_01.log
│       ├── TCPServer-2025-02-01_02.log
│       ├── TCPServer-2025-02-01_03.log
│       ├── TCPServer-2025-02-02_00.log
│       ├── TCPServer-2025-02-02_01.log
│       ├── TCPServer-2025-02-02_02.log
│       ├── TCPServer-2025-02-02_03.log
│       ├── TCPServer-2025-02-03_00.log
│       ├── TCPServer-2025-02-03_01.log
│       ├── TCPServer-2025-02-03_02.log
│       ├── TCPServer-2025-02-04_00.log
│       ├── TCPServer-2025-02-04_01.log
│       ├── TCPServer-2025-02-04_02.log
│       ├── TCPServer-2025-02-05_00.log
│       ├── TCPServer-2025-02-05_01.log
│       ├── TCPServer-2025-02-05_02.log
│       ├── TCPServer-2025-02-06_00.log
│       ├── TCPServer-2025-02-06_01.log
│       ├── TCPServer-2025-02-06_02.log
│       ├── TCPServer-2025-02-07_00.log
│       ├── TCPServer-2025-02-07_01.log
│       └── TCPServer-2025-02-07_02.log
│
├── package.json
├── package-lock.json
├── README.md
└── .gitignore
```

## How to run

If this is the first time, run these in separate terminals to insert packets into the database, it is important that the server runs first before the client.

```bash
npm run server
```

```bash
npm run client
```

To run the website properly, make sure the api server is running in a separate terminal first.

```bash
npm run api
```

Then run the front end

```bash
npm run react
```
## Configure simulation (optional)

Inside the fake client script, you can modify these numbers:

```js
const CLIENTS_COUNT = 15;
const LINE_READ = 100;
```

IMPORTANT DISCLAIMER: Make sure CLIENTS_COUNT do not exceed the amount of log files