export interface InitialPokemonRequest {
	name: string,
	url : string,
}

export interface Pokemon extends InitialPokemonRequest {
	types: object[],
	sprite: string,
	id: number

}
