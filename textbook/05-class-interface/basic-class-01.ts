// 1. 클래스란? (w/ OOP) -> README 참조
// 2. 클래스 만들기
// 3. JS로 컴파일하기
// tsconfig.json을 조작하여 es5로 버전을 바꾸면, var 와 생성자 함수로 클래스를 구현

// 4. 생성자 함수 및 this 키워드
class Department { // 클래스는 대문자로 시작
  name: string; // 초기값 지정 안해도 됨
  
  constructor(n: string) {
    this.name = n;
  }
  
  describe() {
    console.log('Department: ' + this.name); // this는 클래스의 인스턴스를 참조
  }
  // 이렇게 바꾸면 accountingCopy 에러 발생
  describe1(this: Department) {
    console.log('Department: ' + this.name); // 이 메서드의 this는 Department를 참조
  }
}

const accounting = new Department('Accounting');
// console.log(accounting); // Department {name: 'Accounting'}, [[prototype]]: object
accounting.describe1(); // Department: Accounting
const accountingCopy = { describe: accounting.describe};
accountingCopy.describe(); // Department: undefined ->
// accountingCopy가 인스턴스가 아니라 그냥 객체 리터럴이기 때문..
// 여기서 this가 이 객체(accountingCopy)를 참조하지 않음

// accountingCopy.describe1(); // 에러 발생 ->
// describe1을 호출하면서 Department의 인스턴스에서 호출한 것이 아니기 때문에 에러 발생
// 즉, this가 Department 타입의 객체를  참조하지 않음
// 이를 고치려면 accountingCopy 선언문에서 객체 리터럴에 name 프로퍼티를 추가하면 됨
