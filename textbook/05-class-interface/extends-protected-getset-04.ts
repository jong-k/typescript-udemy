// 8. 상속
// 9. protected 접근 제한자
// 10. getter & setter
// 11. 정적 메서드 & 프로퍼티
// 그룹화, 클래스에 직접 매핑하는 유틸리티 함수, 전역 상수 등을 구현할 때 사용한다
class Department8 {
  static fiscalYear = 2020;
  protected employees: string[] = [];
  
  constructor(private readonly id: string, private name: string) { // 약식 초기화
  
  }
  
  static createEmployee(name: string) {
    return { name } // 자동으로 name과 같은 이름의 키 생성됨
  }
  
  describe(this: Department8) {
    console.log(`Department (${this.id}): ${this.name}`);
  }
  
  addEmployee(employee: string) {
    this.employees.push(employee);
  }
  
  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
  
}

// 서브 클래스
class ITDepartment extends Department8 {
  constructor(id: string, admins: string[]) {
    super(id, 'IT'); // 수퍼 클래스의 constructor를 호출, name을 고정값 'IT'로 사용
    // this를 참조하려면 반드시 super를 먼저 호출해야함
    
  }
}

class AccountingDepartment extends Department8 {
  private lastReport: string;
  
  // getter
  get mostRecentReport() { // 참조할때는 () 빼고 프로퍼티처럼 참조
    if (this.lastReport) return this.lastReport;
    throw new Error('No report found.')
  }
  
  // setter
  set mostRecentReport(value: string) {
    if (!value) throw new Error('Please pass in a valid value.')
    this.addReport(value);
  }
  
  constructor(id: string, private reports: string[]) {
    super(id, 'Accounting'); // 수퍼 클래스의 constructor를 호출, name을 고정값 'IT'로 사용
    // this를 참조하려면 반드시 super를 먼저 호출해야함
    this.lastReport = reports[0];
  }
  
  addEmployee(name: string) { // 메서드 오버라이딩
    if (name === 'Max') return;
    this.employees.push(name); // 에러 -> 서브 클래스에서 수퍼 클래스의 private 프로퍼티 수정
    // 수퍼 클래스의 속성을 private -> protected 바꿔주면 해결
    // protected는 서브클래스 에서 접근하는 것은 허락해줌
  }
  
  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }
  
  printReports() {
    console.log(this.reports);
  }
}

// 스태틱 메서드 호출
const employee1 = Department8.createEmployee('matsuda');
console.log(employee1);
// 스태틱 프로퍼티 호출
console.log(Department8.fiscalYear);

const accounting8 = new AccountingDepartment('d2', []);

accounting8.addReport('Something went wrong...');

accounting8.addEmployee('Ken');
accounting8.addEmployee('Max');
accounting8.printReports();
accounting8.printEmployeeInformation();
accounting8.addReport('Good');
console.log(accounting8.mostRecentReport); // getter는 괄호 없이 호출
accounting8.mostRecentReport = ''; // setter 또한 괄호 없이 호출 (이전에 정의한 조건에 따라 에러 발생)