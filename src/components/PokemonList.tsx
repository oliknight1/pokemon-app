import { AxiosResponse } from "axios";
import { useEffect, useState } from "react"
import { IPokemon } from "../interfaces";
import PokemonService from "../services/PokemonService"
import { Row, Col } from 'antd';
import Pokemon from "./Pokemon";
const PokemonList = () : JSX.Element => {
	const [ pokemon, setPokemon ] = useState<IPokemon[]>([]);
	
	useEffect( () => {
		// ADD TO ERROR PROPERTY ON IPokemon OBJ
		PokemonService.getAll()
		.then( ( response : AxiosResponse<object> ) => response.data )
		.then( ( data : any ) => setPokemon( data ) )
		.catch( error => console.log( error ) )

	}, [] );
	return (
		<>
			<h1>Pokemon List</h1>
			<Row gutter={ [ 32, 32 ] } wrap={ true }>
				{
					pokemon.map( ( pokemon: any )=> {
						return (
							<Col xl={ 4 } lg={ 6 } sm={ 8 } xs={ 24 } key={ pokemon.id }>
								<Pokemon pokemon={ pokemon } />
							</Col>
						)
					} )
				}
			</Row>
		</>
	) 

}
export default PokemonList;
