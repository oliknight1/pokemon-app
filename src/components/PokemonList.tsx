import {AxiosResponse} from "axios";
import {useEffect, useState} from "react"
import {IPokemon} from "../interfaces";
import PokemonService from "../services/PokemonService"

const PokemonList = () : JSX.Element => {
	const [ pokemon, setPokemon ] = useState<IPokemon[]>([]);
	useEffect( () => {
		// SQUISH PREV COMIT


		// ADD TO ERROR PROPERTY ON IPokemon OBJ
		PokemonService.getAll()
		.then( ( response : AxiosResponse<object> ) => response.data )
		.then( ( data : any ) => setPokemon( data ) )
		.catch( error => console.log( error ) )

	}, [] );
	return (
		<div>
			<h1>Pokemon List</h1>

			{
				pokemon.map( pokemon => 
					<p key={ pokemon.id } >{ pokemon.name }</p>
				)
			}
		</div>
	) 

}
export default PokemonList
