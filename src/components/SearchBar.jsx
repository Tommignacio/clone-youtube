import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
	const [searchTerm, setSearchTerm] = useState("");
	//using to create a url
	const navigate = useNavigate();
	const handleSubmit = (e) => {
		e.preventDefault();
		//if something has been typed
		if (searchTerm) {
			//naviagte to this route at the url
			navigate(`/search/${searchTerm}`);
			//reload the state search
			setSearchTerm("");
		}
	};
	return (
		<Paper
			component="form"
			onSubmit={handleSubmit}
			sx={{
				borderRadius: 20,
				border: "1px solid #e3e3e3",
				pl: 2,
				boxShadow: "none",
				mr: { sm: 5 },
			}}
		>
			<input
				className="search-bar"
				placeholder="Search..."
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
			<IconButton
				type="submit"
				sx={{ p: "10px", color: "red" }}
				aria-label="search"
			>
				<SearchIcon />
			</IconButton>
		</Paper>
	);
};

export default SearchBar;
