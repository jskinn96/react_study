import { AnimatePresence, motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { relative } from "path";

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background:linear-gradient(135deg,#e09,#d0e);
  overflow: hidden;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 50vw;
  gap: 20px;
`;

const Box = styled(motion.div)`
  height: 300px;
  background-color: rgba(255,255,255,.5);
  border-radius: 10px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Btn = styled(motion.button)`
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
  color: blue;
  cursor: pointer;
`;

const Circle = styled(motion.div)`
  width: 100px;
  height: 100px;
  background-color: white;
  border-radius: 50%;
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;   
`;


const BtnVariants = {
  start: (isClicked: boolean) => ({
    scale: !isClicked ? 1 : 1.5,
    color: !isClicked ? "blue" : "red",
  }),
}

const overlay = {
  hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
  visible: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  exit: (id: string | null) => ({
    backgroundColor: "rgba(0, 0, 0, 0)",
    transformOrigin:
      id === "1" ? "bottom right" :
        id === "2" ? "bottom left" :
          id === "3" ? "top right" :
            id === "4" ? "top left" : "",
  }),
};

function App() {

  const [isClicked, setClicked] = useState(false);
  const [id, setId] = useState<string | null>(null);

  return (
    <Wrap>
      <Grid>
        {["1", "2", "3", "4"].map((el) => {

          let tranfromSetting;
          switch (el) {
            case "1": tranfromSetting = "bottom right"; break;
            case "2": tranfromSetting = "bottom left"; break;
            case "3": tranfromSetting = "top right"; break;
            case "4": tranfromSetting = "top left"; break;
          }

          return (
            <Box
              key={el}
              whileHover={{
                scale: 1.1
              }}
              style={{
                transformOrigin: tranfromSetting
              }}
              onClick={() => setId(el)}
              layoutId={el}
            >
              {
                (el === "2" && !isClicked) || (el === "3" && isClicked)
                  ? <Circle
                    layoutId="circle"
                  />
                  : null
              }
            </Box>
          );
        })}
      </Grid>
      <AnimatePresence
        custom={isClicked}
      >
        <div
          style={{
            marginTop: "40px"
          }}
        >
          <Btn
            custom={isClicked}
            variants={BtnVariants}
            initial="start"
            animate="start"
            transition={{
              delay: .2
            }}
            onClick={() => setClicked(val => !val)}
          >Switch</Btn>
        </div>
      </AnimatePresence>
      <AnimatePresence
        custom={id}
      >
        {id ? (
          <Overlay
            variants={overlay}
            onClick={() => setId(null)}
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={id}
          >
            <Box layoutId={id} style={{ width: 400, height: 300, backgroundColor: "#fff" }} />
          </Overlay>
        ) : null}
      </AnimatePresence>
    </Wrap>
  );
}

export default App;