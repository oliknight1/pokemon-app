import axios, { AxiosResponse } from "axios";
class PokemonService {
	async getAll() : Promise<AxiosResponse> {
		const response  : AxiosResponse = await axios.get( '/api/pokemon/' );
		return response;
	}
	async handlePagination( newPage : number ) : Promise <AxiosResponse> {
		console.log( newPage )
		const response : AxiosResponse = await axios.get( `/api/pokemon?page=${ newPage }` )
		return response;

	}
}

export default new PokemonService();
