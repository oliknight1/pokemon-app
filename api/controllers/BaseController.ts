import fetch from "node-fetch";
import { Request, Response } from "express";
import {API_URL} from "../utils/config";

type test = {
	count : number,
	next : string | null,
	previous: string | null,
	results : {
		name: string,
		url: string
	}[]
}

class BaseController {
	public getData = async ( url: string ) => {
		const response = await fetch( url );
		const data = await response.json();
		return data;
	}
}
export default BaseController;
