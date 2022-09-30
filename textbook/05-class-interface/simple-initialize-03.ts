// 6. 약식 초기화
// 7. readonly 속성 -> TS에만 존재
class Department6 {
  // private readonly name: string;
  // private readonly employees: string[] = [];
  // 약식 초기화를 사용할 때는 public 이라도 파라미터 앞에 반드시 붙여줘야 함
  constructor(private readonly id: string, private readonly name: string) { // 약식 초기화
    // this.id = id;
    // this.name = name;
  }
  
  describe(this: Department6) {
    console.log(`Department (${this.id}): ${this.name}`);
  }
  
}

const accounting = new Department6('d1', 'Accounting');
accounting.describe();