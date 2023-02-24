import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos } from "./";

const SearchFeed = () => {
	const [videos, setVideos] = useState([]);
	//read the params from url "/search/:searchTerm"
	const { searchTerm } = useParams();

	useEffect(() => {
		//calling fetch and providing url
		fetchFromAPI(`search?part=snippet&q=${searchTerm}`).then((data) =>
			setVideos(data.items)
		);
	}, [searchTerm]);

	return (
		<Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
			<Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
				Most recent
				<span style={{ color: "#FC1503" }}> {searchTerm}</span> Videos
			</Typography>
			{/* render videos */}
			<Videos videos={videos} />
		</Box>
	);
};

export default SearchFeed;
