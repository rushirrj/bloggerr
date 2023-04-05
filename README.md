
## Blogger

This website is fully responsive and has been created using Next.js, Tailwind CSS, Express.js, and MongoDB. It features a modern and clean design, and is easy to navigate. Users can create, edit, and publish blog posts with ease.


## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## To run Server:

you will have to set db schema and provide the following in .env file 
```base
    MONGO_URI= <your link to the db>
    JWT_SECRET=<any secret key>
```
Then to start Server:
```base
    npm i
    nodemon index.js
```


## Tech Stack

**Client:** Next Js, TailwindCSS

**Server:** Node, Express 

**Database:** Mongo DB


## Features

- Responsive 
- Added Quill js to make text input more versatile.
- Used getServerSideProps for fetching all posts and individual posts
- Role specific access i,e (admin,normal user)

## Screenshots
![blogger-1](https://user-images.githubusercontent.com/80903066/229962347-53ed666d-62a4-4e1a-952a-d9514c4e7e8a.jpg)

![blogger-2](https://user-images.githubusercontent.com/80903066/229962434-4db6e3a7-fba1-40c2-97a6-8ab10ec539e6.jpg)
