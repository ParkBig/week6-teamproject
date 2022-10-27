import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import styled from "styled-components";
import { formData } from "../api";

const Wrap = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;
const Div = styled(motion.button)`
  width: 500px;
  height: 60px;
  border: 2px solid;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #747d8c;
`;
const FormWrap = styled(motion.div)`
  width: 100%;
  height: 145vh;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const UpperDiv = styled(motion.div)`
  position: absolute;
  top: 81vh;
`;
const Forms = styled.form`
  border: 2px solid;
  border-radius: 15px;
  width: 600px;
  height: 300px;
  background-color: aliceblue;
`;
const FormDiv = styled.div`
  width: 90%;
  height: 30px;
  margin: 10px auto;
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
`;
const DeleteBtn = styled.button`
  margin: 30px 250px;
  width: 110px;
  height: 50px;
  border-radius: 15px;
`;
const TextAreaDiv = styled.div`
  height: 160px;
  margin: 20px auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const TextAreaInput = styled.input`
  height: 160px;
  width: 520px;
  border-radius: 15px;
`;
const Btn = styled.button`
  border-radius: 15px;
  height: 40px;
  width: 100px;
`;
const LowDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const overlay = {
  hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
  visible: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};
const formHover = {
  hover : {
    scale : 1.1,
    transition : {
      duration : 0.2
    }
  }
}

const MainForm = () => {
  const now = new Date();
  const [isTrue, setIsTrue] = useState(false);
  const { mutate } = useMutation(formData, {
    onSuccess: () => {
      alert("오늘의 운동 저장!");
      setIsTrue(prev=>!prev);
    },
    onError: (err)=> {
      console.log(err)
    }
  });
  const presence = (ev) => {setIsTrue(prev=>!prev)}
  const { register, handleSubmit, setValue } = useForm();
  const onSubmit = (data)=> {
    const blob = new Blob(
      [JSON.stringify({
        "content": data.contents,
        "exercise": data.sports,
        "time": data.time,
        "date": `${now.getMonth() + 1}월 ${now.getDate()}일`
      })], { 
        type: "application/json" 
      }
    )
    let formData = new FormData();
    const file = data.picture[0];
    formData.append("file", file);
    formData.append("postRequestDto", blob);
    mutate([formData,{headers: {"Access_Token" : localStorage.getItem("access_token")}}])
    setValue("sports", "");
    setValue("time", "");
    setValue("contents", "");
    setValue("picture", "");
  }
  return (
    <Wrap>
      {isTrue ? null :
        <Div variants={formHover} whileHover="hover" onClick={presence} layoutId="1">
          오늘의 운동을 기록하자!
        </Div>
      }
      <AnimatePresence>
        {isTrue ?
          (<FormWrap 
            variants={overlay} 
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <UpperDiv layoutId="1">
              <Forms onSubmit={handleSubmit(onSubmit)}>
                <FormDiv>
                  <div>
                    <span>오늘의 운동</span>
                    <input {...register("sports")} style={{width:"250px", height:"20px", borderRadius:"15px", marginLeft:"5px"}} placeholder="오늘 한 운동을 적어주세요..." />  
                  </div>
                  <div>
                    <span>운동 시간</span>
                    <input {...register("time")} style={{width:"50px", height:"20px", borderRadius:"15px", marginLeft:"5px"}} placeholder="minutes..." />
                    <span>분</span>
                  </div>
                </FormDiv>
                <TextAreaDiv>
                  <TextAreaInput {...register("contents")} type="text" placeholder="오늘의 운동 내용을 적어보세요!" />
                </TextAreaDiv>
                <LowDiv>
                  <input {...register("picture")} type="file" />
                  <Btn value="ss">기록하기</Btn>
                </LowDiv>
              </Forms>
              <DeleteBtn onClick={()=>setIsTrue(false)}>취소</DeleteBtn>
            </UpperDiv>
          </FormWrap>)
          : null 
        }
      </AnimatePresence>
    </Wrap>
  );
}

export default MainForm;