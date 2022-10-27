import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import Comments from "./comments/Comments";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  __deleteDet,
  __detailDet,
  __postDet,
  __editDet,
} from "../../store/modules/detailSlice";

const DetailBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [haveImage, setHaveImage] = useState(true);
  const [edit, setEdit] = useState("");
  const [editing, setEditing] = useState(false);
  const details = useSelector((state) => state.details.detail);
  const imgs = useSelector((state) => state.details.detail.imgResponseDtoList);
  useEffect(() => {
    dispatch(__detailDet(id));
  }, [dispatch, id, details.id]);

  const onEditSubmitHandler = (event) => {
    event.preventDefault();
    if (
      edit.date.trim() === "" ||
      edit.exercise.trim() === "" ||
      edit.time.trim() === "" ||
      edit.content.trim() === ""
    ) {
      alert("내용을 넣어주세요!");
      return;
    }

    if (id) {
      dispatch(__editDet([id, {...edit}]));
      alert("수정끝!");
      navigate(`/main/${id}`);
      setEditing(false);
      return;
    }
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setEdit({ ...edit, [name]: value });
  };

  const onDeleteButtonHandler = () => {
    dispatch(__deleteDet(id));
    alert("삭제완료");
    navigate("/main", { replace: true });
  };
  return (
    <>
      <DetailContainer key={details.id}>
        {haveImage ? (
          <>
            <DetailBoxContainer>
              <DetailBoxOne>
                {editing ? (
                  <>
                    <TextBox>
                      운동일자 :{" "}
                      <TextBoxInPut
                        type="text"
                        name="date"
                        details={details}
                        value={edit?.date}
                        onChange={onChangeHandler}
                      />
                    </TextBox>
                    <TextBox>
                      운동종목 :{" "}
                      <TextBoxInPut
                        type="text"
                        name="exercise"
                        details={details}
                        value={edit?.exercise}
                        onChange={onChangeHandler}
                      />
                    </TextBox>
                    <TextBox>
                      운동시간 :{" "}
                      <TextBoxInPut
                        type="text"
                        name="time"
                        details={details}
                        value={edit?.time}
                        onChange={onChangeHandler}
                      />
                    </TextBox>

                    <CommentBox>
                      <p>코멘트</p>
                      <CommentInBox>
                        <CommentInBoxInPut
                          type="text"
                          name="content"
                          details={details}
                          value={edit?.content}
                          onChange={onChangeHandler}
                        />
                      </CommentInBox>
                    </CommentBox>
                  </>
                ) : (
                  <>
                    <TextBox>운동일자 : {details.date}</TextBox>
                    <TextBox>운동종목 : {details.exercise}</TextBox>
                    <TextBox>운동시간 : {details.time}</TextBox>
                    <CommentBox>
                      <p>코멘트</p>
                      <CommentInBox>{details.content} </CommentInBox>
                    </CommentBox>
                  </>
                )}
              </DetailBoxOne>
              <DetailBoxTwo>
                <ImageBox>{imgs && <img src={imgs[0]?.url} />}</ImageBox>
              </DetailBoxTwo>
            </DetailBoxContainer>
            <ButtonContainer>
              <ButtonStyle
                onClick={(event) => {
                  editing ? onEditSubmitHandler(event) : setEditing(true);
                }}
              >
                {editing ? "완료" : "수정"}
              </ButtonStyle>
              <ButtonStyle onClick={onDeleteButtonHandler}>삭제</ButtonStyle>
            </ButtonContainer>
          </>
        ) : (
          <>
            <DetailBoxContainer>
              <DetailBoxOneC>
                {editing ? (
                  <>
                    <TextBox>
                      운동일자 :{" "}
                      <TextBoxInPut
                        type="text"
                        name="date"
                        details={details}
                        value={edit?.date}
                        onChange={onChangeHandler}
                      />
                    </TextBox>
                    <TextBox>
                      운동종목 :{" "}
                      <TextBoxInPut
                        type="text"
                        name="exercise"
                        details={details}
                        value={edit?.exercise}
                        onChange={onChangeHandler}
                      />
                    </TextBox>
                    <TextBox>
                      운동시간 :{" "}
                      <TextBoxInPut
                        type="text"
                        name="time"
                        details={details}
                        value={edit?.time}
                        onChange={onChangeHandler}
                      />
                    </TextBox>

                    <CommentBox>
                      <p>코멘트</p>
                      <CommentInBox>
                        <CommentInBoxInPut
                          type="text"
                          name="content"
                          details={details}
                          value={edit?.content}
                          onChange={onChangeHandler}
                        />
                      </CommentInBox>
                    </CommentBox>
                  </>
                ) : (
                  <>
                    <TextBox name="date">운동일자 : {details.date}</TextBox>
                    <TextBox name="exercise">
                      운동종목 : {details.exercise}
                    </TextBox>
                    <TextBox name="time">운동시간 : {details.time}</TextBox>
                    <CommentBox>
                      <p>코멘트</p>
                      <CommentInBox name="content">
                        content {details.content}
                      </CommentInBox>
                    </CommentBox>
                  </>
                )}
              </DetailBoxOneC>
            </DetailBoxContainer>
            <ButtonContainer>
              <ButtonStyle
                onClick={(event) => {
                  editing ? onEditSubmitHandler(event) : setEditing(true);
                }}
              >
                {editing ? "완료" : "수정"}
              </ButtonStyle>
              <ButtonStyle onClick={onDeleteButtonHandler}>삭제</ButtonStyle>
            </ButtonContainer>
          </>
        )}
      </DetailContainer>
      <Comments postId={id} />
    </>

  );
};

