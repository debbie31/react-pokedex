import { useContext, useEffect, useState } from 'react';
import style from './style.module.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
//        👆
// You can wrap the card into this
import PokeBall from '../PokeBall';
import PokemonContext from '@/contexts/PokemonContext';
import { ACTION_ADD_POKEMON } from '@/reducers/pokemon-reducer';

// Possible features:
// - Add more details like stats, base_experience, abilities, etc
// - Make it look like an actual Card
function PokemonDetailView() {
  const [artwork, setArtwork] = useState('');
  const [types, setTypes] = useState('');
  const { name } = useParams();
  const [description, setDescription] = useState('');
  // Hook to navigate without using Link component
  const navigate = useNavigate();
  const { dispatch } = useContext(PokemonContext);

  const fetchPokemonSpecies = async (url) => {
    const descriptionResponse = await fetch(url).then((res) => res.json());
    setDescription(descriptionResponse.flavor_text_entries[0].flavor_text);
  };
  const fetchPokemons = async (url) => {
    const response = await fetch(url).then((res) => res.json());
    // You can handle `null` value of response, like adding a default artwork
    setArtwork(response.sprites.other['official-artwork'].front_default);
    setTypes(response.types[0].type.name);
  };

  const goBack = () => {
    // We go back 1 step
    //       👇
    navigate(-1);
  };

  const onCapture = () => {
    dispatch({
      type: ACTION_ADD_POKEMON,
      payload: name,
    });
    // We passed type and payload as an object, because we are only allowed to pass one (1) argument
    // So object is the best way to group them
  };

  useEffect(() => {
    // You can just pass the type ID, and let the `fetchPokemons` make the url
    fetchPokemons(`https://pokeapi.co/api/v2/pokemon/${name}`);
    fetchPokemonSpecies(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
  }, [name, types]);

  // You can replace the div into Link and link it into a detail view
  return (
    <div className={style.container}>
      <button type='button' className={style.goBackButton} onClick={goBack}>
        ← Back
      </button>
      <Link className={style.myPokemon} to='/mypokemons'>
        Go to My Pokemons
      </Link>
      <h1>{name}</h1>
      <img src={artwork} alt='art work' />
      <h2>Pokemon Type: {types}</h2>
      <p className={style.description}>{description}</p>
      <div className={style.pokeBallContainer}>
        <PokeBall onClick={onCapture} />
      </div>
    </div>
  );
}

export default PokemonDetailView;
