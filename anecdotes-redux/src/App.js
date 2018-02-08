import React from "react";

class App extends React.Component {
  onVote = id => () => {
    this.props.store.dispatch({ type: "VOTE", data: { id } });
  };

  addAnecdote = event => {
    event.preventDefault();

    const anecdote = event.target.anecdote.value;

    this.props.store.dispatch({ type: "ADD", data: { anecdote: anecdote } });

    event.target.anecdote.value = "";
  };

  render() {
    const anecdotes = this.props.store.getState();

    anecdotes.sort(
      (l, r) => (l.votes > r.votes ? -1 : l.votes === r.votes ? 0 : 1)
    );

    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={this.onVote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
        <h2>add new</h2>
        <form onSubmit={this.addAnecdote}>
          <div>
            <input type="text" name="anecdote" />
          </div>
          <button type="submit">add</button>
        </form>
      </div>
    );
  }
}

export default App;
