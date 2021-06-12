import { AxiosResponse } from "axios";
import { useEffect, useState } from "react"
import { IPokemon } from "../interfaces";
import PokemonService from "../services/PokemonService"
import { Card, Row, Col } from 'antd';

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
			<Row gutter={ [ 32, 32 ] } justify="center" wrap={ true }>
				{
					pokemon.map( ( pokemon: any )=> {
						const typesArray = pokemon.types.map( ( typeObj:PokemonTypesObj ) => typeObj.type.name  )
						return (
							<Col sm={ 8 } lg={ 6 } xl={ 4 } flex="auto" key={ pokemon.id }>
								<Card 
									key={ pokemon.id }
									cover={
										<img
											alt={ pokemon.name }
											src={ pokemon.sprite }
										/>
									}
									hoverable
								>
									<Meta
										title={ capitalize( pokemon.name ) }
										description={ typesArray.map( ( type : string ) => capitalize( type ) + ' ' ) }
									/>
								</Card>
							</Col>
						)
					} )
				}
			</Row>
		</>
	) 

}
export default PokemonList
