import React, { Component } from "react";

class NewBlogForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: "",
      title: "",
      url: ""
    };
  }

  handleNewBlogChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  createBlog = async event => {
    event.preventDefault();

    await this.props.createBlog({
      author: this.state.author,
      title: this.state.title,
      url: this.state.url
    });

    this.setState({
      author: "",
      title: "",
      url: ""
    });
  };

  render() {
    return (
      <div>
        <h3>create new</h3>
        <form onSubmit={this.createBlog}>
          <div>
            title:{" "}
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleNewBlogChange}
            />
          </div>
          <div>
            author:{" "}
            <input
              type="text"
              name="author"
              value={this.state.author}
              onChange={this.handleNewBlogChange}
            />
          </div>
          <div>
            url:{" "}
            <input
              type="text"
              name="url"
              value={this.state.url}
              onChange={this.handleNewBlogChange}
            />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    );
  }
}

export default NewBlogForm;
