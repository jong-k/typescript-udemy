// 2. 제네릭 함수 생성하기
function merge(objA: object, objB: object) {
  return Object.assign(objA, objB); // assign 함수로 두 객체를 병합
}
// console.log(merge({name: 'King'}, {age: 30})); // {name: 'King', age: 30}
const mergedObj = merge({name: 'King'}, {age: 30});
// console.log(mergedObj.name); 에러 발생 : 접근 불가 -> 어떤 프로퍼티 타입이 있는지 정확히 몰라서
// mergedObj 뒤에 타입 캐스팅으로 as {name: string,  age: number} 라고 붙여주면 가능하지만, 번거로움

// 이를 해결하기 위해 제네릭을 사용
// T 대신 다른걸 써도 상관없으나 관례상 사용
function merge1<T, U>(objA: T, objB: U) {
  return Object.assign(objA, objB); // T & U (인터섹션)를 반환한다고 추론 -> 서로 다른 타입이 될 수도 있음을 TS에게 알려줌
}
const mergedObj1 = merge1({name: 'King'}, {age: 30});
console.log(mergedObj1.age); // 정상적으로 잘 출력됨

const mergedObj2 = merge1({name: 'son', hobbies: ['soccer']}, {score: 100});
console.log(mergedObj2.hobbies); // 정상적으로 잘 출력됨

// 3. 제약 조건 작업하기
// mergedObj2 에서 {score: 100} 대신 숫자 100만 전달하면, 에러 발생없이 조용히 실패한다
// 이러한 실수에 대비해, 제네릭에서는 타입에 제약 조건을 부여하여 에러를 방지할 수 있다

// T와 U는 어떤 구조의 객체인지는 상관없으나, 일단 객체이어야 함
// extends 뒤에는 유니온 타입 및 커스텀 타입을 포함해 어떤 타입이든 올 수 있다
function newMerge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}
// 아래처럼 U 타입 위치에 그냥 숫자가 오면 IDE에서 에러 발생 (30을 객체 타입에 할당 불가)
// const newMergedObj = newMerge({name: 'son', hobbies: ['soccer']}, 100);

// 4. 다른 제네릭 함수
// 인터페이스(또는 타입도 가능)를 통해 타입을 미리 설정
interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = 'Got no value';
  if (element.length === 1) {
    descriptionText = 'Got 1 element.';
  } else if (element.length > 1) {
    descriptionText = 'Got ' + element.length + ' elements.';
  }
  return [element, descriptionText];
}

console.log(countAndDescribe('Hi There!'));
console.log(countAndDescribe(['no more candy', 'no more sugar']));

// 5. keyof 제약조건
// 문자 그대로 extends 하는 제네릭 타입이 keyof 뒤에 오는 제네릭 타입의 key임을 명시
// U extends keyof T 같은 패턴으로 사용되어, 매개변수가 (객체:T, 객체의 키값:U) 형태일때 유용하게 사용
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
  return obj[key]; // 실제로 이 key가 obj에 있는지 알 수 없기 때문에 에러 발생
}

console.log(extractAndConvert({name: 'God'}, 'name')); // God

// 6. 제네릭 클래스
// 클래스에서도 제네릭을 사용할 수 있음
// 클래스 이름 뒤에 <T>가 위치
// 클래스에서 설계해둔 제네릭으로 각 인스턴스에서 다양한 타입을 사용 가능
class DataStorage<T> {
  private data: T[] = [];
  
  addItem(item: T) {
    this.data.push(item);
  }
  
  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) return; // 객체에 대해서는 작동 X
    this.data.splice(this.data.indexOf(item), 1); // 객체의 경우 인덱스 못찾아서 -1 출력
  }
  
  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
// textStorage.addItem(10); 에러 발생 -> 숫자
textStorage.addItem('coffee');
textStorage.addItem('icecream');
textStorage.removeItem('icecream'); // ['coffee']

const numberStorage = new DataStorage<number>();
numberStorage.addItem(10);
numberStorage.addItem(100);
numberStorage.removeItem(10);
console.log(numberStorage.getItems()); // [100]

// 아래 코드는 제약조건을 추가하고나서부터 에러 발생
// const objectStorage = new DataStorage<object>();
// objectStorage.addItem({name: 'diablo'});
// objectStorage.addItem({name: 'baal'});
// objectStorage.removeItem({name: 'diablo'}); // 그대로 배열에 {name: 'diablo'} 남아있음 -> 객체의 경우 인덱스로 참조 불가
// console.log(objectStorage.getItems());

//  7. 제네릭 유틸리티 타입
// 7-1. Partial 타입 : T의 모든 프로퍼티를 옵셔널하게 만듬
interface CourseGoal { // 이 인터페이스는 아래에서 Partial 타입이 되어 옵셔널하게 됨
  title: string;
  description: string;
  date: Date; // Date 타입은 대문자!
}

function createCourseGoal(title: string,  description: string,  date: Date): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {}; // 객체가 courseGoal이 될 객체임을 알려줌
  // 즉, courseGoal이 CourseGoal의 부분집합이 될 것임
  courseGoal.title = title;
  courseGoal.description = description;
  return courseGoal as CourseGoal;
}

// 7-2. Readonly
const names: Readonly<string[]> = ['Max', 'Tom'];
// names.push('Ron'); 읽기 전용이므로 변경하려고 하면 에러 발생

// Partial과 Readonly 타입 이외에도 많은 유틸리티 타입이 존재

// 8. 제네릭 타입 vs 유니온 타입
// 제네릭 클래스를 똑같이 가져와서 유니온 타입으로 변경

class DataStorage1 {
  // private data: (string | number | boolean)[]  = []; // 문자열, 숫자, bool값이 혼합된 배열
  private data: string[] | number[] | boolean[] = []; // 3중 1개의 단일 원소 배열
  
  // 에러 발생 -> string[] 일 수도 있는데 number 추가될 수도 있어서
  // addItem(item: string | number | boolean) {
  //   this.data.push(item);
  // }
  
  // 에러 발생
  // removeItem(item: string | number | boolean) {
  //   if (this.data.indexOf(item) === -1) return; // 객체에 대해서는 작동 X
  //   this.data.splice(this.data.indexOf(item), 1); // 객체의 경우 인덱스 못찾아서 -1 출력
  // }
  
  getItems() {
    return [...this.data];
  }
}

// 유니언 타입은 함수를 호출할 때마다 다른 타입을 지정할 때 쓴다
// 즉, 매개변수 타입이 바뀔수 있어도 상관 없을 때

// 제네릭 타입은 특정 타입을 고정하거나, 클래스에서 설정한 타입을 인스턴스가 따라가게 할 때 사용