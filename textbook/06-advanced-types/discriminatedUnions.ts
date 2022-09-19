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
