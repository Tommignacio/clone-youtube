import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import { Videos, ChannelCard, Sidebar } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import ThemeContext from "../context/ThemeContext";
import BurguerContext from "../context/BurguerContext";

const ChannelDetail = () => {
	const [channelDetail, setChannelDetail] = useState(null);
	const [videos, setVideos] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const { theme } = useContext(ThemeContext);
	const { closeMenu } = useContext(BurguerContext);

	//save the param url id -> localhost:3000/channel/isn2didwa23odpvp34jn2k42 (id)
	const { id } = useParams();

	//render when the id changes
	useEffect(() => {
		//fetch the channel details -> id; snippet: title,etc ; statics: subscribers, views ,etc...
		fetchFromAPI(`channels?part=snippet&id=${id}`).then((data) =>
			setChannelDetail(data?.items[0])
		);
		//fetch the videos from the channel
		fetchFromAPI(`search?channelId=${id}&part=snippet%2Cid&order=date`).then(
			(data) => {
				setVideos(data?.items);
			}
		);
	}, [id]);

	if (videos.length === 0 || !channelDetail) return "loading...";
	//render channelCard and videos
	return (
		<Box
			className={theme}
			minHeight="95vh"
			display={"flex"}
			flexDirection={"column"}
		>
			<Box
				className={closeMenu ? "sidebar" : "sidebar activeV2"}
				sx={{
					height: { sx: "auto", md: "92vh" },
					borderRight: "1px solid #3d3d3d",
					px: { xs: 0, md: 2 },
					position: { sx: "sticky", md: "fixed" },
					zIndex: 2,
					backgroundColor: theme === "light" ? "#fff" : "#000",
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

			<Box>
				<Box>
					<div
						style={{
							height: "300px",
							backgroundImage: `url(${channelDetail?.brandingSettings?.image?.bannerExternalUrl})`,
							backgroundPosition: "center",
							backgroundRepeat: "no-repeat",
							backgroundSize: "cover",
						}}
					/>
					<ChannelCard channelDetail={channelDetail} marginTop="-110px" />
				</Box>
				<Box p={2} display="flex">
					<Box sx={{ mr: { sm: "100px" } }} />
					<Videos videos={videos} />
				</Box>
			</Box>
		</Box>
	);
};

export default ChannelDetail;
