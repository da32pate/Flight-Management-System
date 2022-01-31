import classes from "./App.module.css";
import Home from "./components/Home/Home";
import Search from "./components/Search/Search";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
	return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
					<Route path='/search' element={<Search />} />
					<Route exact path='/' element={<Home />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
