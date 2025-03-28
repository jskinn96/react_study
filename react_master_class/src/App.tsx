import { motion } from "framer-motion";
import styled from "styled-components";
import RainText from "./framerStudy/rainKorean";

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background:linear-gradient(135deg,#e09,#d0e);
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const myVars = {
  start: { scale: 0 },
  end: { scale: 1, rotateZ: 360, transition: { type: "spring", delay: 0.5 } }
};

const Test1 = () => {

  return (
    <Box
      variants={myVars}
      initial="start"
      animate="end"
    />
  );
}

const Box2 = styled(motion.div)`
  width: 200px;
  height: 200px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Circle = styled(motion.div)`
  background-color: white;
  width: 70px;
  height: 70px;
  border-radius: 100%;
  place-self: center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const test2box = {
  start: {
    opacity: 0,
    scale: 0.5,
  },
  end: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      duration: 0.5,
      bounce: 0.5,
      delay: 0.5,
      delayChildren: 0.75,
      staggerChildren: 0.2,
    }
  }
}

const test2circle = {
  start: {
    opacity: 0,
    y: 10,
  },
  end: {
    opacity: 1,
    y: 0,
  }
}

const Test2 = () => {

  return (
    <Box2 variants={test2box} initial="start" animate="end">
      <Circle variants={test2circle} />
      <Circle variants={test2circle} />
      <Circle variants={test2circle} />
      <Circle variants={test2circle} />
    </Box2>
  );
}

const test3box = {
  click: {
    scale: 1,
    borderRadius: "100px"
  },
  hover: {
    scale: 1.5,
    rotateZ: 360
  }
}

const Test3 = () => {

  return (
    <Box
      drag 
      variants={test3box}
      whileHover="hover"
      whileTap="click"
    />
  );
}

function App() {

  return (
    <Wrap>
      <Test3 />
    </Wrap>
  );
}

export default App;