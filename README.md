# my-highlight
온라인 구문 강조 웹사이트 입니다.

## 개발하게 된 이유
> 소스코드를 문서로 옮길때 구문강조가 되면서 동시에 Line number도 넣을려고 하닌깐  
> table 구조가 유용하다는 사실을 알게 되었습니다.  
> 하지만 table 형태로 소스코드를 구문강조 해주는 프로그램이 보이지 않아서 직접 개발하게 되었습니다.

## 원리
- 구문강조는 `highlight.js`에서 이루어 집니다.
- 구문강조된 요소를 전달받아 `\n` 기준으로 분리한 다음 `table`태그로 감싸줍니다.
- 간단하죠?

## License
- my-highlight ([MIT License](https://github.com/yejun614/my-highlight/blob/main/LICENSE))
- highlight.js ([BSD 3-Clause License](https://github.com/highlightjs/highlight.js/blob/main/LICENSE))
- Bootstrap ([MIT License](https://github.com/twbs/bootstrap/blob/main/LICENSE))

