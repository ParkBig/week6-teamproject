export const RESP = {
  LOGIN: {
    success: true,
    data: ["로그인 성공!"],
    error: null,
  },

  SIGNUP: {
    success: true,
    data: "회원가입성공",
    error: null,
  },

  POSTS: {
    success: true,
    data: "게시글 작성 완료",
    error: null,
  },

  POSTEDIT: {
    success: true,
    data: "게시글 수정 완료",
    error: null,
  },

  POSTDELETE: {
    success: true,
    data: "게시글 삭제 완료",
    error: null,
  },

  ALLPOSTS: {
    success: true,
    data: [
      {
        postId: 1,
        nickName: "nick",
        exercise: "운동",
        time: "운동시간",
        date: "운동일자",
      },
      {
        postId: 2,
        nickName: "john",
        exercise: "운동",
        time: "운동시간",
        date: "운동일자",
      },
      {
        postId: 3,
        nickName: "john",
        exercise: "운동",
        time: "운동시간",
        date: "운동일자",
      },
    ],
  },

  DETAILPOSTS: {
    success: true,
    data: {
      postId: 1,
      nickName: "nick",
      content: "내용입니다",
      exercise: "운동",
      time: "운동시간",
      date: "운동일자",
    },
    commentResponseDtoList: [
      {
        commentId: 1,
        comment: "나도 반가워요",
        nickName: "jin",
        createAt: new Date().valueOf(),
      },
      {
        commentId: 2,
        comment: "반가워요!",
        nickName: "yuri",
        createAt: new Date().valueOf(),
      },
    ],
    error: null,
  },
  POSTCOMMENTS: {
    success: true,
    data: ["댓글작성완료"],
    error: null,
  },
  DELETECOMMENTS: {
    success: true,
    data: ["댓글삭제완료"],
    error: null,
  },
};

export default RESP;
