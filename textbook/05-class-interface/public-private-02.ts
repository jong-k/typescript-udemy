// 5. 접근 제한자 public & private
class Department {
  name: string;
  private employees: string[] = []; // private 제한자 추가 -> 클래스 외부에서 접근 불가
  
  constructor(n: string) {
    this.name = n;
  }
  
  describe(this: Department) {
    console.log('Department: ' + this.name);
  }
  
  addEmployee(employee: string) {
    this.employees.push(employee);
  }
  
  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
  
}

const accounting = new Department('Accounting');
accounting.addEmployee('Sandra');
accounting.addEmployee('Sam');
// accounting.employees[2] = 'Steven'; // 프로퍼티 직접 추가 -> public인 경우에만 가능 (금지)
accounting.describe();
accounting.printEmployeeInformation();