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
});
