// 인터페이스
// 1. 인트로
// 인터페이스는 객체의 구조를 설명

// 2. 클래스와 인터페이스 사용하기
// 커스텀 타입 대신 인터페이스 사용하거나 그 반대도 가능
// 하지만, 인터페이스는 객체의 구조를 설명하기 위해서만 사용

// 또한 커스텀 타입으로 가능한 작업도 클래스 내에 인터페이스를 구현하여 사용하는 경우가 많다
// 그 이유는, 인터페이스를 클래스가 이행하고 준수해야 하는 약속처럼 사용할 수 있기 때문

interface Person { // 클래스와 마찬가지로 첫 글자는 대문자로 시작
  name: string; // 값을 할당할 수는 없다
  age: number; // 세미콜론으로 연결한다
  
  greet(phrase: string): void; // 메서드 형태도 정의 가능
}

// type으로 바꿔도 문제 없음
type Person1 =  {
  name: string;
  age: number;
  
  greet(phrase: string): void;
}


let user1: Person;

user1 = {
  name: 'Kim',
  age: 30,
  greet(phrase: string) {
    console.log(phrase + ' ' + this.name);
  }
};

user1.greet("Hi there! I'm");

// type으로 바꿔도 문제 없음
let user2: Person1;

user2 = {
  name: 'Kim',
  age: 30,
  greet(phrase: string) {
    console.log(phrase + ' ' + this.name);
  }
};

user2.greet("It's same!");

// 3. 인터페이스를 사용하는 이유
// interface로 Greetable를 선언하고 클래스에서 이를 implements한다면,
// 해당 클래스는 반드시 greet 메서드를 가져야 한다

// 4. readonly 프로퍼티
// interface에 readonly 키워드를 사용할 수 있다 (public 또는 private은 사용 불가)

interface Greetable { // 인터페이스
  readonly name: string; // readonly 적용 가능
  greet(phrase: string): void;
}
// implements 키워드로 인터페이스를 클래스가 이행하고 준수해야 하는 약속처럼 사용
class Person implements Greetable { // 콤마로 여러 인터페이스를 사용 가능
  name: string;
  
  constructor(n: string) {
    this.name = n;
  }
  
  greet(phrase: string) {
    console.log(phrase + ' ' + this.name);
  }
}

const p1 = new Person('sammy');
p1.greet('haha');
p1.name = 'sharp'