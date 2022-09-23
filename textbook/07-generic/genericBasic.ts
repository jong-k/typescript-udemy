// 제네릭은 자바스크립트에는 없지만, 자바나 C 같은 다른 프로그래밍 언어에는 존재하는 개념이다
// 1. 제네릭이란?
// 제네릭은 배열 타입과 비슷한 개념이다 (내장 제네릭 타입)
// 배열의 그 자체로 타입이면서, 원소가 sting이 오면 string[], number가 오면 number[] 타입이 된다

// 이처럼 제네릭은 다른 타입이 어떤 타입이어야 하는지에 대해서 신경쓰지 않는다 (배열에 문자열이 오건, 숫자가 오건, bool값이 오건)
// 원소 여부만 체크함

// 제네릭 -> Array<string>으로 string[]처럼 배열의 타입을 지정하는 것과 같음
// Array<T> 형태로 사용
const names: Array<string> = ['Max', 'King']; // 예시 1
const hybrid: Array<string | number> = ['one', 2];  // 예시 2

// 또다른 내장 제네릭 타입 -> 프로미스
// 프로미스가 resolve 될지 몰라서 무엇을 리턴할지 모르지만, 제네릭을 이용해 string을 리턴할 것임을 명시
const promise: Promise<string> = new Promise((resolve, reject) => { // TS의 프로미스 타입을 지님
  setTimeout(() => {
    resolve('This is done!');
  }, 2000);
});

// 에러 발생 예시
// promise.then(data => {
//   data.toFixed(2); // 에러 발생: 위에서 제네릭으로 string이 리턴될 것이라고 명시했기 때문에, string에 쓸 수 없는 메서드 사용 불가
// });