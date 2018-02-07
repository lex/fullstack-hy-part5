import React, { Component } from "react";

class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = { showDetails: false };
  }

  toggleDetails = () => {
    this.setState({ showDetails: !this.state.showDetails });
  };

  like = () => {};

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
          {this.props.blog.title} {this.props.blog.author}
        </p>

        {this.state.showDetails && (
          <div>
            <div>
              <a href={this.props.blog.url}>{this.props.blog.url}</a>
            </div>
            <div>
              {this.props.blog.likes} likes{" "}
              <button onClick={this.like}>like</button>
            </div>
            <div>
              <p>
                added by{" "}
                {this.props.blog.user ? this.props.blog.user.name : "undefined"}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Blog;
