import { Request, Response } from "express";
import { IPokemonResponse, Pokemon, PokemonTypeArray } from "../models/Pokemon";
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
		const pokemonList : Pokemon[] = this.buildPokemon( allData )

		const returnValue : IPokemonResponse = {
			count : response.count,
			pokemon : pokemonList
		}
		res.send( returnValue )
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

	private buildPokemon = ( data : any[] ) => {
		const pokemonList : Pokemon[] = data.map( ( pokemon : any ) : Pokemon => {
			const types : string[] = pokemon.types.map( ( pokemonTypes : PokemonTypeArray ) => pokemonTypes.type.name )
			return {
				id: pokemon.id,
				name: pokemon.name,
				url: `${ API_URL }/pokemon/${pokemon.id}`,
				types: types,
				sprite: pokemon.sprites.front_default
			}
		} );
		return pokemonList;
	}

	public search = async ( req : Request, res : Response )  => {
		const searchTerm = req.query.q;
		if ( typeof searchTerm === undefined || searchTerm === '' ) {
			console.log( 'ja' )
			res.status( 400 ).send( { error: 'Invalid query string' } );
			return;
		}
		const url = `${ API_URL }/pokemon?offset=0&limit=1118`
		const response = await this.getData( url );
		const results = response.results;
		const foundPokemon : Pokemon[] = results.filter( ( pokemon : Pokemon ) => pokemon.name.includes( searchTerm as string ) );
		if ( foundPokemon !== undefined ) {
			res.send( foundPokemon )
		} else {
			res.send( null )
		}
	}

}
export default new PokemonController();
