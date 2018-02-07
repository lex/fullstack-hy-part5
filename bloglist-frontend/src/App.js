import React from "react";
import Blog from "./components/blog";
import NewBlogForm from "./components/form-new-blog";
import Notification from "./components/notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const KEY_USER = "user";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      blogs: [],
      user: null,
      username: "",
      password: "",
      notification: null
    };
  }

  async componentDidMount() {
    const blogs = await blogService.getAll();
    this.setState({ blogs });

    const userJson = window.localStorage.getItem(KEY_USER);

    if (!userJson) {
      return;
    }

    const user = JSON.parse(userJson);
    blogService.setToken(user.token);
    this.setState({ user });
  }

  login = async event => {
    event.preventDefault();

    try {
      const credentials = {
        username: this.state.username,
        password: this.state.password
      };

      const user = await loginService.login(credentials);

      blogService.setToken(user.token);
      window.localStorage.setItem(KEY_USER, JSON.stringify(user));

      this.setState({ username: "", password: "", user });
    } catch (exception) {
      console.log(exception);
      this.showNotification("ERROR", `invalid credentials`);
    }
  };

  logout = () => {
    window.localStorage.clear();
    blogService.setToken(null);
    this.setState({ user: null });
  };

  handleLoginFieldChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  createBlog = async content => {
    try {
      const newBlog = await blogService.create(content);

      this.setState({
        blogs: this.state.blogs.concat(newBlog)
      });

      this.showNotification(
        "SUCCESS",
        `added ${newBlog.title} by ${newBlog.author}`
      );
    } catch (exception) {
      console.log(exception);
    }
  };

  showNotification = (style, message) => {
    this.setState({ notification: { style: style, message } });
    setTimeout(() => {
      this.setState({ notification: null });
    }, 3000);
  };

  renderLogin() {
    return (
      <div>
        <h2>log in</h2>

        <Notification notification={this.state.notification} />

        <form onSubmit={this.login}>
          <div>
            username:{" "}
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>

          <div>
            password:{" "}
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
        <button onClick={this.logout}>log out</button>

        <Notification notification={this.state.notification} />

        <NewBlogForm createBlog={this.createBlog} />

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
