import axios from "axios";
class PokemonService {
	async getAll() {
		const response = await axios.get( '/api/pokemon/' );
		return response;
	}
}
export default new PokemonService();
