import { createContext, useEffect, useState } from "react";

const ThemeContext = createContext();

const initialTheme = "light";
const initialChecked = false;
// conteiner that wraps the children components and share the data
const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState(initialTheme);
	const [checked, setChecked] = useState(initialChecked);
	const localStorageTheme = localStorage.getItem("theme");
	useEffect(() => {
		if (!localStorageTheme) {
			localStorage.setItem("theme", "light");
			setChecked(false);
		} else if (localStorageTheme === "dark") {
			setTheme("dark");
			setChecked(true);
		} else {
			setTheme("light");
		}
	}, []);

	const handleTheme = (e) => {
		if (e.target.checked) {
			setTheme("dark");
			localStorage.setItem("theme", "dark");
			setChecked(e.target.checked);
		} else {
			setTheme("light");
			localStorage.setItem("theme", "light");
			setChecked(e.target.checked);
		}
	};
	const data = { theme, handleTheme, checked };
	return <ThemeContext.Provider value={data}>{children}</ThemeContext.Provider>;
};

export { ThemeProvider };
export default ThemeContext;
