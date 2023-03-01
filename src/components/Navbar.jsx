import { Stack } from "@mui/material";
import { Link } from "react-router-dom";

import { logo } from "../utils/constants";
import { SearchBar } from "./";
import Switch from "@mui/material/Switch";
import * as React from "react";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
const Navbar = () => {
	const { theme, handleTheme, checked } = useContext(ThemeContext);

	return (
		<Stack
			direction="row"
			alignItems="center"
			p={2}
			className={theme}
			sx={{
				position: "sticky",
				top: 0,
				justifyContent: "space-between",
			}}
		>
			<Link to="/" style={{ display: "flex", alignItems: "center" }}>
				<img src={logo} alt="logo" height={45} />
			</Link>
			<SearchBar />
			<Switch checked={checked} color="default" onChange={handleTheme} />
		</Stack>
	);
};

export default Navbar;
