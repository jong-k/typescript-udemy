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