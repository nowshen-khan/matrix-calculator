import React from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
	const links = [
		{
			id: 1,
			name: "Home",
			url: "/",
		},
		{
			id: 2,
			name: "Matrix Calculator",
			url: "/matrix-calculator",
		},
		{
			id: 3,
			name: "Home",
			url: "/",
		},
	];
	return (
		<div className="px-2">
			<nav className="m-2 pt-2 flex justify-between">
				<div className="w-20 h-10">
					<Image
						src={"/logo.png"}
						width={606}
						height={259}
						layout="responsive"
						priority
					/>
				</div>
				<div className="text-white bg-slate-700">
					{links.map((link) => {
						<Link to={link.url} key={link.id}>
							{link.name}
						</Link>;
					})}
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
