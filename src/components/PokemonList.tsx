import { AxiosResponse } from "axios";
import { useEffect, useState } from "react"
import { IPokemon } from "../interfaces";
import PokemonService from "../services/PokemonService"
import { Card, Row, Col } from 'antd';
import Pokemon from "./Pokemon";

const { Meta } = Card;
type PokemonTypesObj = {
	slot : number,
	type : {
		name: string,
		url: string
	}
}
const capitalize = ( string : string ) : string => {
	return string.charAt(0).toUpperCase() + string.slice(1)
} 

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
							<Col xl={ 4 } lg={ 6 } sm={ 8 } xs={ 24 }>
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
