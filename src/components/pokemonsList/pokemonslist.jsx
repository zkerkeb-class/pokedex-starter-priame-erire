import React from 'react';
import axios from 'axios';
import pokemons from '../../assets/pokemons';

export default class pokemonslist extends React.Component {
  state = {
    pokemons: []
  }

  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        const pokemons = res.data;
        this.setState({ pokemons });
      })
  }

  render() {
    return (
      <ul>
        {
          this.state.pokemons
            .map(person =>
              <li key={pokemons.id}>{pokemons.name}</li>
            )
        }
      </ul>
    )
  }
}
