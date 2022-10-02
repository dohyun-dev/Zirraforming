import { motion } from "framer-motion";
import styled from "styled-components";
import ApexChart from "react-apexcharts";

const Wrapper = styled(motion.div)`
	position: relative;
	top: 2vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: rgba(255, 255, 255, 0.8);
	border-radius: 5vh;
	width: 80vw;
	height: 80vh;

	h2 {
		font-size: 100;
		color: black;
	}
	@media screen and (${(props) => props.theme.tablet}) {
		width: 60vw;
	}
	@media screen and (${(props) => props.theme.mobile}) {
		width: 300px;
		min-width: 300px;
	}
`;

function Result() {
	return (
		<>
			<Wrapper>
				<div
					style={{
						width: "80%",
						height: "20px",
						backgroundColor: "#9ba3eb",
						margin: "7vh 0px 3vh 0px",
					}}
				></div>
				<div
					style={{
						width: "90%",
						height: "80%",
						display: "flex",
					}}
				>
					<div
						style={{
							width: "50%",
							borderTop: "0px",
							borderLeft: "0px",
							borderBottom: "0px",
							borderRight: "5px #9ba3eb dotted",
							borderStyle: "solid dotted solid solid",
							color: "#151457",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							fontSize: "30px",
						}}
					>
						버린 쓰레기 종류
						<div
							style={{
								width: "80%",
								height: "70px",
								marginTop: "10px",
								backgroundColor: "white",
								borderRadius: "10px",
							}}
						></div>
						<ApexChart
							type="pie"
							width={380}
							series={[44, 55, 13, 43, 22]}
							options={{
								chart: {
									width: 380,
									height: 400,
									type: "pie",
								},
								labels: ["플라스틱", "철", "종이", "박스", "유리"],
								responsive: [
									{
										breakpoint: 480,
										options: {
											chart: {
												width: 200,
											},
											legend: {
												position: "bottom",
											},
										},
									},
								],
							}}
						/>
					</div>
					<div
						style={{
							width: "50%",
							color: "#151457",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							fontSize: "26px",
						}}
					>
						<p>오늘 주운 쓰레기로 </p>
						<p>늘어난 빙하 면적</p>
						<img
							src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAV1BMVEVHcEz95AD74wD74gD85QD64QD74QD74QD74QD74wD74gD74wD74gD74QA8Hh44Gh7y2AFGKRx8YBRfQhjgxgSegw6tkwyOchFTNhprThbGrAjTuQa5nwoG7ISxAAAADXRSTlMABzOdD97t9x1zuzo+dvp0aAAAAvJJREFUWMOtl4myqjAMQBEBL3pp0339/+98bQFFKNyiLzMyzmhOs5EmVZWkqft7exsK5dbe+7qpXnKpr12xdiIMt+5aX2b9pm+HD6Ttm1m/+0Q/GDESLh/qB+n66EXdfqofglkHB67DF3Jtqrr7BtDVVf/MH5x5zE701X34Su7VhyGczWirgwqEl+wnotrVdVJRw7RmhirpdhlZAHCrGCHoKYQwZTkcAOBNXZqF8lOMzCG2FnDJEEY5wUzyPwFgKToQauEYAFKjQ9ESjgAgCPpDiIB9QIH+hvAGkAX60Ys9gGOoSJjLA4CiQqGQBXiNCwHaZwHJAE2TmJBNQ1NI2OiYSdXJxizTHMCxaICfXj9JKAcVdDS3JBah5QYjyh1ZRaFapYB6ywduPSUyvJDhPAZcR4ADE/Rh/BeRGYDC04snBhk0jPM2hnUCGAf0qY+Q2gKA4rlQBokRVqAo92QBkC99/MrDDgBrD4Y4zl6AGKY5TwWAcLrGMoTxBQihnSslBxjeXRCDVcqDXQCEBG4mQCYGg0ALALOTXSwCME5Z0HawejeIg5wcTAAKTiilLAgDEL6ZEESDDR+TjReluC6k9LqK4IFA4VwKlkF03gZWLCSAWJeRlCllNVe6YsiohCOKEiqCUE1jWZL0RIGfA9g5SWT6zF9J7PBjl09PvHyfl/1AHfUTvOxJOw1lTtKZdvDe0iw73ZBWXdnrAn17dC94dlJ/czNZgw4aGybU/XU3crXbGkNBC15wve/cjjhUmN27nd9vK4m3Z2NkhIWyAQMUfqqNEnq18A6yU1IGwNkUMCWlUEJIbx3fnZIyADcNJB6G4wFrc7XNI0Kqd8ULhrysBanxMQ+FA+N2Tgwt8Pj41ZzYboYkUn58nFQ3s7IThcfDOCv3p7atVcnFaf3RZX8ppHSP7zeW6rfds2+1YGRsbB97W1uZQ+PW9vHeGCLY/J/NNXjxez1tRHf9vSzW7+YRtvfuVihd2N4fy+09IZqfE9I8T/8HxHrZ6Vi0v8gAAAAASUVORK5CYII="
							width="30%"
							style={{ border: "none", marginRight: "10px" }}
						/>
						<div style={{ fontSize: "20px", display: "flex" }}>
							지구에 당신이
							<p style={{ color: "red" }}>&nbsp; 오백만명&nbsp;&nbsp; </p>{" "}
							있다면?
						</div>
						<div
							style={{
								backgroundColor: "yellow",
								width: "90%",
								height: "50px",
							}}
						></div>
						<ApexChart
							type="pie"
							width={380}
							height={150}
							series={[44, 55, 13, 43, 22]}
							options={{
								chart: {
									width: 380,
									height: 400,
									type: "pie",
								},
								labels: ["플라스틱", "철", "종이", "박스", "유리"],
								responsive: [
									{
										breakpoint: 480,
										options: {
											chart: {
												width: 200,
											},
											legend: {
												position: "bottom",
											},
										},
									},
								],
							}}
						/>
					</div>
				</div>
			</Wrapper>
		</>
	);
}

export default Result;
