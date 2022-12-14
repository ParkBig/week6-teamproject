import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { postSignUp, postLogIn, axiosIns, iDDupCheck } from "../api";
import dumbbell from "../img/icons8-dumbbell-50.png"

const UpperDiv = styled(motion.div)`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #a4b0be;
`;
const Wrap = styled(motion.div)`
  width: 400px;
  height: 500px;
  border: 2px solid;
  border-radius: 15px;
  margin: auto;
  background-color: #57606f;
`;
const TitleName = styled(motion.div)`
  width: 380px;
  height: 120px;
  margin: auto;
  margin-top: 10px;
  border: 2px solid;
  border-radius: 15px;
  text-align: center;
  display : flex;
  justify-content : center;
  align-items : center;
  background-color: #2f3542;
`;
const Dumbbell = styled.img`
  width: 120px;
  height: 120px;
`;
const More = styled.div`
  color: #f1f2f6;
  position: relative;
  font-weight: 800;
  font-size: 25px;
  bottom: 25px;
`;
const IdPassword = styled(motion.div)`
  width: 360px;
  height: 40px;
  margin: 20px auto 10px auto;
  text-align: center;
  display : flex;
  justify-content : center;
  align-items : center;
  color : #f1f2f6;
  font-size: 22px;
  font-weight: 900;
`;
const InputDiv =styled(motion.div)`
  width: 360px;
  height: 40px;
  margin: auto;
  display: flex;
`;
const Input = styled(motion.input)`
  width: 356px;
  height: 40px;
  margin: auto;
  border: 2px solid;
  border-radius: 15px;
  text-align: center;
`;
const InputId = styled.input`
  width: 260px;
  height: 40px;
  margin: auto;
  border: 2px solid;
  border-radius: 15px;
  text-align: center;
`;
const IdCheck = styled.div`
  width: 80px;
  height: 40px;
  margin: auto;
  border: 2px solid;
  border-radius: 15px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: buttonface;
`;
const UpperLoginSign = styled(motion.div)`
  width: 360px;
  height: 80px;
  margin: auto;
  margin-top: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap:20px;
`;
const LoginSign = styled(motion.button)`
  width: 150px;
  height: 40px;
  border-radius: 15px;
  font-weight: 800;
`;
const Sign = styled.div`
  width: 134px;
  height: 34px;
  border: 2px solid;
  padding: 1px 6px;
  border-radius: 15px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  background-color: buttonface;
  font-weight: 800;
`;
const AssignIdPassword = styled(motion.div)`
  width: 360px;
  height: 40px;
  margin: 20px auto 10px auto;
  text-align: center;
  display : flex;
  justify-content : space-around;
  align-items : center;
  color: #f1f2f6;
  font-size: 22px;
  font-weight: 900;
`;
const UpperAssignBtn = styled(motion.div)`
  width: 360px;
  height: 80px;
  margin: auto;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, getValues } = useForm();
  const { mutate:toSign } = useMutation(postSignUp, {
    onSuccess: () => {
      alert("??????????????? ?????????????????????.");
      setLogIn(true);
    },
    onError: () => {
      alert("??????! ?????? ??????????????????.");
    },
  });
  const { mutate:toLogIn } = useMutation(postLogIn, {
    onSuccess: (res) => {
      localStorage.setItem("access_token", res.headers.access_token);
      localStorage.setItem("refresh_token", res.headers.refresh_token);
      axiosIns.defaults.headers.common['Access_Token'] = `${res.headers.access_token}`;
      navigate("/main");
    },
    onError: (err) => {
      alert("????????? ??????!")
    }
  });
  const [logIn, setLogIn] = useState(true);
  const toSignUp = () => {
    setValue("LogInId", "");
    setValue("LogInPassword", "");
    setLogIn(false) 
  };
  const submitLoginSignUp = (data) => {
    if (logIn) {
      toLogIn({"userId":data.LogInId, "password":data.LogInPassword});
      setValue("LogInId", "");
      setValue("LogInPassword", "");
    } else {
      toSign({"userId":data.Id, "password":data.Password1, "passwordCheck":data.Password2, "nickName":data.NickName});
      setValue("Id", "");
      setValue("Password1", "");
      setValue("Password2", "");
      setValue("NickName", "");
    };
  }
  const { mutate:dupCheck} = useMutation(iDDupCheck, {
    onSuccess: (res)=> {
      if (res.data === "ID??? ?????? ???????????????.") {
        alert("?????? ???????????? ????????? ?????????.")
        setValue("Id");
      } else {
        alert("?????? ????????? ID ?????????.")
      }
    }
  });
  const checkId = () => {
    dupCheck({"userId":getValues("Id")})
  }
  return (
    <UpperDiv>
      {logIn ? (
        <Wrap>
          <TitleName>
            <div>
              <Dumbbell src={dumbbell}/>
              <More>
                MORE
              </More>
            </div>
          </TitleName>
          <form onSubmit={handleSubmit(submitLoginSignUp)}>
            <IdPassword>
              ID
            </IdPassword>
            <InputDiv>
              <Input {...register("LogInId")} placeholder="???????????? ???????????????"/>
            </InputDiv>
            <IdPassword>
              Password
            </IdPassword>
            <InputDiv>
              <Input type="password" {...register("LogInPassword")} placeholder="??????????????? ???????????????"/>
            </InputDiv>
            <UpperLoginSign>
            <LoginSign>
              Log In
            </LoginSign>
            <Sign onClick={toSignUp}>
              Sign Up
            </Sign>
            </UpperLoginSign>
          </form>
        </Wrap>) 
        : 
        (
          <Wrap>
            <form onSubmit={handleSubmit(submitLoginSignUp)}>
              <AssignIdPassword>
                Id
              </AssignIdPassword>
              <InputDiv>
                <InputId {...register("Id", { required: true, pattern : { value : /^(?=.*[a-zA-Z])[-a-zA-Z0-9]{2,10}$/, message:"????????? ???????????? ??????"} })} placeholder="2~10??????, ??????????????? ????????????" />
                <IdCheck onClick={checkId}>
                  ????????????
                </IdCheck>
              </InputDiv>
              <AssignIdPassword>
                Password
              </AssignIdPassword>
              <InputDiv>
                <Input type="password" {...register("Password1", { required: true, pattern : { value : /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{8,20}$/, message:"????????? ???????????? ??????"} })} placeholder="8~20??????, ?????????????????? ??????" />
              </InputDiv>
              <InputDiv style={{marginTop:"15px"}}>
                <Input type="password" {...register("Password2", { required: true, validate : { areSame : (value) => value === getValues("Password1") ? true : "???????????????." } })} placeholder="??????????????? ?????? ??????????????????. " />
              </InputDiv>
              <AssignIdPassword>
                NickName
              </AssignIdPassword> 
              <InputDiv>
                <Input {...register("NickName", {maxLength:10})} placeholder="10????????????" />
              </InputDiv>
              <UpperAssignBtn>
                <LoginSign>
                  Sign Up
                </LoginSign>
              </UpperAssignBtn>
            </form>
          </Wrap>
        )}
    </UpperDiv>
  );
}

export default Login;
