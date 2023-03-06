import { createContext, useState } from "react";

const BurguerContext = createContext();

const initialBtn = false;

const BurguerProvider = ({ children }) => {
	const [closeMenu, setCloseMenu] = useState(initialBtn);

	const handleCloseMenu = () => {
		setCloseMenu(!closeMenu);
		// console.log(closeMenu);
	};
	const data = { closeMenu, handleCloseMenu };
	return (
		<BurguerContext.Provider value={data}>{children}</BurguerContext.Provider>
	);
};
export { BurguerProvider };
export default BurguerContext;
