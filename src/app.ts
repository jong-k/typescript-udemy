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

// 3. 구별된 유니언
interface Bird {
  type: 'bird'; // 구별된 유니언 -> 리터럴 타입인 type을 생성
  flyingSpeed: number;
}

interface Horse {
  type: 'horse'; // 구별된 유니언 -> 리터럴 타입인 type을 생성
  runningSpeed: number;
}

type Animal = Bird | Horse; // 유니언 타입 생성

function moveAnimal(animal: Animal)  {
  // if ('flyingSpeed' in animal) console.log('Moving with speed: ' + animal.flyingSpeed);
  // if ('runningSpeed' in animal) console.log('Moving with speed: ' + animal.runningSpeed);
  // 동물이 추가될 수록 타입 가드를 추가해야 하는 수고로움이 커짐
  // 또는 오타 발생 가능
  // 구별된 유니언 활용! -> 객체마다 리터럴 타입인 type을 생성
  let speed;
  if (animal.type === 'bird') speed =  animal.flyingSpeed;
  if (animal.type === 'horse') speed =  animal.runningSpeed;
  console.log('Moving at speed: ' + speed);
}

moveAnimal({type: 'bird', flyingSpeed: 100});
// moveAnimal({type: 'bird', runningSpeed: 100}); 에러 발생

// 구별된 유니언은 타입 검사를 쉽게 해주는 일종의 패턴이다
// 인터페이스는 객체와 비슷한 것 같다! -> 함수 정의할 때 매개변수로 쓸 수 있음 (값은 인수로 입력해야함, 인터페이스는 타입만!)
// 또한 type으로 인터페이스를 유니온 타입으로 결합할 수 있음
// 반대로 인터페이스로 결합하려면 상속받아야 해서 번거로움

// 4. 형 변환
// 타입스크립트가 감지하지 못하는 '타입의 변화'를 명시적으로 표현해주는 것

// index.html에 아래 등장하는 element들이 추가된 상태
const paragraph1 = document.querySelector('p');
// const paragraph: HTMLParagraphElement | null -> null 일 수도 있다고 typescript도 알고 있음
// !를 표현식 뒤에 붙이면 null이 아니라고 선언 가능

const paragraph2 = document.getElementById('message-output')!;
// const paragraph2: HTMLElement -> 그냥 단순한 element로 추측할 뿐
// 정확히 어떤 element인지 탐지 불가 (typescript는 HTML을 정확하게 들여다보지 않음)

const userInputElement = document.getElementById('user-input')!;
// userInputElement.value = 'Hi there!'; // 단순히 HTMLElement가 너무 포괄적이라
// value 속성을 못가지는 element일 수 있어서 에러 발생

// 2가지 방법으로 타입 캐스팅 가능
// 1. 변환하고자 하는 요소 앞에 <타입>을 추가
const userInputElement1 = <HTMLInputElement>document.getElementById('user-input')!;
userInputElement1.value = 'Hi there!';
// 리액트 문법과 충돌 가능

// 2. as + 타입을 뒤에 붙임
const userInputElement2 = document.getElementById('user-input')! as HTMLInputElement;
userInputElement2.value = 'Hi there!';

// 2가지 방법중 하나를 골라 통일하여 설정

// 5. 인덱스 속성(타입)
// 객체가 지닐 수 있는 속성을 유연하게 나타내고 싶을 때
// 여러 입력창에서 어떤 결과인지를 확인하기 위한
// 입력에 따른 유효성 검사를 위해 에러 메시지를 다양하게 보유하고 싶을 떄


interface ErrorContainer { // { email: 'Not a valid email!', username: 'Must start with a capital character!'}
  // 실제 객체는 for in ... 구문을 활용하여 사용
  [prop: string]: string; // 모든 키값과 밸류값이  string 이어야 함
  // key 또는 prop 처럼 마음대로 식별자를 사용해도 됨
}

const errorBag: ErrorContainer = {
  1: 'Not a valid email!',
  2: 'Must start with a capital character!'
};

// 프로퍼티의 키값과 밸류값의 타입을 한번에 지정할 수 있는 장점?

// 6. 함수 오버로드
type Combinable1 = string | number;
type Numeric1 = number | boolean;

type Universal1 = Combinable1 & Numeric1;

// 함수 오버로드 -> 각각 줄 끝에 세미콜론 필요
function add1(a: string, b: string): string;
function add1(a: string, b: number): string;
function add1(a: number, b: string): string;
function add1(a: number, b: number): number;
function add1(a: Combinable1, b: Combinable1) {
  if (typeof a === 'string' || typeof b === 'string') { // 타입 가드 구문
    return a.toString() + b.toString();
  }
  return a + b;
}

// const result =  add('ko', 'rea');
// result.split(' ');
// 실행 가능한 코드이지만 에러 발생 -> string | number 타입에 array 메서드 사용할 수 없음

// 타입 캐스팅 활용할 수 있으나, 코드가 길어짐
// 함수 오버로드 사용 -> add1 위에 같은 이름의 타입 설정만 다른 함수를 생성

// 함수 오버로드를 통해 매개변수의 타입이 다른 다양한 경우에 대비할 수 있다

// 7. 옵셔널 체이닝(?.)
// 좌항의 피연산자가 null 또는 undefined인 경우 undefined를 반환
const fetchedUserData = {
  id: 'u1',
  name: 'steve',
  // job: { title: 'CEO', description: 'My own company' }
};

// console.log(fetchedUserData.job?.title); // job 프로퍼티가 없다고 에러 발생 (코드는 실행됨)
// console.log(fetchedUserData.job && fetchedUserData.job.title); -> 이 방법으로 에러를 방지할 수 있으나
// 객체에 대한 정보가 없을 때도 있음 -> 이 때 옵셔널 체이닝 연산자 ?.를 사용

// 8. null 병합 연산자(&&)
// 마찬가지로 타입스크립트가 null일지 미리 알 수 없음

const userInput = ''; // 빈 문자열이 필요한데 falsy값이 되버림
const storedData = userInput ?? 'DEFAULT'; // ''
// const storedData = userInput || 'DEFAULT'; // 전통적인 방법으로 하면 DEFAULT
console.log(storedData);