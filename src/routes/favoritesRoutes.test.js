const app = require("../../app");
const mongoose = require("mongoose");
const supertest = require("supertest");
//Schema
const Videos = require('../models/Videos');
const Users = require('../models/Users');
const Favorites = require('../models/Favorites');


beforeEach((done) => {
  jest.setTimeout(10000);
  const MONGODB_TEST = `mongodb+srv://${process.env.MONGO_TEST_USER}:${process.env.MONGO_TEST_PASSWORD}@cluster0.2hvwk.mongodb.net/${process.env.MONGO_TEST_DB}?retryWrites=true&w=majority`
  mongoose.connect(MONGODB_TEST,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done());
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done())
  });
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

test("POST /favorites negative", async () => {
  const favorite = { user: 'abc', video: 'cde'}
  const response = await supertest(app).post("/favorites").send(favorite)
  expect(response.status).toEqual(500)
  expect(response.error).toBeTruthy();
});

test("GET /favorites", async () => {
  const video = await Videos.create({ title: "First video", description: "Lorem ipsum", image: 'image-url', youtubeLink: 'youtu.be.com/hVuBk' });
  const user = await Users.create({name: 'Martin', job: 'SWE'})
  const favoriteData = { user: user._id, video: video._id}
  const favorite = await Favorites.create(favoriteData)
  const response = await supertest(app).get("/favorites")
  console.log('RESPONSE', response)
  expect(response.status).toEqual(200)
  expect(Array.isArray(response.body)).toBeTruthy();
  expect(response.body.length).toEqual(1);
  // Check data
  expect(response.body[0]._id).toBe(favorite.id);
  expect(response.body[0].user.name).toBe(user.name);
  expect(response.body[0].user.job).toBe(user.job);
  expect(response.body[0].video.title).toBe(video.title);
  expect(response.body[0].video.description).toBe(video.description);
  expect(response.body[0].video.image).toBe(video.image);
  expect(response.body[0].video.youtubeLink).toBe(video.youtubeLink);
});

test("GET /favorites", async () => {
  const response = await supertest(app).get("/favorites")
  expect(response.status).toEqual(404)
  expect(response.error).toBeTruthy();
});

test("GET /favorites/:id POSITIVE", async () => {
  const video = await Videos.create({ title: "First video", description: "Lorem ipsum", image: 'image-url', youtubeLink: 'youtu.be.com/hVuBk' });
  const user = await Users.create({name: 'Martin', job: 'SWE'})
  const favoriteData = { user: user._id, video: video._id}
  const favorite = await Favorites.create(favoriteData)
  const response = await supertest(app).get(`/favorites/${favorite._id}`)
  expect(response.status).toEqual(200)
  expect(response.body).toBeTruthy();
  // Check data
  expect(response.body._id).toBe(favorite.id);
  expect(response.body.user.name).toBe(user.name);
  expect(response.body.user.job).toBe(user.job);
  expect(response.body.video.title).toBe(video.title);
  expect(response.body.video.description).toBe(video.description);
  expect(response.body.video.image).toBe(video.image);
  expect(response.body.video.youtubeLink).toBe(video.youtubeLink);
});

test("GET /favorites/:id NEGATIVE", async () => {
  const response = await supertest(app).get(`/favorites/9090da2`)
  expect(response.status).toEqual(404)
  // Check data
  expect(response.error).toBeTruthy()
});


test("DELETE /favorites/:id positive", async () => {
  const video = await Videos.create({ title: "First video", description: "Lorem ipsum", image: 'image-url', youtubeLink: 'youtu.be.com/hVuBk' });
  const user = await Users.create({name: 'Martin', job: 'SWE'})
  const favoriteData = { user: user._id, video: video._id}
  const favorite = await Favorites.create(favoriteData)
  const response = await supertest(app).delete(`/favorites/${favorite._id}`)
  expect(response.status).toEqual(200)
  expect(response.body).toBeTruthy();

  // Check data
  expect(response.body._id).toBe(favorite.id);
  expect(response.body.user.name).toBe(user.name);
  expect(response.body.user.job).toBe(user.job);
  expect(response.body.video.title).toBe(video.title);
  expect(response.body.video.description).toBe(video.description);
  expect(response.body.video.image).toBe(video.image);
  expect(response.body.video.youtubeLink).toBe(video.youtubeLink);
});

test("DELETE /favorites/:id negative", async () => {
  const video = await Videos.create({ title: "First video", description: "Lorem ipsum", image: 'image-url', youtubeLink: 'youtu.be.com/hVuBk' });
  const user = await Users.create({name: 'Martin', job: 'SWE'})
  const favoriteData = { user: user._id, video: video._id}
  const favorite = await Favorites.create(favoriteData)
  const response = await supertest(app).delete(`/favorites/${favorite._id}433`)
  expect(response.status).toEqual(500)
  expect(response.error).toBeTruthy();
});