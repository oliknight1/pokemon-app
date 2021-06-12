import { Card } from "antd";
import { IPokemonProps } from "../interfaces";
import { capitalize } from "../utils/helpers";
import PokemonType from "./PokemonType";
const { Meta } = Card;
const Pokemon = ( { pokemon } : IPokemonProps ) : JSX.Element => {
	return (
		<a href="#">
		<Card
			key={ pokemon.id }
			cover={
				<img
					alt={ pokemon.name }
					src={ pokemon.sprite }
				/>
			}
			hoverable
		>
			<Meta
				title={ capitalize( pokemon.name ) }
				style={{ marginBottom: 10 }}
			/>
			{
				pokemon.types.map( ( type : object ) => <PokemonType type={ type } key={ `${ pokemon.id }-${ type }` } /> )
			}
		</Card>
		</a>
	)
}
export default Pokemon;
