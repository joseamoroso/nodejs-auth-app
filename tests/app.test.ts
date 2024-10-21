import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { validateJWT } from "../src/app";

describe("validateJWT", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock<NextFunction>;

  beforeEach(() => {
    req = {
      headers: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    next = jest.fn();
  });

  it("should call next() if a valid token is provided", () => {
    const token = jwt.sign({ userId: 1 }, "secret");
    (req as Request).headers["x-jwt-kwy"] = token;

    validateJWT(req as Request, res as Response, next);

    expect(jwt.verify(token, "secret")).toBeTruthy();
  });

  it("should send a 401 status code if no token is provided", () => {
    validateJWT(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith("Access denied. No token provided.");
  });

  it("should send a 400 status code if an invalid token is provided", () => {
    (req as Request).headers["x-jwt-kwy"] = "invalid token";

    validateJWT(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith("Invalid token.");
  });
});
