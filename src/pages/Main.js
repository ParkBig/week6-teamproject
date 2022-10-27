import MainForm from "../components/MainForm";
import MainContents from "../components/MainContents"
import styled from "styled-components";
import { motion } from "framer-motion";
import dumbbell from "../img/icons8-dumbbell-50.png"
import { useNavigate } from "react-router-dom";

const Wrap = styled.div`
  background-color: #a4b0be;
`;
const Top = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
  border: 2px solid;
  background-color: #2f3542;
`;
const Dumbbell = styled.img`
  width: 200px;
  height: 200px;
`;
const LogOut = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LogOutBtx = styled.button`
  width: 150px;
  height: 40px;
  position: relative;
  top: 50px;
  border-radius: 15px;
  background-color: gray;
  color: aliceblue;
  font-size: 25px;
`;
const More = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #f1f2f6;
  font-weight: 900;
  font-size: 70px;
`;
const Form = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
`;
const Contents = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
`;

const Main = () => {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    alert("로그아웃")
    navigate("/")
  }
  return (
    <Wrap>
      <Top>
        <div style={{display:"flex", gap:"70px", marginLeft:"260px"}}>
          <Dumbbell src={dumbbell}/>
          <Dumbbell src={dumbbell}/>
          <More>
            MORE
          </More>
          <Dumbbell src={dumbbell}/>
          <Dumbbell src={dumbbell}/>
          <LogOut>
            <LogOutBtx onClick={logOut}>LogOut</LogOutBtx>
          </LogOut>
        </div>
      </Top>
      <Form>
        <MainForm/>
      </Form>
      <Contents>
        <MainContents />
      </Contents>
    </Wrap>
  );
}

export default Main;
