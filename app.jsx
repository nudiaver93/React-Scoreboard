var PLAYERS = [
{
  name: 'Navin',
  score: 0,
  id: 1,
},

{
  name: 'Kiran',
  score: 0,
  id: 2,
},

{
  name: 'Player 3',
  score: 0,
  id: 3,
},

]

var nextId = 4;

function Stats(props){
  var totalPlayers = props.players.length;
  var totalPoints = props.players.reduce(function(total, player){
    return total + player.score;
  }, 0);

  return (
    <table className='stats'>
      <tbody>
        <tr>
          <td>Players: </td>
          <td>{totalPlayers}</td>
        </tr>
        <tr>
          <td>Total Points: </td>
          <td>{totalPoints}</td>
        </tr>
      </tbody>
    </table>
  )
}

var AddPlayerForm = React.createClass({
  propTypes: {
    onAdd: React.PropTypes.func.isRequired,
  },

  getInitialState: function() {
    return {
      name: "",
    };
  },

  onNameChange: function(e) {
    this.setState({name: e.target.value});
  },

  onSubmit: function(e){
    e.preventDefault();

    this.props.onAdd(this.state.name);
    this.setState({name: ''});
  },

  render: function() {
    return (
      <div className='add-player-form'>
        <form onSubmit={this.onSubmit}>
          <input type='text' placeholder='Enter Player' value={this.state.name} onChange={this.onNameChange} />
          <input type='submit' value='Submit Player' onAdd={this.onPlayerAdd}/>
        </form>
      </div>
    );
  }
});

Stats.propTypes = {
  players: React.PropTypes.array.isRequired,
}

function Header(props) {
  return (
    <div className='header'>
      <Stats players={props.players}/>
      <h1>{props.title}</h1>
    </div>
  );
}

Header.propTypes = {
  title: React.PropTypes.string.isRequired,
  players: React.PropTypes.array.isRequired,
}

function Counter(props) {
  return (
    <div className='counter'>
      <button className='counter-action decrement' onClick={function() {props.onChange(-1);}}> - </button>
      <div className='counter-score'> {props.score} </div>
      <button className='counter-action increment' onClick={function() {props.onChange(1);}}> + </button>
    </div>
  );
}

Counter.propTypes = {
  score: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
}


var Player = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    score: React.PropTypes.number.isRequired,
    onScoreChange: React.PropTypes.func.isRequired, 
  }, 

  render: function() {
    return (
      <div className='player'>
        <div className='player-name'>
        {this.props.name} 
        </div>
        <Counter score={this.props.score} onChange={this.props.onScoreChange}/>
      </div>
    );
  }
})

var Application = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    initialPlayers: React.PropTypes.arrayOf(React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      score: React.PropTypes.number.isRequired,
      id: React.PropTypes.number.isRequired,
    })).isRequired,
  },

  getDefaultProps: function() {
    return {
      title: 'Navin\'s React Scoreboard',
    }
  },

  getInitialState: function() {
    return {
      players: this.props.initialPlayers,
    };
  },

  onScoreChange: function(index, delta) {
    console.log('onScoreChange', index, delta);
    this.state.players[index].score += delta;
    this.setState(this.state);
  },

  onPlayerAdd: function(name) {
    this.state.players.push({
      name: name,
      score: 0,
      id: nextId,
    });
    this.setState(this.state);
    nextId += 1;
  },

  render: function() {
      return (
        <div className='scoreboard'>
        <Header title={this.props.title} players={this.state.players}/>
          <div className='players'>
            {this.state.players.map(function(player, index)
              { return (
                <Player 
                  onScoreChange={function(delta) {this.onScoreChange(index, delta)}.bind(this)} 
                  name={player.name} 
                  score={player.score} 
                  key={player.id} />
              )
            }.bind(this))}
          </div>
          <AddPlayerForm onAdd={this.onPlayerAdd}/>
        </div>
      );
     }
});


ReactDOM.render(<Application initialPlayers={PLAYERS}/>, document.getElementById('container'));
