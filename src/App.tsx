import PokemonList from "./components/PokemonList";
import "antd/dist/antd.css";
import { Layout } from 'antd';
const { Content } = Layout;


const App = () => {
	return (
		<div>
			<Layout>
				<Content style={{ padding: '0 50px' }}>
					<PokemonList/>	
				</Content>
			</Layout>
		</div>
	);
}

export default App;
