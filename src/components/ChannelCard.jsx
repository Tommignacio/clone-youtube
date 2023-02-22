import React from "react";
import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link } from "react-router-dom";
import { demoProfilePicture } from "../utils/constants";

// rendering chanels
const ChannelCard = ({ channelDetail }) => (
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
		}}
	>
		<Link to={`channel/${channelDetail?.id?.channelId}`}>
			<CardContent
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					textAlign: "center",
					color: "#fff",
				}}
			>
				{/* shows image channel */}
				<CardMedia
					image={
						channelDetail?.snippet?.thumbnails?.high?.url || demoProfilePicture
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

export default ChannelCard;
