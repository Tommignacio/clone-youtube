import React from "react";
import { Stack, Box } from "@mui/material";
import { VideoCard, ChannelCard } from "./";
const Videos = ({ videos }) => {
	return (
		<Stack direction="row" flexWrap="wrap" justifyContent="start" gap={2}>
			{/* mapping the API  */}
			{videos.map((item, idx) => (
				<Box key={idx}>
					{/* if the videoId//channelId exist then create component */}
					{item.id.videoId && <VideoCard video={item} />}
					{item.id.channelId && <ChannelCard channelDetail={item} />}
				</Box>
			))}
		</Stack>
	);
};

export default Videos;
