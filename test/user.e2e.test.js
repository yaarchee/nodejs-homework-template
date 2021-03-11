const request = require("supertest");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fs = require("fs/promises");

const {
  contacts,
  newContact,
  User,
  newUser,
} = require("../model/__mocks__/data");
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

describe("Testing the route api/users", () => {
  it("should return 201 registration", async (done) => {
    const res = await request(app)
      .post(`/api/user/auth/registration`)
      .send(newUser)
      .set("Accept", "application/json");

    expect(res.status).toEqual(201);
    expect(res.body).toBeDefined();

    done();
  });

  it("should return 409 registration -  email already used", async (done) => {
    const res = await request(app)
      .post(`/api/user/auth/registration`)
      .send(newUser)
      .set("Accept", "application/json");

    expect(res.status).toEqual(409);
    expect(res.body).toBeDefined();

    done();
  });

  it("should return 200 login", async (done) => {
    const res = await request(app)
      .post(`/api/user/auth/login`)
      .send(newUser)
      .set("Accept", "application/json");

    expect(res.status).toEqual(200);
    expect(res.body).toBeDefined();

    done();
  });

  it("should return 401 login", async (done) => {
    const res = await request(app)
      .post(`/api/user/auth/login`)
      .send({ email: "fake@tets.com", password: "123456" })
      .set("Accept", "application/json");

    expect(res.status).toEqual(401);
    expect(res.body).toBeDefined();

    done();
  });

  // it('should return 200 upload avatar', async (done) => {
  //     const buffer = await fs.readFile('./test/default-avatar-female.jpg')
  //     const res = await request(app)
  //         .patch(`/api/user/avatars`)
  //         .set('Authorization', `Bearer ${token}`)
  //         .attach('avatar', buffer, 'default-avatar-female.jpg')
  //
  //     expect(res.status).toEqual(200)
  //     expect(res.body).toBeDefined()
  //
  //     done()
  // })
});
