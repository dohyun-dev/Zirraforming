import axios from "axios";
import { motion } from "framer-motion";
import { Suspense } from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Urls from "../apis/Urls";
import Navbar from "../components/Navbar";
import Article from "../components/news/Article";
// import { CanvasWrap } from "../items/CanvasWrpper";

const NewNav = styled(Navbar)`
  position: sticky;
  margin-bottom: 10px;
`;

const CanvasWrap = styled.div`
  width: 100%;
  /* height: 100vh; */

  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("/assets/bg/space.jfif");
  background-position: center center;
  background-size: cover;
  color: ${(props) => props.theme.lightWhite};
  font-family: "Black Han Sans";
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (${(props) => props.theme.tablet}) {
    width: 98%;
  }
  @media screen and (${(props) => props.theme.mobile}) {
    width: 98%;
  }
`;

const GridWrapper = styled(motion.div)`
  margin: 40px 0px;
  border-radius: 40px;
  padding: 30px;
  width: 80vw;
  min-width: 500px;
  max-width: 700px;

  height: auto;
  background-color: #e8e8e8;

  .grid {
    display: grid;
    min-height: 450px;
    color: black;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto auto 400px;
    grid-gap: 0px;
    .title {
      font-size: 32px;
      font-family: SBAggroB;
    }

    .border {
      background-color: #d8dee7;
      border-radius: 3px;

      height: 5px;
    }

    .categorys {
      padding: 10px;
      display: flex;

      .button {
        display: flex;
        align-items: center;
        font-family: SBAggroB;
        padding: 5px;
        border-radius: 5px;
        margin: 0px 2px;
        font-size: 14px;
        font-family: GmarketSansMedium;
        transition: all linear 0.5s;
        cursor: pointer;

        :hover {
          font-family: GmarketSansMedium;
          margin: 0px 2px;
          padding: 5px;
          background-color: #43b262;
          border-radius: 5px;
          color: white;
        }
      }

      .button.isnow {
        font-family: GmarketSansMedium;
        margin: 0px 2px;
        padding: 5px;
        background-color: #43b262;
        border-radius: 5px;
        color: white;
      }
    }

    .cards {
      /* background-color: red; */
      padding: 5px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: 150px;
      grid-gap: 30px;
      overflow: scroll;
      grid-auto-flow: row;
      grid-auto-rows: 150px;

      ::-webkit-scrollbar {
        height: 100%;
        width: 10px;
        background-color: none;
      }
      ::-webkit-scrollbar-thumb {
        background-color: #d8dee7;
        border-radius: 10px;
      }
    }
  }
`;

function News() {
  const [isNow, setIsNow] = useState(1);
  const [articles, setArticles] = useState([]);
  const cate = [
    "대기오염 지구온난화",
    "해양오염 수질오염",
    "토양오염 폐기물",
    "이상기후",
  ];
  const handleNow = (idx) => {
    setIsNow(idx);
  };
  useEffect(() => {
    axios.get(Urls.news(isNow)).then(({ data }) => {
      console.log(data);
      setArticles(data);
    });
  }, [isNow]);
  return (
    <>
      <Navbar />
      <CanvasWrap>
        <GridWrapper>
          <div className="grid">
            <div className="title">오늘의 환경뉴스</div>
            <div className="border"></div>
            <div className="categorys">
              <Suspense fallback={null}>
                {cate.map((ca, idx) => {
                  console.log(idx + 1 === isNow);
                  return (
                    <div
                      onClick={() => setIsNow(idx + 1)}
                      className={idx + 1 === isNow ? "button isnow" : "button"}
                    >
                      {ca}
                    </div>
                  );
                })}
              </Suspense>
            </div>
            <div></div>
            <div className="cards">
              {articles.map((data, idx) => {
                return (
                  <Article
                    key={idx}
                    images={data.imageLink}
                    title={data.title}
                    link={data.link}
                    des={data.content}
                  ></Article>
                );
              })}
            </div>
          </div>
        </GridWrapper>
      </CanvasWrap>
      ;
    </>
  );
}

export default News;
