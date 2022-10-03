import { motion } from "framer-motion";
import styled from "styled-components";
import ApexChart from "react-apexcharts";
import { useState, useEffect } from "react";
import axios from "axios";
import { BooleanKeyframeTrack } from "three";
import { useNavigate } from "react-router-dom";


const Wrapper = styled(motion.div)`
	position: relative;
	top: 2vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: rgba(255, 255, 255, 0.8);
	border-radius: 5vh;
	width: 77vw;
	height: 88vh;

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
	const [resultData, setResultData] = useState([]);
	const [trashType, setTrashType] = useState([]);
	const [trashCount, setTrashCount] = useState([]);
	const [iceImgSrc, setIceImgSrc] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		axios.get("https://j7d107.p.ssafy.io/api/todayresult").then((response) => {
			setResultData(response.data);
			setTrashType(response.data.trashType)
			setTrashCount(response.data.trashCount)

			if(response.data.ice_2030 >= 12.443) setIceImgSrc("/assets/ice/빙하1.png")
			else if(response.data.ice_2030 >= 7.667) setIceImgSrc("/assets/ice/빙하2.png")
			else if(response.data.ice_2030 >= 3.52) setIceImgSrc("/assets/ice/빙하3.png")
			else setIceImgSrc("/assets/ice/빙하4.png")
			
			
			console.log(response.data)
			console.log(trashType)
			console.log(trashCount)
		});
	}, []);

	return (
		<>
			<Wrapper>
				<div
					style={{
						width: "90%",
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
							fontSize: "50px",
						}}
					>
						오늘 주운 쓰레기 종류
						<div
							style={{
								width: "80%",
								height: "80px",
								marginTop: "40px",
								marginBottom: "40px",
								backgroundColor: "white",
								borderRadius: "10px",
								display: "flex",
								justifyContent: "space-around",
								alignItems: "center"
							}}
						>
							<img src="http://j7d107.p.ssafy.io/images/plastic.jpg" style={{ width: '68px', height: '74px', opacity: trashType.find((trash) => trash === "플라스틱") ? 1 : 0.3}}/>
							<img src="http://j7d107.p.ssafy.io/images/metal.png" style={{ width: '68px', height: '74px', opacity: trashType.find((trash) => trash === "철") ? 1 : 0.3}}/>
							<img src="http://j7d107.p.ssafy.io/images/paper.png" style={{ width: '68px', height: '74px', opacity: trashType.find((trash) => trash === "종이") ? 1 : 0.3}}/>
							<img src="http://j7d107.p.ssafy.io/images/cardboard.png" style={{ width: '68px', height: '74px', opacity: trashType.find((trash) => trash === "박스") ? 1 : 0.3}}/>
							<img src="http://j7d107.p.ssafy.io/images/glass.png" style={{ width: '68px', height: '74px', opacity: trashType.find((trash) => trash === "유리") ? 1 : 0.3}}/>
							<img src="http://j7d107.p.ssafy.io/images/trash.png" style={{ width: '68px', height: '74px', opacity: trashType.find((trash) => trash === "일반쓰레기") ? 1 : 0.3}}/>
						</div>
						{trashType && <ApexChart
							type="pie"
							width={450}
							series={trashCount}
							options={{
								chart: {
									width: 380,
									height: 400,
									type: "pie",
								},
								labels: trashType,
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
								legend: {
									position: 'bottom'
								},
								colors: ['#bebada', '#fb8072', '#80b1d3', '#fdb462', '#b3de69', '#ffed6f']
							}}
						/>}
					</div>
					<div
						style={{
							width: "50%",
							borderTop: "0px",
							borderLeft: "0px",
							borderBottom: "0px",
							color: "#151457",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							fontSize: "30px",
						}}
					>
						<p>오늘 주운 쓰레기로 늘어난 빙하 면적</p>
						<img
							src={iceImgSrc}
							width="40%"

						/>
						<div style={{ fontSize: "22px", display: "flex", marginTop: "10px", color: "black"}}>
							전 세계 인구가 한달동안 오늘처럼 진행한다면?
						</div>
						<div
							style={{
								width: "90%",
								height: "80px",
								textAlign: "center",
								marginBottom: "20px", 
								color: "black"
							}}
						>
							<div style={{fontSize: "16px", float: "left", width: "33%", padding: "10px"}}>
								<p>2030년에 지구온도</p>
								<span style={{color: "#3CB371"}}>{resultData.temperature_2030}도 </span>
								<span>감소</span>
							</div>
							<div style={{fontSize: "16px", float: "left", width: "33%", padding: "10px"}}>
								<p>2030년에 이산화탄소</p>
								<span style={{color: "#3296D7"}}>{resultData.co2_2030}% </span>
								<span>감소</span>
							</div>
							<div style={{fontSize: "16px", float: "left", width: "33%", padding: "10px"}}>
								<p>2030년에 빙하무게</p>
								<span style={{color: "#96A5FF"}}>{resultData.ice_2030}% </span>
								<span>증가</span>
							</div>
						</div>
						<ApexChart
							type="line"
							width={380}
							series= {[
							  {
								name: "빙하 무게 감소량",
								data: resultData.ice_mass
							  },
							  {
								name: "지라포밍 빙하 무게 감소량",
								data: resultData.ice_mass_predict
							  },
							]}
							options={{
								xaxis: {
									categories: resultData.year,
								},
								yaxis: {
									show: true,
									labels: {
										formatter: function(val, index) {
										  return val.toFixed(0);
										}
									}
								},
								stroke: {
									curve: 'smooth',
									width: 1,
								},
								tooltip: {
									y: {
									  formatter: (value) => `${value.toFixed(2)}Gt`,
									},
								},
								markers: {
									size: 1,
								},
								colors: ['#80b1d3', '#0080ff']
							}}
						/>
					</div>
					<div>
						<img
							src="/assets/ice/star.png"
							style={{
								position: "fixed",
								width: "6vw",
								right: "60px",
								bottom: "45px",
								zIndex: "10",
								cursor: "pointer"
							}}
							onClick={() => {
								navigate("/campaign");
							}}
							alt=""
						/>
					</div>
					
				</div>
			</Wrapper>
		</>
	);
}

export default Result;
