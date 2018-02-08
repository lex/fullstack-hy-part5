import React from "react";
import { shallow } from "enzyme";
import SimpleBlog from "./simple-blog";

describe("<SimpleBlog />", () => {
  it("renders content", () => {
    const blog = {
      author: "author",
      title: "title",
      likes: 4
    };

    const blogComponent = shallow(<SimpleBlog blog={blog} />);
    const contentDiv = blogComponent.find(".content");
    const likesDiv = blogComponent.find(".likes");

    expect(contentDiv.text()).toContain(blog.author);
    expect(contentDiv.text()).toContain(blog.title);
    expect(likesDiv.text()).toContain(blog.likes);
  });

  it("calls supplied function twice if like is clicked twice", () => {
    const blog = {
      author: "author",
      title: "title",
      likes: 4
    };

    const mockHandler = jest.fn();

    const blogComponent = shallow(
      <SimpleBlog blog={blog} onClick={mockHandler} />
    );
    const button = blogComponent.find("button");

    button.simulate("click");
    button.simulate("click");

    expect(mockHandler.mock.calls.length).toBe(2);
  });
});
