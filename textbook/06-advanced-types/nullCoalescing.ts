// 8. null 병합 연산자(&&)
// 마찬가지로 타입스크립트가 null일지 미리 알 수 없음

const userInput = ''; // 빈 문자열이 필요한데 falsy값이 되버림
const storedData = userInput ?? 'DEFAULT'; // ''
// const storedData = userInput || 'DEFAULT'; // 전통적인 방법으로 하면 DEFAULT
console.log(storedData);