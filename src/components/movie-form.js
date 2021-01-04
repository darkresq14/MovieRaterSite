import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { API } from '../api-service';

function MovieForm(props) {

    const mov = props.movie

    const[title, setTitle] = useState('');
    const[description, setDescription] = useState('');
    const [token] = useCookies(['mr-token']);

    useEffect( () => {
        setTitle(mov.title);
        setDescription(mov.description);
    }, [mov])

    const updateClicked = () => {
        API.updateMovie(mov.id, {title, description}, token)
            .then( resp => props.updateMovie(resp))
            .catch( error => console.log(error));
    }

    const createClicked = () => {
        API.createMovie({title, description}, token)
            .then( resp => props.movieCreated(resp))
            .catch( error => console.log(error));
    }

    const isDisabled = title.length === 0 || description.length === 0;

    return (
        <React.Fragment>
            { mov ? (
                <div>
                    <label htmlFor="title">Title</label><br />
                    <input id="title" type="text" placeholder="Title" value={title} onChange={ evt => setTitle(evt.target.value)} /><br />
                    <label htmlFor="description">Description</label><br />
                    <textarea id="description" placeholder="Description" value={description} onChange={ evt => setDescription(evt.target.value)} /><br />
                    { props.movie.id ? 
                        <button onClick={updateClicked} disabled={isDisabled}>Update</button> : 
                        <button onClick={createClicked} disabled={isDisabled}>Create</button>
                    }
                </div>
            ) : null }
        </React.Fragment>
    )
}

export default MovieForm