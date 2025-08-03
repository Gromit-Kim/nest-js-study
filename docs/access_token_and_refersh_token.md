## Refresh Token and Access Token

- Access Token은 API 요청할 때 검증용 토큰으로 사용된다.
  - 인증이 필요한 API를 사용할 때는 꼭 Access Token을 header에 넣어서 보내야 한다.
  - 유저 정보 수정, 회사 채용공고 지원 인원 확인 등
- Refresh Token은 Access Token을 추가로 발급할 때 사용된다.
  - Access Token을 새로고침(Refresh)하는 기능이 있어서 Refresh Token이라고 부른다.
- Access Token은 유효 기간이 짧고, Refresh Token은 유효기간이 길다.
- 자주 노출되는 Access Token은 유효 기간을 짧게 해서 해커가 오래 사용하지 못하게 방지할 수 있다.
- 상대적으로 노출이 적은 Refresh Token의 경우 Access Token을 새로 발급받을 때만 사용되기 때문에 탈취 가능성이 적다.
