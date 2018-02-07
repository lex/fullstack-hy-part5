import React, { Component } from "react";
import blogService from "../services/blogs";

class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = { showDetails: false, blog: this.props.blog };
  }

  toggleDetails = () => {
    this.setState({ showDetails: !this.state.showDetails });
  };

  like = async () => {
    const modifiedBlog = {
      ...this.state.blog,
      likes: this.state.blog.likes + 1,
      user: this.state.blog.user._id
    };

    const result = await blogService.update(modifiedBlog);
    console.log(result);
    this.setState({ blog: result });
  };

  render() {
    const blogStyle = {
      border: "1px solid black",
      borderRadius: "5px",
      margin: "5px",
      padding: "5px"
    };

    return (
      <div style={blogStyle}>
        <p onClick={this.toggleDetails}>
          {this.state.blog.title} {this.state.blog.author}
        </p>

        {this.state.showDetails && (
          <div>
            <div>
              <a href={this.state.blog.url}>{this.state.blog.url}</a>
            </div>
            <div>
              {this.state.blog.likes} likes{" "}
              <button onClick={this.like}>like</button>
            </div>
            <div>
              <p>
                added by{" "}
                {this.state.blog.user ? this.state.blog.user.name : "undefined"}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Blog;
