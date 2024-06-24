# Simple Store in Type Script

Simple Store in TypeScript is simple app made for learning and research on modules for TypeScript. This can be from development and testing or QA perspective.
This is not linked or related to any proyect in particullary and should not be.

# 1. Pre Requisits

## 1.1. For Mac Users
<details>
    <summary>View Instructions</summary>

Install bellow dependencies for your project.

### 1.1.1. Install Homebrew

Homebre is a Package Manager for Mac, that make easy the installation of softwares and applications.

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### 1.1.2. Install Git

Git is a software to create version controll projects.

```bash
brew install git
```

### 1.1.3. Install NVM

NVM is an acronym for `Node Version Manager` which means that you can install and handle multiple versions for `Node` and `npm` projects.

This is really helpful because many projects came in different versions of those two frameworks.

```bash
brew install nvm
```
</details>

## 1.2. For Windows Users
<details>
    <summary>View Instructions</summary>

Install bellow dependencies for your project.

### 1.2.1. Install Git

Git is a software to create version controll projects.

Go to https://git-scm.com/download/win and follow the instructions.

### 1.2.2. Install NVM

NVM is an acronym for `Node Version Manager` which means that you can install and handle multiple versions for `Node` and `npm` projects.

This is really helpful because many projects came in different versions of those two frameworks.

Go to https://github.com/coreybutler/nvm-windows/releases and download and install the latest version.
</details>

## 1.3. Install Node version 20

Now that we have the `NVM` installed, we can get installed the `node v20` in our system.

```bash
nvm install 20
nvm use 20
node --version
# v20.14.0
npm --version
# 10.7.0
```

The versions must be similar, at shown above. If not the case you will need to review the installation of them.

## 1.4. Install TypeScript

TypeScript is programming language based on JavaScript focused on clases and maintained by Microsoft.

```bash
npm install -g typescript
tsc --version
# Version 5.5.2
```

## 1.5. Install React

React is a framework to serve the frontend of the application that interacts with the user.

```bash
npm install -g create-react-app
create-react-app --version
# 5.0.1
```

## 1.6. Install serve

Server helps to provide a static web site.

```bash
npm install -g serve
serve --version
# 14.2.3
```

# 2. Initialize the Backend Project

```bash
cd backend/
```

## 2.1. Install the project dependencies

- express; Is web framework for Node.js
- sqlite3; Is filestore database framework
- sequelize; Is a connector for sqlite3 that manage the database
- dotenv; Loads environment variables from `.env` files
- bcrypt; Is an encryption module for NodeJS
- jsonwebtoken; Is a modole to share token and credentials safelly between two parties
- body-parser; Is a module that preformats the response body of a request
- stripe; Is a NodeJS module to communicate via API to the stripe endpoints
- cors; Is a NodeJS module to enable Cross-Origin Resource Sharing between applications

```bash
npm install express sqlite3 sequelize dotenv bcryptjs jsonwebtoken body-parser stripe cors
npm install --save-dev sequelize-cli typescript @types/express @types/node @types/bcryptjs @types/jsonwebtoken @types/body-parser @types/cors
```

## 2.2. Create and populate the .env file

The `.env` file will be your localhsot configuration for the project, copy the `.env.example` and add the necessary values to the configuration.

```bash
cp .env.example .env
```

Open the file and edit the values.

```ini
# This is where the web port your app will be available.
PORT=3001

# The file where your database will be stored
#   NOTE: A side note, please try to not rename it, so we can avoid uploading into Github
DATABASE_URL=sqlite:./simple-store-ts.db

# The secret string that will be used to encrypt/decrypt the JWTokens
JWT_SECRET=your_jwt_secret

# The Stripe Account Secret API Key
#   NOTE: You can create free account on stripe to test the integrations.
#         go to https://stripe.com
STRIPE_SECRET_KEY=your_stripe_secret_key
```

## 2.3. Run the app and use

```bash
npx sequelize-cli init
npx sequelize-cli db:migrate
tsc --init
npx tsc
node dist/server.js
```

# 3. Initialize the Frontend Project

```bash
cd frontend/
```

## 3.1. Install the project dependencies

- axios; Create promisse based HTTP clients
- dotenv; Loads environment variables from `.env` files
- react-router-dom; Create Routes on Web Applications

```bash
npm install dotenv react-router-dom @types/react-router-dom
npm install -D tailwindcss postcss autoprefixer
npm install --save typescript @types/node @types/react @types/react-dom @types/jest
```

## 3.2. Install TailwindCSS

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

## 3.3. Create and populate the .env file

The `.env` file will be your localhsot configuration for the project, copy the `.env.example` and add the necessary values to the configuration.

```bash
cp .env.example .env
```

Open the file and edit the values.

```ini
# The Frontend URL
REACT_APP_URL=http://localhost:3002

# The Backend URL
REACT_APP_API_URL=http://localhost:3001
```

## 3.3. Run the app and use

```bash
npm run build
npm start
or
serve -s build -p 3002
```