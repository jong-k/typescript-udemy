// 13. 싱글턴 패턴 & private
// 싱글턴 패턴은 클래스가 인스턴스를 딱 1개만 보유하는 것을 말한다
// private을 constructor 앞에 붙이면 상속, 인스턴스 생성 불가

class Department13 {
  constructor(public id: string, public name: string) { // 상속 불가
  }
  describe() {
    console.log(this.id, this.name)
  }
}

class HumanResource1 extends Department13 {
  private static instance: HumanResource1; // 스태틱 메서드로 private 프로퍼티 instance를 정의
  private constructor(id: string, name: string) {
    super('hr01', 'HR'); // super에는 인스턴스에서 사용할 실제 값을 입력
  }
  
  static getInstance() {
    if (HumanResource1.instance) { // 인스턴스 존재하면 기존의 것 반환
      return this.instance; // 인스턴스 있으면 반환
    } // 없으면 생성
    this.instance = new HumanResource1('hr02', 'HRD');
    return this.instance;
  }
}

// const inst = new HumanResource1(); -> 에러 발생 (private constructor는 인스턴스 생성 불가
const hrd = HumanResource1.getInstance(); // 인스턴스 생성
console.log(hrd); // HumanResource1 {id: 'hr01', name: 'HR'}