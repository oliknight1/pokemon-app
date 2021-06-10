import { Request, Response } from "express";
import { InitialPokemonRequest, Pokemon } from "../models/Pokemon";
import { API_URL } from "../utils/config";
import BaseController from "./BaseController";

class PokemonController extends BaseController {
	public getAll = async ( _req : Request, res : Response ) : Promise<void> => {
		const response = await this.getData( `${ API_URL }/pokemon?offset=0&limit=20` );
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

	private buildResponse = ( data : any[] ) => {
		const parsedData : Pokemon[] = data.map( ( pokemon : any ) : Pokemon => {
			return {
				id: pokemon.id,
				name: pokemon.name,
				url: `${ API_URL }/pokemon/${pokemon.id}`,
				types: pokemon.types,
				sprite: pokemon.sprites.front_default
			}
		} );
		return parsedData;
	}
	

}
export default new PokemonController();
