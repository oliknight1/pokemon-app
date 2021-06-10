import fetch from "node-fetch";
class BaseController {
	public getData = async ( url: string ) => {
		const response = await fetch( url );
		const data = await response.json();
		return data;
	}
}
export default BaseController;
