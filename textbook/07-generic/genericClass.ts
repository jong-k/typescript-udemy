// 6. 제네릭 클래스
// 클래스에서도 제네릭을 사용할 수 있음
// 클래스 이름 뒤에 <T>가 위치
// 클래스에서 설계해둔 제네릭으로 각 인스턴스에서 다양한 타입을 사용 가능
class DataStorage<T extends string | number | boolean> {
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