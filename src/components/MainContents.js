import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { axiosInstance, getData } from "../api";
import fire from "../img/icons8-fire-64.png";

const Wrap = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Div = styled(motion.div)`
  width: 1200px;
  height: 550px;
  border: 2px solid;
  border-radius: 15px;
  display: grid;
  place-items: center;
  background-color:#57606f;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 280px;
  overflow: scroll;
  padding: 10px;
  ::-webkit-scrollbar {
    width: 10px;
    height: 0;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #2f3542;
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
  ::-webkit-scrollbar-track {
    background-color: grey;
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }
`;
const Box = styled(motion.div)`
  border: 2px solid;
  border-radius: 15px;
  width: 230px;
  height: 230px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2f3542;
`;
const WrapInnerBox = styled.div`
`;
const ExerciseBox = styled.div`
  width: 170px;
  height: 170px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(../img/icons8-fire-64.png);
`;
const ExerciseText = styled.div`
  display: flex;
  color: white;
  font-size: 20px;
  font-weight: 800;
`;
const DateBox = styled.div`
  width: 150px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  color: white;
`;

const boxVariants = {
  hover : {
    scale : 1.2,
    transition : {
      duration : 0.3
    }
  }
}

const MainContents = () => {
  const { isLoading, data } = useQuery(["allData"], getData);
  return (
    <Wrap>
      <Div>
        {data?.data.map((prop)=> 
          <Box variants={boxVariants} whileHover="hover" key={prop.id}>
            <Link to={`${prop.id}`} style={{textDecoration:"none"}}>
              <WrapInnerBox>
                <ExerciseBox>
                  <img src={fire} />
                  <ExerciseText>
                    {prop.exercise}
                  </ExerciseText>
                </ExerciseBox>
                <DateBox>
                  {prop.date}
                </DateBox>
              </WrapInnerBox>
            </Link>
          </Box>
        )}
      </Div>
    </Wrap>
  );
}

export default MainContents;
