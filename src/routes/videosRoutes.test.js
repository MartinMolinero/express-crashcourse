const app = require("../../app");
const mongoose = require("mongoose");
const supertest = require("supertest");
//Schema
const Videos = require('../models/Videos');

beforeEach((done) => {
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

test("POST /videos", async () => {
  const video = { title: "First video", description: "Lorem ipsum", image: 'image-url', youtubeLink: 'youtu.be.com/hVuBk' }
  const response = await supertest(app).post("/videos").send(video)
  expect(response.status).toEqual(201)
  expect(response.body).toBeTruthy();
  // Check data
  expect(response.body.title).toBe(video.title);
  expect(response.body.description).toBe(video.description);
  expect(response.body.image).toBe(video.image);
  expect(response.body.youtubeLink).toBe(video.youtubeLink);
});

test("POST /videos", async () => {
  const video = { description: "Lorem ipsum", image: 'image-url', youtubeLink: 'youtu.be.com/hVuBk' }
  const response = await supertest(app).post("/videos").send(video)
  expect(response.status).toEqual(500)
  expect(response.error).toBeTruthy();
});

test("GET /videos", async () => {
  const video = await Videos.create({ title: "First video", description: "Lorem ipsum", image: 'image-url', youtubeLink: 'youtu.be.com/hVuBk' });
  const response = await supertest(app).get("/videos")
  expect(response.status).toEqual(200)
  expect(Array.isArray(response.body)).toBeTruthy();
  expect(response.body.length).toEqual(1);
  // Check data
  expect(response.body[0]._id).toBe(video.id);
  expect(response.body[0].title).toBe(video.title);
  expect(response.body[0].content).toBe(video.content);
});

test("GET /videos", async () => {
  const response = await supertest(app).get("/videos")
  expect(response.status).toEqual(404)
  expect(response.error).toBeTruthy();
});

test("GET /video/:id POSITIVE", async () => {
  const video = await Videos.create({ title: "First video", description: "Lorem ipsum", image: 'image-url', youtubeLink: 'youtu.be.com/hVuBk' });
  const response = await supertest(app).get(`/videos/${video._id}`)
  expect(response.status).toEqual(200)
  expect(response.body).toBeTruthy();
  // Check data
  expect(response.body.title).toBe(video.title);
  expect(response.body.description).toBe(video.description);
  expect(response.body.image).toBe(video.image);
  expect(response.body.youtubeLink).toBe(video.youtubeLink);
});

test("GET /video/:id NEGATIVE", async () => {
  const video = await Videos.create({ title: "First video", description: "Lorem ipsum", image: 'image-url', youtubeLink: 'youtu.be.com/hVuBk' });
  const response = await supertest(app).get(`/videos/${video._id}2`)
  expect(response.status).toEqual(404)
  // Check data
  expect(response.error).toBeTruthy()
});

test("PUT /videos/:id positive", async () => {
  const video = await Videos.create({ title: "First video", description: "Lorem ipsum", image: 'image-url', youtubeLink: 'youtu.be.com/hVuBk' });
  const newVideoInfo = { title: "First video updated", description: "Lorem ipsum 2", image: 'image-url-2', youtubeLink: 'youtu.be.com/heeee' }
  const response = await supertest(app).put(`/videos/${video._id}`).send(newVideoInfo)
  expect(response.status).toEqual(200)
  expect(response.body).toBeTruthy();

  // Check data
  expect(JSON.stringify(response.body._id)).toBe(JSON.stringify(video._id));
  expect(response.body.title).toBe(newVideoInfo.title);
  expect(response.body.description).toBe(newVideoInfo.description);
  expect(response.body.image).toBe(newVideoInfo.image);
  expect(response.body.youtubeLink).toBe(newVideoInfo.youtubeLink);
});

test("PUT /videos/:id negative", async () => {
  const newVideoInfo = { title: "First video updated", description: "Lorem ipsum 2", image: 'image-url-2', youtubeLink: 'youtu.be.com/heeee' }
  const response = await supertest(app).put(`/videos/videoid`).send(newVideoInfo)
  expect(response.status).toEqual(500)
  expect(response.error).toBeTruthy();
});


test("DELETE /videos/:id positive", async () => {
  const video = await Videos.create({ title: "First video", description: "Lorem ipsum", image: 'image-url', youtubeLink: 'youtu.be.com/hVuBk' });
  const response = await supertest(app).delete(`/videos/${video._id}`)
  expect(response.status).toEqual(200)
  expect(response.body).toBeTruthy();

  // Check data
  expect(response.body.title).toBe(video.title);
  expect(response.body.description).toBe(video.description);
  expect(response.body.image).toBe(video.image);
  expect(response.body.youtubeLink).toBe(video.youtubeLink);
});

test("DELETE /videos/:id negative", async () => {
  const video = await Videos.create({ title: "First video", description: "Lorem ipsum", image: 'image-url', youtubeLink: 'youtu.be.com/hVuBk' });
  const response = await supertest(app).delete(`/videos/${video._id}433`)
  expect(response.status).toEqual(500)
  expect(response.error).toBeTruthy();
});