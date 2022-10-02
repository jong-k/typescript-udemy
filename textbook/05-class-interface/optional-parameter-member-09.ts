// 인터페이스
// 7. 옵셔널 파라미터 & 프로퍼티
interface document {
  name?: string; // 이 프로퍼티를 구현하지 않아도 됨
  author?: string;
  // 메서드도 옵셔널하게 만들 수 있음
  isPrinted?(): boolean;
}

class D1 implements document{
  name?: string;
  // author 구현 안해도 에러 발생 X
  constructor(n?: string) { // 옵셔널 파라미터
    if (n) this.name = n;
  }
  
}

const report = new D1(); // 값 없이 인스턴스 만들기도 가능

// 8. 자바스크립트로 인터페이스 컴파일
// 인터페이스는 JS에 대응하는 문법이 없으므로 컴파일하면 interface는 사라짐