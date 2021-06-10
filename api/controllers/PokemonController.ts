import { Request, Response } from "express";
import { InitialPokemonRequest, Pokemon } from "../models/Pokemon";
import { API_URL } from "../utils/config";
import BaseController from "./BaseController";

class PokemonController extends BaseController {
	public getAll = async ( _req : Request, res : Response ) : Promise<void> => {
		const response = await this.getData( `${ API_URL }/pokemon?offset=0&limit=20` );
		const data = response.results;
		let all_pokemon = []
		for( const pokemon of data ) {
			const data = await this.getData( pokemon.url )
			const final_pokemon = this.buildResponse( data, pokemon );
			all_pokemon.push( final_pokemon )
		}
		res.send( all_pokemon )
	}

	private buildResponse = ( data : any , originalObject : InitialPokemonRequest ) => {
		const final_pokemon : Pokemon = {
			id: data.id,
			...originalObject,
			types: data.types,
			sprite: data.sprites.front_default,
		};
		return final_pokemon;
	}
	

}
export default new PokemonController();
