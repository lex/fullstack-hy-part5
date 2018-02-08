import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import counterReducer from "./reducer";

const store = createStore(counterReducer);

const Statistics = ({ handleOnClick }) => {
  const feedbacks = store.getState();
  const count = feedbacks.good + feedbacks.ok + feedbacks.bad;
  const mean = (feedbacks.good - feedbacks.bad) / count;
  const positive = (feedbacks.good + feedbacks.ok) / count;

  if (count === 0) {
    return (
      <div>
        <h2>statistics</h2>
        <div>no feedback given yet</div>
      </div>
    );
  }

  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <tr>
            <td>good</td>
            <td>{feedbacks.good}</td>
          </tr>
          <tr>
            <td>ok</td>
            <td>{feedbacks.ok}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{feedbacks.bad}</td>
          </tr>
          <tr>
            <td>mean</td>
            <td>{mean}</td>
          </tr>
          <tr>
            <td>positive</td>
            <td>{positive}%</td>
          </tr>
        </tbody>
      </table>

      <button onClick={handleOnClick}>clear</button>
    </div>
  );
};

class App extends React.Component {
  onClick = actionType => {
    store.dispatch({ type: actionType });
  };

  render() {
    return (
      <div>
        <h2>leave feedback</h2>
        <button onClick={() => this.onClick("GOOD")}>good</button>
        <button onClick={() => this.onClick("OK")}>ok</button>
        <button onClick={() => this.onClick("BAD")}>bad</button>
        <Statistics handleOnClick={() => this.onClick("CLEAR")} />
      </div>
    );
  }
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

renderApp();
store.subscribe(renderApp);
