import * as React from 'react';
import { useState, useContext } from 'react';
import PokemonContext from '@/contexts/PokemonContext';
import style from './style.module.css';
import PokemonCard from '../PokemonCard';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

function MyPokemons() {
  const { state } = useContext(PokemonContext);
  const { capturedPokemons } = state;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [click, setClick] = useState();
  const { dispatch } = useContext(PokemonContext);

  const goBack = () => {
    navigate(-1);
  };

  const handleRemove = (e) => {
    e.preventDefault();
    const id = e.target.id;
    const index = id.replace('pokemonrelease', '');
    dispatch({
      type: 'REMOVE_POKEMON',
      payload: { index },
    });
    setOpen(false);
  };

  const handleClickOpen = (e) => {
    const id = e.target.id;
    const index = id.replace('release', '');
    setClick(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <button type='button' onClick={goBack}>
        ← Back
      </button>
      <div className={style.container}>
        {capturedPokemons.map((pokemon, index) => (
          <>
            <PokemonCard key={`${pokemon}-${index}`} name={pokemon} />
            <Button
              variant='outlined'
              onClick={handleClickOpen}
              id={`release${index}`}
              key={`release${index}`}
            >
              Release
            </Button>
          </>
        ))}
      </div>
      <Dialog
        open={open}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          Are you sure in releasing this pokemon?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button
            onClick={handleRemove}
            id={`pokemonrelease${click}`}
            key={`pokemonrelease${click}`}
            autofocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default MyPokemons;
