import { keyframes } from "styled-components";
import { motion } from "framer-motion";

export const WrapVar = {
  start: {
    opacity: 0,
    y: 10,
  },
  end: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 5,
      delayChildren: 1.5,
      staggerChildren: 1.5,
    },
  },
};

export const hoverUpDown = keyframes`
  0% {
    scale: 1;
  }

  100% {
    scale: 1.2;
  }
`;

const Wrapper = (props) => {
  return <span className="word-wrapper">{props.children}</span>;
};

const tagMap = {
  paragraph: "p",
  heading1: "h1",
  heading2: "h2",
};

export const AnimatedCharacters = (props) => {
  const item = {
    hidden: {
      y: "200%",
      color: "#487EB0",
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.85 },
    },
    visible: {
      y: 0,
      color: "#FFF",
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.75 },
    },
  };

  const splitWords = props.item.text.split(" ");
  const words = [];

  for (const [, item] of splitWords.entries()) {
    words.push(item.split(""));
  }
  words.map((word) => {
    return word.push("\u00A0");
  });

  const Tag = tagMap[props.item.type];
  console.log(Tag);
  return (
    <Tag>
      {words.map((word, index) => {
        return (
          <Wrapper key={index}>
            {words[index].flat().map((element, index) => {
              return (
                <span
                  style={{
                    overflow: "hidden",
                    display: "inline-block",
                  }}
                  key={index}
                >
                  <motion.span
                    style={{ display: "inline-block", position: "relative" }}
                    variants={item}
                  >
                    {element}
                  </motion.span>
                </span>
              );
            })}
          </Wrapper>
        );
      })}
    </Tag>
  );
};
