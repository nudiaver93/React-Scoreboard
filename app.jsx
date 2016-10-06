var PLAYERS = [
{
  name: 'Navin',
  id: 1,
},

{
  name: 'Kiran',
  id: 2,
},

{
  name: 'Player 3',
  id: 3,
},

]

function Header(props) {
  return (
    <div className='header'>
      <h1>{props.title}</h1>
    </div>
  );
}

Header.propTypes = {
  title: React.PropTypes.string.isRequired,
}

var Counter = React.createClass({
  propTypes: {
  },

  getInitialState: function() {
    return {
      score: 0,
    }
  },

  incrementScore: function() {
    this.setState({
      score: (this.state.score + 1),
    })
  },

  decrementScore: function() {
    this.setState({
      score: (this.state.score - 1),
    })
  },

  render: function() {
      return (
          <div className='player-score'>
            <div className='counter'>
              <button className='counter-action decrement' onClick={this.decrementScore}> - </button>
                <div className='counter-score'>
                {this.state.score}
                </div>
              <button className='counter-action increment' onClick={this.incrementScore}> + </button>
            </div>
          </div>
    );
  }
})

var Player = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
  }, 

  render: function() {
    return (
      <div className='player'>
        <div className='player-name'>
        {this.props.name}
        </div>
        <Counter />
      </div>
    );
  }
})

var Application = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    players: React.PropTypes.arrayOf(React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      id: React.PropTypes.number.isRequired,
    })).isRequired
  },

  render: function() {
      return (
        <div className='scoreboard'>
        <Header title='React State Scoreboard' />
          <div className='players'>
            {this.props.players.map(function(player){
              return <Player name={player.name} key={player.id} />
            })}
          </div>
        </div>
  );
  }
});


ReactDOM.render(<Application players={PLAYERS}/>, document.getElementById('container'));