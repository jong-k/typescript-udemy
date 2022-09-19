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