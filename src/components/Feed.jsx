import React, { useEffect, useState, useContext } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Sidebar, Videos } from "./";
import ThemeContext from "../context/ThemeContext";
import { useParams } from "react-router-dom";
import BurguerContext from "../context/BurguerContext";
const Feed = () => {
	const { name } = useParams();
	const [selectedCategory, setSelectedCategory] = useState(
		!name ? "New" : name
	);
	const [videos, setVideos] = useState([]);
	const { theme } = useContext(ThemeContext);
	const { closeMenu } = useContext(BurguerContext);

	useEffect(() => {
		//calling fetch and providing url
		fetchFromAPI(`search?part=snippet&q=${selectedCategory}`).then((data) =>
			setVideos(data.items)
		);
	}, [selectedCategory]);

	return (
		<Stack
			className={theme}
			sx={{
				flexDirection: { sx: "column", md: "row" },
			}}
		>
			<Box
				className={!closeMenu ? "sidebar" : "sidebar active"}
				sx={{
					height: { sx: "auto", md: "92vh" },
					borderRight: "1px solid #3d3d3d",
					px: { xs: 0, md: 2 },
				}}
			>
				<Sidebar
					selectedCategory={selectedCategory}
					setSelectedCategory={setSelectedCategory}
				/>
				<Typography
					className="copyright"
					variant="body2"
					sx={{ mt: 1.5, color: theme === "light" ? "black" : "white" }}
				>
					Copyright © 2023
				</Typography>
			</Box>
			<Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
				<Typography
					variant="h4"
					fontWeight="bold"
					mb={2}
					sx={{ color: theme === "light" ? "black" : "white" }}
				>
					{selectedCategory} <span style={{ color: "#FC1503" }}>videos</span>
				</Typography>
				<Videos videos={videos} />
			</Box>
		</Stack>
	);
};

export default Feed;
