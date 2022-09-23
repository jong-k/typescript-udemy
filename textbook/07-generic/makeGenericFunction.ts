// 2. 제네릭 함수 생성하기
function merge(objA: object, objB: object) {
  return Object.assign(objA, objB); // assign 함수로 두 객체를 병합
}
// console.log(merge({name: 'King'}, {age: 30})); // {name: 'King', age: 30}
const mergedObj = merge({name: 'King'}, {age: 30});
// console.log(mergedObj.name); 에러 발생 : 접근 불가 -> 어떤 프로퍼티 타입이 있는지 정확히 몰라서
// mergedObj 뒤에 타입 캐스팅으로 as {name: string,  age: number} 라고 붙여주면 가능하지만, 번거로움

// 이를 해결하기 위해 제네릭을 사용
// T 대신 다른걸 써도 상관없으나 관례상 사용
function merge1<T, U>(objA: T, objB: U) {
  return Object.assign(objA, objB); // T & U (인터섹션)를 반환한다고 추론 -> 서로 다른 타입이 될 수도 있음을 TS에게 알려줌
}
const mergedObj1 = merge1({name: 'King'}, {age: 30});
console.log(mergedObj1.age); // 정상적으로 잘 출력됨

const mergedObj2 = merge1({name: 'son', hobbies: ['soccer']}, {score: 100});
console.log(mergedObj2.hobbies); // 정상적으로 잘 출력됨