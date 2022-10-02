// 인터페이스
// 5. 인터페이스 확장하기

// 6. 함수 타입으로써의 인터페이스
// 아래 함수 타입을 인터페이스로 대체하기 (함수도 객체이기 때문에 가능함)
// type AddFn = (a:  number, b: number) => number;
interface AddFn {
  (a: number, b: number): number; // 무기명 함수
}
let add: AddFn;
add = (n1: number, n2: number) => {
  return n1 + n2;
}

interface Named {
  readonly name: string;
}
// 인터페이스도 상속 가능
interface Greetable extends Named { // Named 인터페이스의 모든 멤버를 정의할 필요는 없음
  greet(phrase: string): void;
}

class Person implements Greetable {
  name: string; // name 프로퍼티가 없으면 에러가 발생
  age = 30;
  
  constructor(n: string) {
    this.name = n;
  }
  
  greet(phrase: string) {
    console.log(phrase);
  }
}