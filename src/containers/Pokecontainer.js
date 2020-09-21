import React from 'react';
import Loading from '../components/Loading';
import Pokemon from '../components/Pokemon';

class Pokecontainer extends React.Component {
  constructor() {
    super();
    this.state = {
      pokemons: [],
      nextPokemons: 'https://pokeapi.co/api/v2/pokemon?limit=25',
      loading: true,
      prevY: 0,
    };
    this.loadingRef = React.createRef();
  }

  componentDidMount() {
    this.getPokemons();
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(
      this.handleObserver.bind(this),
      options,
    );
    observer.observe(this.loadingRef.current);
  }

  async getPokemons() {
    this.setState({ loading: true });
    const { nextPokemons } = this.state;
    const response = await fetch(nextPokemons);
    const data = await response.json();
    this.setState(state => ({
      pokemons: [...state.pokemons, ...data.results],
      nextPokemons: data.next,
      loading: false,
    }));
  }

  handleObserver(entries) {
    const { prevY, nextPokemons } = this.state;
    const { y } = entries[0].boundingClientRect;
    if (prevY > y && nextPokemons) {
      this.getPokemons();
    }
    this.setState({ prevY: y });
  }

  render() {
    const { pokemons, loading } = this.state;
    const loadingCss = { display: loading ? 'block' : 'none' };
    const loadingDiv = { height: '100px', width: '100%', margin: '10px' };
    return (
      <div className="flex flex-wrap container mx-auto">
        {pokemons.map((pokemon, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Pokemon index={index} pokemon={pokemon} key={index} />
        ))}
        <div style={loadingDiv} ref={this.loadingRef}>
          <div style={loadingCss}>
            <Loading />
          </div>
        </div>
      </div>
    );
  }
}

export default Pokecontainer;
