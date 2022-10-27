import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  __deleteCom,
  __postCom,
  __getCom,
} from "../../../store/modules/commentSlice";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Comments = () => {
  const data = useSelector((state) => state.comments.comments);
  const dispatch = useDispatch();
  const { id } = useParams();
  const initialState = {
    id: 0,
    content: "",
    nickName: "",
    createAt: "",
    postId: id,
  };

  const [com, setCom] = useState(initialState);

  // console.log(data);

  useEffect(() => {
    dispatch(__getCom(id));
  }, [dispatch, id]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setCom({ ...com, [name]: value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (com.content === "") {
      alert("내용을 입력하세요");
      return;
    }

    dispatch(__postCom([id, {"content":com.content}]));
    setCom(initialState);
    return;
  };

  const onDeleteHandler = (ids) => {
    dispatch(__deleteCom([id, ids]));
    alert("삭제완료!");
    dispatch(__getCom(id));
  };

  return (
    <AllContainer>
      <InputContainer>
        <InputWcover>
          <InputWriter
            type="text"
            name="content"
            key="createAt"
            value={com.content}
            onChange={onChangeHandler}
          />
        </InputWcover>
        <PbCover>
          <PushButton onClick={onSubmitHandler}>입력</PushButton>
        </PbCover>
      </InputContainer>
      <CommentContainer>
        {data?.map((coms) => {
          // console.log(coms);
          return (
            <div>
              <CommentBox key={coms.id}>
                <CommentStyle>{coms.comment}</CommentStyle>
                <CommentDeleteButton
                  onClick={() => {
                    onDeleteHandler(coms.id);
                  }}
                >
                  삭제
                </CommentDeleteButton>
              </CommentBox>
            </div>
          );
        })}
      </CommentContainer>
    </AllContainer>
  );
};

export default Comments;

const AllContainer = styled.form`
  width: 100%;
  max-width: 1150px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 80px;
  border: 3px solid gray;
  margin-bottom: 5px;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const InputWcover = styled.div`
  width: 100%;
  max-width: 1000px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const InputWriter = styled.input`
  width: 100%;
  max-width: 880px;
  height: 30px;
  border-radius: 30px;
`;

const PbCover = styled.div`
  width: 100%;
  max-width: 100px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const PushButton = styled.button`
  width: 100%;
  max-width: 70px;
  height: 40px;
  font-size: large;
  border: 3px solid lightpink;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  background-color: none;
  cursor: pointer;
`;

const CommentContainer = styled.div`
  width: 100%;
  max-width: 1150px;
  height: 320px;
  border: 3px solid gray;
  display: flex;
  flex-direction: column;

  overflow: auto;
  border-radius: 10px;
`;

const CommentBox = styled.div`
  width: 100%;
  max-width: 1150px;
  height: 50px;
  border-bottom: 1px solid gray;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
`;

const CommentStyle = styled.div`
  width: 100%;
  max-width: 900px;
  height: 45px;
  overflow: auto;
  display: flex;
  align-items: center;
`;

const CommentDeleteButton = styled.div`
  width: 100%;
  max-width: 70px;
  height: 30px;
  border: 3px solid lightpink;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
