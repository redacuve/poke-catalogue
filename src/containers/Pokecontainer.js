import React from 'react';

class Pokecontainer extends React.Component {
  constructor() {
    super();
    this.state = {
      pokemons: [],
      nextPokemons: 'https://pokeapi.co/api/v2/pokemon?limit=25',
      loading: true,
      prevY: 0,
    }
    this.loadingRef = React.createRef();
  }

  async getPokemons() {
    this.setState({ loading: true });
    const { nextPokemons } = this.state;
    const response = await fetch(nextPokemons);
    const data = await response.json();
    this.setState((state) => ({
      pokemons: [...state.pokemons, ...data.results],
      nextPokemons: data.next,
      loading: false,
    }));
  }

  handleObserver(entries, observer) {
    const { prevY } = this.state;
    const y = entries[0].boundingClientRect.y;
    if (prevY > y){
      this.getPokemons();
    }
    this.setState({ prevY: y })
  }

  componentDidMount(){
    this.getPokemons();
    let options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    }

    let observer = new IntersectionObserver(this.handleObserver.bind(this), options);
    observer.observe(this.loadingRef.current);
  }

  render() {
    const { pokemons } = this.state;
    const loadingCss = { display: this.state.loading ? "block" : "none" }
    const loadingDiv = { height: "100px", margin: "10px" }
    return(
      <div>
        { 
        pokemons.map(pokemon => (
          <div key={pokemon.name}>{pokemon.name}</div>
        ))
        }
        <div style={loadingDiv} ref={this.loadingRef}>
          <span style={loadingCss}>Loading...</span>
        </div>
      </div>
    );
  }
}

export default Pokecontainer;
