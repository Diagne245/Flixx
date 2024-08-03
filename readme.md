# Flixx App

Demo Link: &ensp; **https://flixx-proxy.onrender.com**

Movie info application built with vanilla JavaScript that uses **version 3** of the [TMDB API](https://developers.themoviedb.org/3)

It is part of the
<a href="https://www.udemy.com/course/modern-javascript-from-the-beginning/?kw=modern+javascript+from+the+beg&src=sac&couponCode=LETSLEARNNOW" target="_blank">Modern JS From The Beginning 2.0</a>
`Traversy Media` Udemy course.

<img src="client/src/images/screen.jpg" width="500">

<br>


The App includes the most `Popular Movies` and `TV shows` with `Detail Pages`, a `Search box` for movies and shows with `Full Pagination` and a `Slider` for movies that are currently playing in theaters and trending TV shows. The slider uses the <a href="https://swiperjs.com" target="_blank">Swiper</a>
library.

From the original version of the application built like a classic website, we used `Webpack` as a module bundler and turned it into a `Single Page Application` (SPA).
We also built a `Proxy Server` using `Node JS` and `Express JS` to `Store the api key` and `Routes` for fetching data from the API.

## Usage

### API KEY

Just clone or download and then register for a free API key at <a href="https://www.themoviedb.org/settings/api" target="_blank">www.themoviedb.org/settings/api</a>

Once you get your key, rename the `.env-example` file to `.env` and add your api key to the `API_KEY` variable.

### Install Dependencies

Install dependencies on the front-end and back-end

```bash
npm install
cd client
npm install
```

### Back-end/Express Server

```bash
node server
```

or

```bash
npm run start
```

or

```bash
npm run dev (Nodemon)
```

Visit `http://localhost:5000`

### Front-end/Webpack Dev Server

```bash
cd client
npm run dev
```

Visit `http://localhost:3000`

To build front-end production files

```bash
cd client
npm run build
```

The production build will be put into the `public` folder, which is the Express static folder.

## Reaching the Movie API

We use `GET Requests` in these methods to retrieve data from the API.

### fetchApiData(endpoint)

| Method       | Description          | Endpoint         |
| ------------ | -------------------- | ---------------- |
| fetchApiData | Get popular movies   | movie/popular    |
| fetchApiData | Get a movie details  | movie/${movieID} |
| fetchApiData | Get popular Tv shows | tv/popular       |
| fetchApiData | Get a show details   | tv/${showID}     |

### searchApiData().

| Method        | Description             | Body                       |
| ------------- | ----------------------- | -------------------------- |
| searchApiData | Search matching content | { type, searchTerm, page } |
