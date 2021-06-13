import { Request, Response } from "express";
import { InitialPokemonRequest, Pokemon, PokemonTypeArray } from "../models/Pokemon";
import { API_URL } from "../utils/config";
import BaseController from "./BaseController";

type pageQuery = {
	page: string

}

class PokemonController extends BaseController {
	public getAll = async ( req : Request<{}, {}, {}, pageQuery>, res : Response ) : Promise<void> => {
		const { query } = req;
		let url : string = this.generateUrl( query );

		const response = await this.getData( url );
		const data = response.results;
		let allPromises = []
		for( const pokemon of data ) {
			const data = this.getData( pokemon.url )
			allPromises.push( data );
		}
		let allData = await Promise.all( allPromises );
		const parsedData : Pokemon[] = this.buildResponse( allData )

		res.send( parsedData )
	}

	private generateUrl = ( query : pageQuery ) : string => {
		if ( !query.page || query.page === '1' ) {
			return `${ API_URL }/pokemon?offset=0&limit=20`
		}
		const offset = this.calcualteOffset( query.page );
		return `${ API_URL }/pokemon?offset=${ offset }&limit=20`

	}

	private calcualteOffset = ( page : string ) : number => {
		return ( +page - 1 ) * 20;

	}

	private buildResponse = ( data : any[] ) => {
		const parsedData : Pokemon[] = data.map( ( pokemon : any ) : Pokemon => {
			const types : string[] = pokemon.types.map( ( pokemonTypes : PokemonTypeArray ) => pokemonTypes.type.name )
			return {
				id: pokemon.id,
				name: pokemon.name,
				url: `${ API_URL }/pokemon/${pokemon.id}`,
				types: types,
				sprite: pokemon.sprites.front_default
			}
		} );
		return parsedData;
	}


}
export default new PokemonController();
