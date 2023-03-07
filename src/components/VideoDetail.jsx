import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { Sidebar, Videos } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import BurguerContext from "../context/BurguerContext";
import ThemeContext from "../context/ThemeContext";
import { demoChannelUrl } from "../utils/constants";
const VideoDetail = () => {
	const [videoDetail, setVideoDetail] = useState(null);
	const [videos, setVideos] = useState(null);
	const [selectedCategory, setSelectedCategory] = useState(null);
	//saving the id comming from url `/video/${videoId}` in component VideoCard link
	const { id } = useParams();
	const { theme } = useContext(ThemeContext);
	const { closeMenu } = useContext(BurguerContext);

	useEffect(() => {
		//fetch detail videos data
		fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) => {
			setVideoDetail(data.items[0]);
		});
		//fetch related videos
		fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
			(data) => setVideos(data.items)
		);
	}, [id]);

	//if the data hasn't load yet
	if (!videoDetail?.snippet) return "Loading...";
	//destructuring data from videoData
	const {
		snippet: { title, channelId, channelTitle },
		statistics: { viewCount, likeCount },
	} = videoDetail;

	return (
		<Box minHeight="95vh" className={theme}>
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
			{/* rendering current video */}
			<Stack
				direction={{
					xs: "column",
					md: "row",
					overflowY: "auto",
					height: "90vh",
				}}
			>
				<Box flex={1}>
					<Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
						{/* video */}
						<ReactPlayer
							url={`https://www.youtube.com/watch?v=${id}`}
							className="react-player"
							controls
						/>
						{/* title video */}
						<Typography variant="h5" fontWeight="bold" p={2}>
							{title}
						</Typography>
						<Stack direction="row" justifyContent="space-between" py={1} px={2}>
							<Link
								to={channelId ? `/channel/${channelId}` : demoChannelUrl}
								className={theme}
							>
								{/* channel title */}
								<Typography variant={{ sm: "subtitle1", md: "h6" }}>
									{channelTitle}
									<CheckCircleIcon
										sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
									/>
								</Typography>
							</Link>
							{/* view count */}
							<Stack direction="row" gap="20px" alignItems="center">
								<Typography variant="body1" sx={{ opacity: 0.7 }}>
									{parseInt(viewCount).toLocaleString()} views
								</Typography>
								{/* like count */}
								<Typography variant="body1" sx={{ opacity: 0.7 }}>
									{parseInt(likeCount).toLocaleString()} likes
								</Typography>
							</Stack>
						</Stack>
					</Box>
				</Box>
				{/* rendering related videos */}
				<Box
					px={2}
					py={{ md: 1, xs: 5 }}
					justifyContent="center"
					alignItems="center"
				>
					<Videos videos={videos} direction="column" />
				</Box>
			</Stack>
		</Box>
	);
};

export default VideoDetail;
