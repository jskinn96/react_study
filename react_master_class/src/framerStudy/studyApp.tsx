import { AnimatePresence, motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background:linear-gradient(135deg,#e09,#d0e);
  overflow: hidden;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 20%;
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

const BigBox = styled(motion.div)`
  width: 600px;
  height: 600px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.5);
  overflow: hidden;
`;

const Test3 = () => {

  const biggerBoxRef = useRef<HTMLDivElement>(null);

  return (
    <BigBox ref={biggerBoxRef}>
      <Box
        drag
        //g 가운데로 돌아감
        dragSnapToOrigin
        //g 끌어당기는 힘
        dragElastic={0.5}
        //g 드래그 영역
        dragConstraints={biggerBoxRef}
        //g 다양한 형태를 의미
        variants={test3box}
        whileHover="hover"
        whileTap="click"
      />
    </BigBox>
  );
}

const SmallBox = styled(motion.div)`
  width: 50px;
  height: 50px;
  background-color: rgba(20, 60, 120, 1);
`;

const Test4 = () => {

  //g 상태와 속도 추적...리액트 스테이트가 아니기에 리렌더링이 발생하지 않음
  const x = useMotionValue(0);
  const rotateZ = useTransform(x, [-800, 800], [-360, 360]);
  //g 스크롤Y 위치 값(프로그레스는 0-1로 표시)
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], [50, 200]);

  //! 테스트 시, wrap 높이 늘리기

  useEffect(() => {

    x.on("change", () => console.log(x.get()));
  }, [x]);

  return (
    <Box
      drag="x"
      dragSnapToOrigin
      dragConstraints={{ left: -800, right: 800 }}
      style={{
        x,
        rotateZ,
        position: "fixed",
        top: "200px",
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
    >
      <SmallBox
        style={{
          borderRadius: "20%",
          width,
          height: width,
        }}
      />
    </Box>
  );
}

const Svg = styled.svg`
  width: 300px;
  height: 300px;
  path {
    stroke: rgb(255,149,0);
    stroke-width: 2;
  }
`;

const SvgPath = styled(motion.path)`
`;

const Test5 = () => {

  return (
    <Svg
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 90"
    >
      <SvgPath
        initial={{
          pathLength: 0,
          fill: "rgba(255,149,0,0)",
        }}
        animate={{
          pathLength: 1,
          fill: "rgba(255,149,0,1)",
        }}
        transition={{
          duration: 3,
        }}
        d="M86.642 0L122 94.469H0l3.914-11.741L35.494 0h14.44l10.391 28.88L72.201 0h14.44zM49.934 83.942h20.783L66.803 74.9l-6.478-17.139-10.391 26.181zM43.32 9.312l-28.88 74.63h24.966l1.215-1.214 14.44-39.407-3.914-10.527-7.827-23.482zm62.89 74.63l-2.7-9.042-7.827-19.838-7.828-22.268L78.68 9.312 65.59 43.32l15.654 40.621h24.967z"
      />
    </Svg>
  );
}

const SlideBox = styled(motion.div)`
  width: 500px;
  height: 300px;
  font-size: 48px;
  font-weight: 900;
  background-color: rgb(255,149,0);
  position: absolute;
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const slideVariant = {
  start: (isBack: boolean) => ({
    x: isBack ? 500 : -500,
    opacity: 0,
    scale: 0,
  }),
  end: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.3
    }
  },
  leaving: (isBack: boolean) => ({
    x: isBack ? -500 : 500,
    opacity: 0,
    scale: 0,
  })
};

const Slider = () => {

  const [loc, setLoc] = useState(1);
  const [isBack, setBack] = useState(false);

  const nextFunc = () => {
    setBack(false);
    setLoc(val => val >= 10 ? 1 : val + 1)
  };
  const prevFunc = () => {
    setBack(true);
    setLoc(val => val === 1 ? 10 : val - 1);
  }

  /**
   * g key값이 매번 바뀌면 새로운 컴포넌트로 인식하기에 굳이 반복문을 사용해서 컴포넌트를 넣어주지 않아도 됨
   * g custom값을 설정하면 variants 객체에 해당 값을 넣어서 수정 가능(ex: 조건문)
   * g custom값은 AnimatePresence에도 적어야 함
  */
  return (
    <div
      style={{
        position: "relative",
        width: "500px",
        height: "400px"
      }}
    >
      <AnimatePresence
        custom={isBack}
      >
        <SlideBox
          key={loc}
          variants={slideVariant}
          initial="start"
          animate="end"
          exit="leaving"
          custom={isBack}
        >
          {loc}
        </SlideBox>
      </AnimatePresence>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          position: "absolute",
          bottom: "0",
          width: "100%"
        }}
      >
        <button onClick={prevFunc}>prev</button>
        <button onClick={nextFunc}>next</button>
      </div>
    </div>
  );
}

const Box3 = styled(motion.div)`
  width: 400px;
  height: 400px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Circle2 = styled(motion.div)`
  background-color: #00a5ff;
  height: 100px;
  width: 100px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Test6 = () => {

  const [clicked, setClicked] = useState(false);
  const toggleClicked = () => setClicked((prev) => !prev);

  //g layout을 쓰면 자동으로 애니메이션화 해줌
  //g layoutId를 쓰면 같은 layoutId로 지정한 컴포넌트 끼리는 같은 컴포넌트라고 인식함
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around"
      }}
      onClick={toggleClicked}
    >
      <Box3>
        {!clicked ? (
          <Circle2 layoutId="circle" style={{ borderRadius: 50 }} />
        ) : null}
      </Box3>
      <Box3>
        {clicked ? (
          <Circle2 layoutId ="circle" style={{ borderRadius: 0, scale: 2 }} />
        ) : null}
      </Box3>
    </div>
  );
}

function App() {

  return (
    <Wrap>
      <Test6 />
    </Wrap>
  );
}

export default App;