export default DetailBoard;

const DetailContainer = styled.form`
  max-width: 1200px;
  width: 100%;
  height: 450px;
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const DetailBoxContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 450px;
  display: flex;
  flex-direction: row;
  padding: 20px;
  /* background-color: blue; */
`;
const DetailBoxOneC = styled.div`
  width: 100%;
  max-width: 600px;
  height: 380px;
  /* border: 1px solid blue; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
`;
const DetailBoxOne = styled.div`
  width: 100%;
  max-width: 600px;
  height: 380px;
  /* border: 1px solid blue; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DetailBoxTwo = styled.div`
  width: 100%;
  max-width: 600px;
  height: 380px;
  /* border: 1px solid green; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TextBox = styled.div`
  width: 100%;
  max-width: 500px;
  height: 40px;
  border: 2px solid gray;
  border-radius: 20px;
  /* background-color: gray; */
  display: flex;
  align-items: center;
  justify-content: left;
  margin-bottom: 20px;
  padding: 5px;
`;

const TextBoxInPut = styled.input`
  width: 100%;
  max-width: 400px;
  height: 20px;
  border: 1px solid gray;
  border-radius: 20px;
  display: flex;

  padding: 5px;
`;
const CommentBox = styled.div`
  width: 100%;
  max-width: 500px;
  height: 150px;
  border: 2px solid gray;
  border-radius: 20px;
  padding: 5px;
`;
const CommentInBox = styled.div`
  width: 100%;
  max-width: 480px;
  height: 95px;
  border: 1px solid gray;
  border-radius: 5px;
  display: flex;
  align-items: left;
  margin-left: auto;
  margin-right: auto;
  overflow: auto;
`;
const CommentInBoxInPut = styled.input`
  width: 100%;
  max-width: 480px;
  height: 95px;
  border: 1px solid gray;
  border-radius: 5px;
  display: flex;
  align-items: left;
  margin-left: auto;
  margin-right: auto;
  overflow: auto;
`;

const ImageBox = styled.div`
  width: 100%;
  max-width: 500px;
  height: 300px;
  background-color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const ButtonStyle = styled.div`
  width: 70px;
  height: 30px;
  border: 3px solid lightpink;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
