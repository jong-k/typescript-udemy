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