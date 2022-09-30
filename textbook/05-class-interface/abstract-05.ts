// 12. 추상 클래스
// 어떤 한 클래스를 포맷 역할로 사용하고 싶을 때, 이를 추상 클래스로 활용한다
// 추상 클래스와 메서드 앞에는 abstract 키워드를 붙여야 한다
// 추상 클래스는 자체적으로 인스턴스화 할 수 없다
// 상속되는 클래스가 인스턴스 만들 수 있음
abstract class Department12 {
  constructor(protected employees: string[]) {
  }
  // 추상 메서드는 기본 뼈대만 제공
  abstract describe(this: Department12): void;
  // abstract printEmployees(): string[];
}

// 추상 클래스를 상속받는 클래스는 추상 클래스의 모든 멤버를 구현해야 한다
class HumanResource extends Department12 {
  describe(): void {
  }
  // printEmployees() 구현 안하면 에러 발생
  
}