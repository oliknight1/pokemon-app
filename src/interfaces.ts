export interface IPokemon {
	id : number,
	name : string,
	url : string,
	types : object[],
	sprite : string,
	error : string | null
}
