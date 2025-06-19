//유효성 검사 파일[ID, password]
//ID는 영어로 시작, 6`20자로 결정, 영문+숫자
//비밀번호는 대문자+소문자+숫자+특수문자포함해서 8자이상으로
//regex= 정규표현식




export const useLoginValidation = () => {
  //ID 유효성검사
  //실패하면 에러메세지 반환
  const validateID = (email) => {
    const regex = /^[A-Za-z][A-Za-z0-9]{5,19}$/;
    return regex.test(email) || "아이디는 영문자로 시작하며 6~20자여야 합니다.";
  };

  // 비밀번호 유효성검사
  // 실패하면 에러메세지 반환
  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    return (
      regex.test(password) ||
      "비밀번호는 대소문자, 숫자, 특수문자를 포함한 8자 이상이어야 합니다."
    );
  };

  return { validateID, validatePassword };
};




  