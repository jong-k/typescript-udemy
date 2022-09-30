// 4. 다른 제네릭 함수
// 인터페이스(또는 타입도 가능)를 통해 타입을 미리 설정
interface Lengthy {
  length: number; // 프로퍼티로 length를 가지는 Lengthy 인터페이스(타입을 정의하는 객체)
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = 'Got no value';
  if (element.length === 1) { // Lengthy 인터페이스의 프로퍼티로 length가 숫자로 존재한다는 것을 알려줬기 때문에 에러 발생 X
    descriptionText = 'Got 1 element.';
  } else if (element.length > 1) {
    descriptionText = 'Got ' + element.length + ' elements.';
  }
  return [element, descriptionText];
}

console.log(countAndDescribe('Hi There!'));
console.log(countAndDescribe(['no more candy', 'no more sugar']));