import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";

import {
	ChannelDetail,
	VideoDetail,
	SearchFeed,
	Navbar,
	Feed,
	FeedName,
} from "./components";
import { ThemeProvider } from "./context/ThemeContext";
import { BurguerProvider } from "./context/BurguerContext";

const App = () => (
	<ThemeProvider>
		<BurguerProvider>
			<BrowserRouter>
				<Box>
					<Navbar />
					<Routes>
						<Route exact path="/" element={<Feed />} />
						<Route path="/:name" element={<Feed />} />
						<Route path="/video/:id" element={<VideoDetail />} />
						<Route path="/channel/:id" element={<ChannelDetail />} />
						<Route path="/search/:searchTerm" element={<SearchFeed />} />
					</Routes>
				</Box>
			</BrowserRouter>
		</BurguerProvider>
	</ThemeProvider>
);

export default App;
