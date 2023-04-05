
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
![App Screenshot](/public/blogger-1.jpg)
![App Screenshot](/public/blogger-2.jpg)