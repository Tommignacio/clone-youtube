import React, { useContext } from "react";
import { Stack } from "@mui/material";

import { categories } from "../utils/constants";
import ThemeContext from "../context/ThemeContext";
import { Link } from "react-router-dom";

const Sidebar = ({ selectedCategory, setSelectedCategory }) => {
	const { theme } = useContext(ThemeContext);

	return (
		<Stack
			direction="row"
			sx={{
				overflowY: "auto",
				height: { sx: "auto", md: "95%" },
				flexDirection: { md: "column" },
			}}
		>
			{categories.map((category) => (
				<Link
					to={`/${category.name}`}
					className={`category-btn ${theme}`}
					onClick={() => {
						setSelectedCategory(category.name);
					}}
					style={{
						background: category.name === selectedCategory && "#FC1503",
						fontFamily: "system-ui",
					}}
					key={category.name}
				>
					<span
						style={{
							color: category.name === selectedCategory ? "white" : "red",
							marginRight: "15px",
						}}
					>
						{category.icon}
					</span>
					<span
						style={{
							opacity: category.name === selectedCategory ? "1" : "0.8",
						}}
					>
						{category.name}
					</span>
				</Link>
			))}
		</Stack>
	);
};

export default Sidebar;
