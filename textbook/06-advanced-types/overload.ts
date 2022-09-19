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