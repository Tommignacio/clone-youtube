import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";

import {
	ChannelDetail,
	VideoDetail,
	SearchFeed,
	Navbar,
	Feed,
} from "./components";
import { ThemeProvider } from "./context/ThemeContext";

const App = () => (
	<ThemeProvider>
		<BrowserRouter>
			<Box>
				<Navbar />
				<Routes>
					<Route exact path="/" element={<Feed />} />
					<Route path="/video/:id" element={<VideoDetail />} />
					<Route path="/channel/:id" element={<ChannelDetail />} />
					<Route path="/search/:searchTerm" element={<SearchFeed />} />
				</Routes>
			</Box>
		</BrowserRouter>
	</ThemeProvider>
);

export default App;
