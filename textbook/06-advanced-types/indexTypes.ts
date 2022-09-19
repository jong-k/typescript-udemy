// 5. 인덱스 속성(타입)
// 객체가 지닐 수 있는 속성을 유연하게 나타내고 싶을 때
// 여러 입력창에서 어떤 결과인지를 확인하기 위한
// 입력에 따른 유효성 검사를 위해 에러 메시지를 다양하게 보유하고 싶을 떄


interface ErrorContainer { // { email: 'Not a valid email!', username: 'Must start with a capital character!'}
                           // 실제 객체는 for in ... 구문을 활용하여 사용
  [prop: string]: string; // 모든 키값과 밸류값이  string 이어야 함
  // key 또는 prop 처럼 마음대로 식별자를 사용해도 됨
}

const errorBag: ErrorContainer = {
  1: 'Not a valid email!',
  2: 'Must start with a capital character!'
};

// 프로퍼티의 키값과 밸류값의 타입을 한번에 지정할 수 있는 장점?