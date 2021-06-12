export interface InitialPokemonRequest {
	name: string,
	url : string,
}

export interface Pokemon extends InitialPokemonRequest {
	types: string[],
	sprite: string,
	id: number
}

export type PokemonTypeArray = {
	slot : number,
	type : {
		name : string,
		url : string
	}
}
