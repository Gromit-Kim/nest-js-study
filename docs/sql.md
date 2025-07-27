## SQL

데이터는 왜 초기화 되는가?
nestJs를 실행하면 코드를 변경할 때마다 서버가 재시작이 되었다.
재시작이 될 때마다 API 통신을 하면서 원래 NestJS에 선언되어 있던 변수들만 그대로 사용할 수 있다.
원래 상태로 초기화 된다.

그 이유는 하드웨어적인 이유가 있다.
저장 장치를 일반적으로 HDD와 SSD 2가질 본다.
이 저장장치의 크기가 클 수록 많은 프로그램과 파일을 저장할 수 있다.

여기에서 더 작은 사이즈 유닛으로 나오는 램이라는 것이 있따.
2^n승으로 구성된 램이라는 것이 있다.

nestjs code를 작성해 저장한 것은 SSD에 저장된다.
컴퓨터를 아무리 off on 해도 계속 코드는 그대로 남아 있다.
고장나지 않는 한 '영구적 저장'이 된다.

이제 nestjs code를 실행하면 ssd에 저장되어 있던 코드가 램에 올라간다.
램에 위치한 데이터가 실행이 되어서 nest js server 가 실행된다.

ram에 올라간 데이터는 프로그램 재시작시 리셋이 된다.
HW적인 문제로 ram은 영구적으로 데이터를 가지고 있지 못한다.
재실행되면 SSD로부터 RAM으로 프로그램을 다시 올리므로 그 상태 그대로만 변수들을 기억할 수 있다.

그럼에도 램을 사용하는 이유는 램이 훨씬 속도가 빠르기 때문이다.
속도가 느린 SSD에는 저장만하고 RAM에 올려서 프로그램을 돌려서 빠르게 이용한다.

프로그램이 종료되더라도 데이터를 유지하려면 하드드라이브나 SSD에 데이터를 작성해야 한다.
이걸 할 수 있는 방법은 여러 가지가 있는데 가장 전통적이고 흔한 게 SQL을 사용하는 것이다.
SQL(Structured Query Langauge)
Table - 정보를 담는 구조
Row와 COlumn으로 구성한다.

데이터 선택하기 - select
SELECT {column}
FROM {table}

데이터 업데이트 - update

update {table}
set {column}
where {condition}

update post SET likeCount=0 where id=3;

delete from post where author='newsjeans_offical';

insert into {table}() values ();

실제로 코딩할 때는 TypeORM API를 사용하면 SQL문은 자동으로 생성되는 형태의 기술을 사용한다.
