import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  /**
   * 1) registerWithEmail
   *  - email, nickname, password를 입력받고 사용자를 생성한다.
   *  - 생성이 완료되면 accessToken과 refreshToken을 반환한다. (이를 안 하면 로그인 창으로 보내면 됨)
   *    회원 가입 후 다시 로그인해주세요 <- 이런 쓸데없는 과정을 방지하기 위해서
   *
   * 2) loginWithEmail
   *    - email, password를 입력하면 사용자 검증을 진행한다.
   *    - 검증이 완료되면 accessToken과 refreshToken을 반환한다.
   *
   * 3) loginUser (일반화된 로직)
   *    - (1)과 (2)에서 필요한 accessToken과 refreshToken을 반환하는 로직
   *
   * 4) signToken (토큰을 생성하는 로직)
   *    - (3)에서 필요한 accessToken과 refreshToken을 sign하는 로직
   *
   * 3에서 4를 2번 사용한다 + 1과 2에선 3을 사용한다.
   *
   * 5) authenticateWithEmailAndPassword
   *    - (2)에서 로그인을 진행할 때 필요한 기본적인 검증 진행
   *    1. email 기반으로 사용자가 존재하는 지 확인
   *    2. 비밀번호가 맞는지 확인
   *    3. 모두 통과되면 찾은 사용자 정보 반환
   *    4. loginWithEmail에서 반환된 데이터를 기반으로 토큰 생성
   */
}
