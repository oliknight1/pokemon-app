export interface Pokemon {
	name: string,
	url : string,
	types: string[],
	sprite: string,
	id: number
}
export interface IPokemonResponse {
	count : number,
	pokemon : Pokemon[]
}

export type PokemonTypeArray = {
	slot : number,
	type : {
		name : string,
		url : string
	}
}
