// 4. 다른 제네릭 함수
// 인터페이스(또는 타입도 가능)를 통해 타입을 미리 설정
interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = 'Got no value';
  if (element.length === 1) {
    descriptionText = 'Got 1 element.';
  } else if (element.length > 1) {
    descriptionText = 'Got ' + element.length + ' elements.';
  }
  return [element, descriptionText];
}

console.log(countAndDescribe('Hi There!'));
console.log(countAndDescribe(['no more candy', 'no more sugar']));