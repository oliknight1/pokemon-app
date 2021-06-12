import { Tag } from "antd";
import { typeColours, capitalize } from '../utils/helpers';

const PokemonType = ( { type } : any ): JSX.Element => {
	return (
		<Tag color={ typeColours[ type ] }>{ capitalize( type ) }</Tag>
	)
}
export default PokemonType;
