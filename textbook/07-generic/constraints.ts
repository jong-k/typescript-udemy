// 3. 제약 조건 작업하기
// mergedObj2 에서 {score: 100} 대신 숫자 100만 전달하면, 에러 발생없이 조용히 실패한다
// 이러한 실수에 대비해, 제네릭에서는 타입에 제약 조건을 부여하여 에러를 방지할 수 있다

// T와 U는 어떤 구조의 객체인지는 상관없으나, 일단 객체이어야 함
// extends 뒤에는 유니온 타입 및 커스텀 타입을 포함해 어떤 타입이든 올 수 있다
function newMerge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}
// 아래처럼 U 타입 위치에 그냥 숫자가 오면 IDE에서 에러 발생 (30을 객체 타입에 할당 불가)
// const newMergedObj = newMerge({name: 'son', hobbies: ['soccer']}, 100);
