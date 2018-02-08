import React from "react";
import { shallow } from "enzyme";
import Blog from "./blog";

describe("<Blog />", () => {
  it("shows only name and author of the blog by default", () => {
    const blog = {
      author: "author",
      title: "title",
      likes: 4
    };

    const blogComponent = shallow(<Blog blog={blog} />);
    const contentDiv = blogComponent.find(".content");
    const detailsDiv = blogComponent.find(".details");

    expect(contentDiv.text()).toContain(blog.author);
    expect(contentDiv.text()).toContain(blog.title);
    expect(detailsDiv.length).toBe(0);
  });

  it("shows details of the blog when name is clicked", () => {
    const blog = {
      author: "author",
      title: "title",
      likes: 4
    };

    const blogComponent = shallow(<Blog blog={blog} />);
    const name = blogComponent.find(".initial");
    name.simulate("click");

    const contentDiv = blogComponent.find(".content");
    const detailsDiv = blogComponent.find(".details");

    expect(contentDiv.text()).toContain(blog.author);
    expect(contentDiv.text()).toContain(blog.title);
    expect(contentDiv.text()).toContain(blog.url);
    expect(contentDiv.text()).toContain(blog.likes);
  });
});
