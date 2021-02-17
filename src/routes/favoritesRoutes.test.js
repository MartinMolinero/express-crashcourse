const app = require("../../app");
const mongoose = require("mongoose");
const supertest = require("supertest");
//Schema
const Videos = require('../models/Videos');
const Users = require('../models/Users');
const Favorites = require('../models/Users');

beforeEach((done) => {
  const MONGODB_TEST = `mongodb+srv://${process.env.MONGO_TEST_USER}:${process.env.MONGO_TEST_PASSWORD}@cluster0.2hvwk.mongodb.net/${process.env.MONGO_TEST_DB}?retryWrites=true&w=majority`
  mongoose.connect(MONGODB_TEST,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done());
});

afterEach((done) => {
  // mongoose.connection.db.dropDatabase(() => {
  //   mongoose.connection.close(() => done())
  // });
});

test("POST /favorites", async () => {
  const video = await Videos.create({ title: "First video", description: "Lorem ipsum", image: 'image-url', youtubeLink: 'youtu.be.com/hVuBk' });
  const user = await Users.create({name: 'Martin', job: 'SWE'})
  const favorite = { user: user._id, video: video._id}
  const response = await supertest(app).post("/favorites").send(favorite)
  expect(response.status).toEqual(201)
  expect(response.body).toBeTruthy();
  // Check data
  expect(JSON.stringify(response.body.user)).toBe(JSON.stringify(user._id));
  expect(JSON.stringify(response.body.video)).toBe(JSON.stringify(video._id));
});

test.only("POST /favorites negative", async () => {
  const favorite = { user: 'abc', video: 'cde'}
  const response = await supertest(app).post("/favorites").send(favorite)
  expect(response.status).toEqual(500)
  expect(response.error).toBeTruthy();
});

// test("GET /favorites", async () => {
//   const video = await Videos.create({ title: "First video", description: "Lorem ipsum", image: 'image-url', youtubeLink: 'youtu.be.com/hVuBk' });
//   const user = await Users.create({name: 'Martin', job: 'SWE'})
//   const favoriteData = { user: user._id, video: video._id}
//   const favorite = await Favorites.create(favoriteData)
//   const response = await supertest(app).get("/favorites")
//   expect(response.status).toEqual(200)
//   expect(Array.isArray(response.body)).toBeTruthy();
//   expect(response.body.length).toEqual(1);
//   // Check data
//   expect(response.body[0]._id).toBe(favorite.id);
//   expect(response.body[0].title).toBe(favorite.title);
//   expect(response.body[0].content).toBe(favorite.content);
// });

// test("GET /favorites", async () => {
//   const response = await supertest(app).get("/favorites")
//   expect(response.status).toEqual(404)
//   expect(response.error).toBeTruthy();
// });

// test("GET /favorites/:id POSITIVE", async () => {
//   const video = await Videos.create({ title: "First video", description: "Lorem ipsum", image: 'image-url', youtubeLink: 'youtu.be.com/hVuBk' });
//   const user = await Users.create({name: 'Martin', job: 'SWE'})
//   const favoriteData = { user: user._id, video: video._id}
//   const favorite = await Favorites.create(favoriteData)
//   const response = await supertest(app).get(`/favorites/${favorite._id}`)
//   expect(response.status).toEqual(200)
//   expect(response.body).toBeTruthy();
//   // Check data
//   expect(response.body.title).toBe(video.title);
//   expect(response.body.description).toBe(video.description);
//   expect(response.body.image).toBe(video.image);
//   expect(response.body.youtubeLink).toBe(video.youtubeLink);
// });

// test("GET /favorites/:id NEGATIVE", async () => {
//   const video = await Videos.create({ title: "First video", description: "Lorem ipsum", image: 'image-url', youtubeLink: 'youtu.be.com/hVuBk' });
//   const response = await supertest(app).get(`/videos/${video._id}2`)
//   expect(response.status).toEqual(404)
//   // Check data
//   expect(response.error).toBeTruthy()
// });


// test("DELETE /favorites/:id positive", async () => {
//   const video = await Videos.create({ title: "First video", description: "Lorem ipsum", image: 'image-url', youtubeLink: 'youtu.be.com/hVuBk' });
//   const user = await Users.create({name: 'Martin', job: 'SWE'})
//   const favoriteData = { user: user._id, video: video._id}
//   const favorite = await Favorites.create(favoriteData)
//   const response = await supertest(app).delete(`/favorites/${favorite._id}`)
//   expect(response.status).toEqual(200)
//   expect(response.body).toBeTruthy();

//   // Check data
//   expect(response.body.title).toBe(video.title);
//   expect(response.body.description).toBe(video.description);
//   expect(response.body.image).toBe(video.image);
//   expect(response.body.youtubeLink).toBe(video.youtubeLink);
// });

// test("DELETE /favorites/:id negative", async () => {
//   const video = await Videos.create({ title: "First video", description: "Lorem ipsum", image: 'image-url', youtubeLink: 'youtu.be.com/hVuBk' });
//   const user = await Users.create({name: 'Martin', job: 'SWE'})
//   const favoriteData = { user: user._id, video: video._id}
//   const favorite = await Favorites.create(favoriteData)
//   const response = await supertest(app).delete(`/videos/${favorite._id}433`)
//   expect(response.status).toEqual(500)
//   expect(response.error).toBeTruthy();
// });