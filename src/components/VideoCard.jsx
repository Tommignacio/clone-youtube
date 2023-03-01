import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import {
	demoThumbnailUrl,
	demoVideoUrl,
	demoVideoTitle,
	demoChannelUrl,
	demoChannelTitle,
} from "../utils/constants";
import { red } from "@mui/material/colors";
import ThemeContext from "../context/ThemeContext";

//rendering the videos
const VideoCard = ({
	video: {
		id: { videoId },
		snippet,
	},
}) => {
	const { theme } = useContext(ThemeContext);
	return (
		<Card
			sx={{
				width: { xs: "100%", sm: "358px", md: "320px" },
				boxShadow: "none",
				borderRadius: 0,
				backgroundColor: "transparent",
			}}
		>
			<Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
				{/* rendering image card videos */}
				<CardMedia
					image={snippet?.thumbnails?.high?.url}
					alt={snippet?.title}
					sx={{
						width: {
							xs: "100%",
							sm: "358px",
							md: "320px",
						},
						height: 180,
						borderRadius: "15px",
					}}
				/>
			</Link>
			{/* rendering title video and channel name */}
			<CardContent className={theme} sx={{ height: "106px" }}>
				{/* showing video name (reduced) */}
				<Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
					<Typography
						variant="subtitle1"
						fontWeight="bold"
						color={theme === "light" ? "black" : "white"}
					>
						{snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
					</Typography>
				</Link>
				{/* showing channel name  */}
				<Link
					to={
						snippet?.channelId
							? `/channel/${snippet?.channelId}`
							: demoChannelUrl
					}
				>
					<Typography variant="subtitle2" fontWeight="bold" color="gray">
						{snippet?.channelTitle || demoChannelTitle}
						<CheckCircleIcon sx={{ fontSize: 12, color: "gray", ml: "5px" }} />
					</Typography>
				</Link>
			</CardContent>
		</Card>
	);
};

export default VideoCard;
