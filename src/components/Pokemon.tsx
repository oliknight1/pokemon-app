import { Card } from "antd";
import { IPokemonProps } from "../interfaces";
import { capitalize } from "../utils/helpers";
const { Meta } = Card;
const Pokemon = ( { pokemon } : IPokemonProps ) : JSX.Element => {
	return (
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
				description={ pokemon.types.map( ( type : any ) => capitalize( type ) + ' ' ) }
			/>
		</Card>
	)
}
export default Pokemon;
