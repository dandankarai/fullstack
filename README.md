# Descrição 
A barbershop system, where we can register a new barbershop, where this barbershop can register as many customers as they want, having a list of haircuts and a list of customers' calendars

## Frontend - Technologies used

 <br/>
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
 <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />


## Backend - Technologies used
<img src=" https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white"/>
<img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" />
<img src="https://img.shields.io/badge/json%20web%20tokens-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink"/>

---

````
Inside ordemsystemfront exist a folder name assets, which has screenshots of the application
````

# :construction_worker: How to run
```bash
# Clone Repository
$ git clone https://github.com/dandankarai/fullstack.git
```

### 📦 Run API

```bash
# Build service
$ cd ordemsystemback
yarn install
yarn dev
```
Access API at http://localhost:3333/

### 📦 Run FRONTEND

```bash
# Build service
$ cd ordemsystemfront
yarn install
yarn dev
```
Access web at http://localhost:3333/

### Inside the folder <b>ordemsystemfront</b>
```bash
 $ create .env.local file and paste
        NEXT_PUBLIC_API_URL = 'http://localhost:3333'
```
## ENDPOINTS 
Endpoint       | Descrição
-------------- | -----------------------------
USERS --------
GET /me    | Return data info about user. 
PUT /users    | Update info about user.
POST /userSession  | Register a new user.
POST /users | Update main infos about user, like email and name <br>
HAIRCUTS ---------
POST/haircut | Create a new haircut
GET /haircuts    | Return the list os haircuts registered
GET /haircut/detail  | Return detail about haircut user
GET /haircut/check    | Return if user has a subscription(premium)
GET /haircut/count | Returns the number of cuts.
SCHEDULE --------
GET /schedule    | Return the list of schedules
POST /schedule | Create a new schedule
---

<br>
