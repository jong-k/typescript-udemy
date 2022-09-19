// 1. 인터섹션 타입

// 타입 방식
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
}
// & 연산자로 이종 타입을 결합 -> 합집합
// 원래 인터섹션의 사전적 의미는 교집합이나, 타입스크립트에서는 합집합으로 쓰임
// 유니온의 사전적 의미가 합집합이나, 유니온도 합집합 개념은 아니고 택 1의 느낌

// 각각 따로 만들기 번거로우니 인터섹션 타입으로 결합
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: 'Hank',
  privileges: ['create-server'],
  startDate: new Date()
}

// 인터페이스 방식 -> 코드가 더 길어져서 타입 방식이 더 선호됨
interface NewAdmin {
  name: string;
  privileges: string[];
}

interface NewEmployee {
  name: string;
  startDate: Date;
}

interface NewElevatedEmployee extends NewAdmin, NewEmployee {}

const e2: ElevatedEmployee = {
  name: 'Hawk',
  privileges: ['create-server'],
  startDate: new Date()
}

// 유니언 타입 ( | ) : 타입간의 공통점이 있는 타입
type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

// 2. 타입 가드
function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') { // 타입 가드 구문
    return a.toString() + b.toString();
  }
  return a + b;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log('Name: '  + emp.name);
  // console.log('Privileges: ' + emp.privileges); -> 유니언 타입에서는 에러 발생
  // in 연산자로 프로퍼티가 있는지 검사하는 타입 가드
  if ('privileges' in emp) console.log('Privileges: ' + emp.privileges);
  if ('startDate' in emp) console.log('Start Date: ' + emp.startDate);
}

printEmployeeInformation(e1);

// 클래스에서의 타입 가드
class Car {
  drive() {
    console.log('driving...');
  }
}

class Truck {
  drive() {
    console.log('driving a truck...');
  }
  
  loadCargo(amount: number) {
    console.log('loading cargo... ' + amount)
  }
}

type Vehicle = Car | Truck;
const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  // if ('loadCargo' in vehicle) vehicle.loadCargo(1000); // 대신 instanceof 연산자 써도 됨
  if (vehicle instanceof Truck) vehicle.loadCargo(1000);
}

useVehicle(v1);
useVehicle(v2);