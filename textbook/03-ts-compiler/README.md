# 섹션3: TypeScript 컴파일러 및 구성
## 3-1. TypeScript 프로젝트 세팅
- 이 프로젝트가 TS 프로젝트라고 알리기
    - `tsc --init`
- 모든 파일 컴파일
    - `tsc`
- 특정 파일 컴파일
    - `tsc 파일명`
- watch mode : 파일 변경이 감지되면 자동으로 컴파일 실행
    - -w만 붙여주면 된다
## 3-2. tsconfig 설정
### exclude
- 컴파일 제외할 파일을 배열 형태로 넣는다
- *.확장자 형태를 써서 모든 확장자 적용
- **/.확장자 써서 모든 파일의 모든 확장자 적용
- exclude는 따로 입력하지 않으면 기본값으로 node_modules 폴더 컴파일 제외 (안 건드려도 됨)
### include
- 컴파일할 개별 파일을 설정 (exclude를 폴더로 설정한다면)
- exclude와 섞어서 많이 씀
### target
- 컴파일할 JS의 버전을 설정
### lib
- 기본 설정을 따르면 됨 (target에 기재한 버전에 맞춰서 자동 적용)
- Dom API 등 JS 핵심 라이브러리를 기재 (버전별로 상이하나)
### sourceMap
- true로 설정하면 map 파일이 컴파일시 함께 생성됨
- 크롬 개발자도구에서 ts 파일을 확인할 수 있음 (기본은 js 파일만 확인 가능)
### outDir, rootDir
- 일반적으로 프로젝트 진행시 루트디렉토리에 src 폴더를 만들어 거기에 파일을 저장한다
    - `"rootDir": "./src"`
    - 이러면 src 아래의 파일들만 컴파일된다 -> 실수로 루트 레벨에 폴더를 만들고 그 안에 ts 파일이 컴파일 되는것을 방지
- 모든 출력값(컴파일된 js 파일)은 dist 폴더에 저장한다
    - `"outDir": "./dist"`
### removeComments
- 컴파일된 js 파일의 주석을 지워줌 (용량 줄일 수 있음)
### noEmit
- 컴파일해도 js 파일 안나옴
### noEmitOnError
- 에러가 발생하면 js 만들지 않음
### strict
- 기본 strict: true로 되어 있으면 모든 strict 옵션들이 기본으로 적용됨
- nullable 값 처리 : 코드 끝에 `!`를 붙여주면 해결
    - `const button = document.querySelector('button')!;` -> button element가 없을 수도 있으나 있다고 가정하고 진행
    - if문 대신 이렇게 임시로 해결 가능
