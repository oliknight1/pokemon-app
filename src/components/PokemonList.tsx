import { AxiosResponse } from "axios";
import { useEffect, useState } from "react"
import { IPokemon } from "../interfaces";
import PokemonService from "../services/PokemonService"
import { Row, Col, Pagination } from 'antd';
import Pokemon from "./Pokemon";
const PokemonList = () : JSX.Element => {
	const [ pokemon, setPokemon ] = useState<IPokemon[]>([]);
	const [ pokemonCount, setPokemonCount ] = useState<number>();
	const [ page, setPage ] = useState<number>( 1 );
	
	useEffect( () => {
		// ADD TO ERROR PROPERTY ON IPokemon OBJ
		PokemonService.getAll()
		.then( ( response : AxiosResponse<object> ) => response.data )
		.then( ( data : any ) => {
			setPokemonCount( data.count );
			setPokemon( data.pokemon );
		} )
		.catch( error => console.log( error ) )

	}, [] );

	// Make sure to add a loading animation on page change
	const paginationHandler = ( nextPage : number ) => {
		setPage( nextPage );
		PokemonService.handlePagination( nextPage )
		.then( ( response : AxiosResponse<object> ) => response.data )
		.then( ( data : any ) => {
			setPokemon( data.pokemon );
		} )
		.catch( error => console.log( error ) )
		
	}
	return (
		<>
			<h1 className="mt-1 mb-2">Pokemon List</h1>
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
			<Pagination className="pagination" current={ page } total={ pokemonCount } showSizeChanger={ false } pageSize={ 20 } onChange={ paginationHandler }/>
		</>
	) 

}
export default PokemonList;
