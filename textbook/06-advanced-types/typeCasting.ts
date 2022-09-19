// 4. 형 변환
// 타입스크립트가 감지하지 못하는 '타입의 변화'를 명시적으로 표현해주는 것

// index.html에 아래 등장하는 element들이 추가된 상태
const paragraph1 = document.querySelector('p');
// const paragraph: HTMLParagraphElement | null -> null 일 수도 있다고 typescript도 알고 있음
// !를 표현식 뒤에 붙이면 null이 아니라고 선언 가능

const paragraph2 = document.getElementById('message-output')!;
// const paragraph2: HTMLElement -> 그냥 단순한 element로 추측할 뿐
// 정확히 어떤 element인지 탐지 불가 (typescript는 HTML을 정확하게 들여다보지 않음)

const userInputElement = document.getElementById('user-input')!;
// userInputElement.value = 'Hi there!'; // 단순히 HTMLElement가 너무 포괄적이라
// value 속성을 못가지는 element일 수 있어서 에러 발생

// 2가지 방법으로 타입 캐스팅 가능
// 1. 변환하고자 하는 요소 앞에 <타입>을 추가
const userInputElement1 = <HTMLInputElement>document.getElementById('user-input')!;
userInputElement1.value = 'Hi there!';
// 리액트 문법과 충돌 가능

// 2. as + 타입을 뒤에 붙임
const userInputElement2 = document.getElementById('user-input')! as HTMLInputElement;
userInputElement2.value = 'Hi there!';

// 2가지 방법중 하나를 골라 통일하여 설정!