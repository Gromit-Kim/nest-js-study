## Docker

도커파일에 절차를 작성하고 도커에서 이 파일을 실행하면
무조건 실행된다.

|NestJs|Postgresql|MongoDB|
|Bins/Libs|Bins/Libs|Bins/Libs|
Docker Engine
Host OS(macOS, Windows, Linux)
인프라(Hw, server, cpu, graphic card, network card ...)

컨테이너를 자유롭게 배포할 수 있다.

Virtual Machine

...
|GuestOs||||
Hypervisor
Host OS
Infra

Guest OS를 설치함으로 무겁다.
도커는 native하게 사용하므로 엄청 쉽다.

## Docker Compose

도커를 설치하면 기본으로 함께 오는 기능이다.

컨테이너를 여러 개 만들었을 때 관리하기 힘들어서 나온 것이
kubernetes, docker-compose, docker swarm 등이다.

쿠버네티스가 현대 제일 중요한 기술이다...
docker compose는 용도가 다르다.
도커 컴포즈는 여러 개의 기기(여러 하드 웨어)에서 작동을 시킨다는 가정을 하고 만들어진 게 아니다.
그런데 쿠버네티스는 여러 기기, 여러 컨테이너를 자유롭게 활용하는 것으로 더 세부화된 하나의 기기에서 우리가 여러 개의 컨테이너를 돌리는 게 최적화 되어 있으므로 프로덕션 환경에선 쿠버네티스를 사용한다.

로컬 환경에서 개발할 때는 보통 docker compose를 활용해서 개발한다.
도커 컴포즈는 여러 개의 컨테이너들을 한 번에 묶어서 관리하는 것이다.

그런데 유일한 단점이 있는데
docker compose는 docker compose만의 문법이 있다.
yaml 문법이다.
dockerfile 기반으로 작성할 수도 있고 dockerfile 없이 작성할 수도 있다.
