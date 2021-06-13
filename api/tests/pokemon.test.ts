import supertest from 'supertest';
import { Response } from 'express'
import { app } from '../app';

const api = supertest( app );

describe( 'Test getting first 20 pokemon', () => {
	test( 'Data is returned as json', async () => {
		await api.get( '/api/pokemon' )
		.expect( 200 )
		.expect( 'Content-Type', /application\/json/);
	} );
	test ( '20 results returned', async () => {
		const response = await api.get( '/api/pokemon' )
		expect( response.body ).toHaveLength( 20 );
	} )
	test( 'Data contains type and sprite' , async () => {
		const response = await api.get( '/api/pokemon' );
		const expectedObj = {
			id: 1,
			name: 'bulbasaur',
			url: 'https://pokeapi.co/api/v2/pokemon/1/',
			types: [
				{
					"slot": 1,
					"type": {
						"name": "grass",
						"url": "https://pokeapi.co/api/v2/type/12/"
					}
				},{
					"slot": 2,
					"type": {
						"name": "poison",
						"url": "https://pokeapi.co/api/v2/type/4/"
					}
				}
			],
			"sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png"
		};
		expect( response.body[0] ).toMatchObject( expectedObj );
	} );
});

describe( 'Test pagination', () => {
	let first20Data : object;
	beforeEach( () => {
		first20Data = api.get( '/api/pokemon' );
	} )

	test( 'Data is returned as json', async () : Promise<void> => {
		await api.get( '/api/pokemon?page=2' )
		.expect( 200 )
		.expect( 'Content-Type', /application\/json/ );
	} );
	test( 'Test that the next 20 results are shown', async () : Promise<void> => {
		 const response : object = await api.get( '/api/pokemon?page=2' );
		 expect( response ).not.toMatchObject( first20Data )

	} );
});
