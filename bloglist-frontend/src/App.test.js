import React from "react";
import { mount } from "enzyme";
import App from "./App";
import Blog from "./components/blog";
jest.mock("./services/blogs");
import blogService from "./services/blogs";

describe("<App />", () => {
  let app;

  describe("when user is not logged", () => {
    beforeEach(() => {
      app = mount(<App />);
    });

    it("shows no blogs", () => {
      app.update();
      const blogComponents = app.find(Blog);
      expect(blogComponents.length).toEqual(0);
    });
  });

  describe("when user is logged", () => {
    beforeEach(() => {
      const user = {
        username: "tester",
        token: "1231231214",
        name: "Teuvo Testaaja"
      };

      localStorage.setItem("user", JSON.stringify(user));
      app = mount(<App />);
    });

    it("all blogs are rendered", () => {
      app.update();
      const blogComponents = app.find(Blog);
      expect(blogComponents.length).toEqual(blogService.blogs.length);
    });
  });
});
