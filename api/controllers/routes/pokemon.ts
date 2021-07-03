import PokemonController from "../PokemonController";

export const pokemonRouter = require( 'express' ).Router();


pokemonRouter.get( '/', PokemonController.getAll );

pokemonRouter.get( '/search', PokemonController.search )



