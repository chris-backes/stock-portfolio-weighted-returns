import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import styles from './Footer.module.css'

library.add(fab);

function Footer() {
	return (
		<footer>
            <h2>By Chris Backes</h2>
			<nav>
				<a
					href="https://github.com/chris-backes"
					target="_blank"
					rel="noreferrer"
				>
					<FontAwesomeIcon icon={["fab", "github"]} size="3x" />{" "}
				</a>
				<a
					href="https://www.linkedin.com/in/christopher-backes-2b7513169/"
					target="_blank"
					rel="noreferrer"
				>
					<FontAwesomeIcon icon={["fab", "linkedin"]} size="3x" />{" "}
				</a>
				<a
					href="https://stackoverflow.com/users/17331548/chris-backes"
					target="_blank"
					rel="noreferrer"
				>
					<FontAwesomeIcon
						icon="fa-brands fa-stack-overflow"
						size="3x"
					/>{" "}
				</a>
				<a
					href="https://www.youtube.com/channel/UCvfToc3ftGQ31IL6P5or6Hw"
					target="_blank"
					rel="noreferrer"
				>
					<FontAwesomeIcon icon={["fab", "youtube"]} size="3x" />{" "}
				</a>
			</nav>
		</footer>
	);
}

export default Footer