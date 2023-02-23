import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import { Videos, ChannelCard } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const ChannelDetail = () => {
	const [channelDetail, setChannelDetail] = useState(null);
	const [videos, setVideos] = useState([]);

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

	//render channelCard and videos
	return (
		<Box minHeight="95vh">
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
	);
};

export default ChannelDetail;
