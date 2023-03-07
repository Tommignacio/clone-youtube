import React, { useContext } from "react";
import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link } from "react-router-dom";
import { demoProfilePicture } from "../utils/constants";
import ThemeContext from "../context/ThemeContext";

// rendering chanels (channelDetail is coming from Videos component(item))
const ChannelCard = ({ channelDetail, marginTop }) => {
	const { theme } = useContext(ThemeContext);
	return (
		<Box
			sx={{
				boxShadow: "none",
				borderRadius: "20px",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				width: { xs: "356px", md: "320px" },
				height: "326px",
				margin: "auto",
				marginTop,
			}}
		>
			<Link to={`channel/${channelDetail?.id?.channelId}`}>
				<CardContent
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						textAlign: "center",
						alignItems: "center",
						color: theme === "dark" ? "#fff" : "#000",
					}}
				>
					{/* shows image channel */}
					<CardMedia
						image={
							channelDetail?.snippet?.thumbnails?.high?.url ||
							demoProfilePicture
						}
						alt={channelDetail?.snippet?.title}
						sx={{
							borderRadius: "50%",
							height: "180px",
							width: "180px",
							mb: 2,
							border: "1px solid #e3e3e3",
						}}
					/>
					{/* shows the title channel */}
					<Typography variant="h6">
						{channelDetail?.snippet?.title}
						<CheckCircleIcon
							sx={{ fontSize: "14px", color: "gray", ml: "5px" }}
						/>
					</Typography>
					{/* shows the suscribers count if exist */}
					{channelDetail?.statistics?.subscriberCount && (
						<Typography>
							{parseInt(
								channelDetail?.statistics?.subscriberCount
							).toLocaleString()}
							Subscribers
						</Typography>
					)}
				</CardContent>
			</Link>
		</Box>
	);
};

export default ChannelCard;
