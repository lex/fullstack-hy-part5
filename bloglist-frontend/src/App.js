import React from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [],
      user: null,
      username: "",
      password: ""
    };
  }

  componentDidMount() {
    blogService.getAll().then(blogs => this.setState({ blogs }));
  }

  login = async event => {
    event.preventDefault();

    console.log(
      `logging in with ${this.state.username}:${this.state.password}`
    );

    try {
      const credentials = {
        username: this.state.username,
        password: this.state.password
      };
      const user = await loginService.login(credentials);
      this.setState({ username: "", password: "", user });
    } catch (exception) {
      console.log(exception);
    }
  };

  handleLoginFieldChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  renderLogin() {
    return (
      <div>
        <h2>Kirjaudu sovellukseen</h2>
        <form onSubmit={this.login}>
          <div>
            username{" "}
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>

          <div>
            password{" "}
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
            />
          </div>

          <button type="submit">log in</button>
        </form>
      </div>
    );
  }

  renderBlogs() {
    return (
      <div>
        <h2>blogs</h2>
        <p>logged in as {this.state.user.name}</p>
        {this.state.blogs.map(blog => <Blog key={blog._id} blog={blog} />)}
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.state.user === null ? this.renderLogin() : this.renderBlogs()}
      </div>
    );
  }
}

export default App;
