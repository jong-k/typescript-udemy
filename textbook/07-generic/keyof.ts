// 5. keyof 제약조건
// 문자 그대로 extends 하는 제네릭 타입이 keyof 뒤에 오는 제네릭 타입의 key임을 명시
// U extends keyof T 같은 패턴으로 사용되어, 매개변수가 (객체:T, 객체의 키값:U) 형태일때 유용하게 사용
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
  return obj[key]; // 실제로 이 key가 obj에 있는지 알 수 없기 때문에 에러 발생
}

console.log(extractAndConvert({name: 'God'}, 'name')); // God