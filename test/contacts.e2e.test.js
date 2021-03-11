const request = require("supertest");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fs = require("fs/promises");

const { contacts, newContact, User } = require("../model/__mocks__/data");
const app = require("../app");
const SECRET_KEY = process.env.JWT_SECRET;

const issueToken = (payload, secret) => jwt.sign(payload, secret);
const token = issueToken({ id: User._id }, SECRET_KEY);
// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNDE0NjEzYmNiZDQ1NGI3Y2Q4Nzc5MSIsImlhdCI6MTYxNTEwNjk2MSwiZXhwIjoxNjE4NzAzMzYxfQ.Z0y-ExpsjXvo-q3hjri6_I5Xr-e1k_YffXTRroNrXlM";
User.token = token;

jest.setTimeout(30000);
jest.mock("../model/contacts.js");
jest.mock("../model/users.js");

describe("Testing the route api/contacts", () => {
  let idNewCat;
  describe("should handle get request", () => {
    it("should return 200 status for get all contacts", async (done) => {
      const res = await request(app)
        .get("/api/contacts/")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.data.contacts.contacts).toBeInstanceOf(Array);
      done();
    });
    it("should return 200 status by id", async (done) => {
      const contact = contacts[0];
      const res = await request(app)
        .get(`/api/contacts/${contact._id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.data.contact).toHaveProperty("_id");
      expect(res.body.data.contact._id).toBe(contact._id);
      done();
    });
    //   it("should return 404 status by wrong id", async (done) => {
    //     const wrongId = 12345;
    //     const res = await request(app)
    //       .get(`/api/cats/${wrongId}`)
    //       .set("Authorization", `Bearer ${token}`);
    //     expect(res.status).toEqual(404);
    //     expect(res.body).toBeDefined();
    //     done();
    //   });
    // });
    // describe("should handle post request", () => {
    //   it("should return 201 status create cat", async (done) => {
    //     const res = await request(app)
    //       .post(`/api/contacts`)
    //       .set("Authorization", `Bearer ${token}`)
    //       .send(newContact)
    //       .set("Accept", "application/json");
    //
    //     expect(res.status).toEqual(201);
    //     expect(res.body).toBeDefined();
    //     idNewCat = res.body.data.cat._id;
    //     done();
    //   });
    //   it("should return 400 status for wrong field", async (done) => {
    //     const res = await request(app)
    //       .post(`/api/cats`)
    //       .set("Authorization", `Bearer ${token}`)
    //       .send({ ...newCat, test: 1 })
    //       .set("Accept", "application/json");
    //
    //     expect(res.status).toEqual(400);
    //     expect(res.body).toBeDefined();
    //     done();
    //   });
    //   it("should return 400 status without required field name", async (done) => {
    //     const res = await request(app)
    //       .post(`/api/cats`)
    //       .set("Authorization", `Bearer ${token}`)
    //       .send({ name: "Simon" })
    //       .set("Accept", "application/json");
    //
    //     expect(res.status).toEqual(400);
    //     expect(res.body).toBeDefined();
    //     done();
    //   });
    //   it("should return 400 status without required field age", async (done) => {
    //     const res = await request(app)
    //       .post(`/api/cats`)
    //       .set("Authorization", `Bearer ${token}`)
    //       .send({ age: 3 })
    //       .set("Accept", "application/json");
    //
    //     expect(res.status).toEqual(400);
    //     expect(res.body).toBeDefined();
    //     done();
    //   });
    // });
    // describe("should handle put request", () => {
    //   it("should return 200 status update cat", async (done) => {
    //     const res = await request(app)
    //       .put(`/api/cats/${idNewCat}`)
    //       .set("Authorization", `Bearer ${token}`)
    //       .send({ name: "Boris" })
    //       .set("Accept", "application/json");
    //
    //     expect(res.status).toEqual(200);
    //     expect(res.body).toBeDefined();
    //     expect(res.body.data.cat.name).toBe("Boris");
    //     done();
    //   });
    //   it("should return 400 status for wrong field", async (done) => {
    //     const res = await request(app)
    //       .put(`/api/cats/${idNewCat}`)
    //       .set("Authorization", `Bearer ${token}`)
    //       .send({ test: 1 })
    //       .set("Accept", "application/json");
    //
    //     expect(res.status).toEqual(400);
    //     expect(res.body).toBeDefined();
    //     done();
    //   });
    //   it("should return 404 status with wrong id", async (done) => {
    //     const res = await request(app)
    //       .put(`/api/cats/1234`)
    //       .set("Authorization", `Bearer ${token}`)
    //       .send({ name: "Simon" })
    //       .set("Accept", "application/json");
    //
    //     expect(res.status).toEqual(404);
    //     expect(res.body).toBeDefined();
    //     done();
    //   });
  });
  describe("should handle patch request", () => {});
  describe("should handle delete request", () => {});
});
