## Dependency Injection & Inversion of Control

서비스 인스턴스를 생성하지 않았는데, 컨트롤러에서 어떻게 주입을 받고 잇을까?
컨트롤러에서 어떻게 서비스에 대한 권한과 접근이 가능할까?

nestJs에서 의존성 주입과 제어의 역전을 잘 사용해서
서비스와 같은 프로바이더들을 알아서 관리해주고 있다.

class A {
const b = B();
}

class B{

}

A라는 클래스를 인스턴스로 만들 때마다 클래스 B의 인스턴스를 매번 생성한다.

의존성 주입을 알아보면
class A{
constructor(instance: B); // 어디에선가 생성된 클래스 B를 A에서 '주입'받는다.
}

class A는 클래스 B에 의존하고 있다.
의존하고 있는 값을 주입해준다. - 의존성 주입!

Inversion of Control은 의존성 주입의 일종이라 볼 수 있다.
반대로 제어한다.

클래스 A와 class C가 둘다 class B에 의존성을 가지고 있다고 하면
어디선가 클래스 B의 인스턴스를 생성한 다음에 그 인스턴스를 클래스 A와 클래스 C로 주입한다.
IoC의 경우에는 클래스 B의 인스턴스의 생성 과정 (및 다른 클래스들이 의존하는 인스턴스들을) 생성, 주입, 삭제 과정을
프레임워크가 직접 담당한다.

샐행과 동시에 ioC 컨테이너라는 게 생긴다.
이 Inversion of Control 컨테이너 안에 클래스 A와 클래스 C를 사용해야 한다.
A 컨트롤러와 C 컨트롤러 안에서 B라는 서비스를 사용해야 하면
이를 보고 nestJS IOC container가 클래스 B를 사용해서 new B를 한 다음 인스턴스를 생성한다.
이를 그대로 들고 있고 인스턴스 B의 라이프 사이클을 알아서 제어한다.
클래스 A가 필요한 상황 즉 B가 필요한 상황이 있을 때마다 IoC container가 자동으로 생성된 인스턴스르 주입해준다.

그래서 개발자는 의존성이 잇는 것들의 생성, 폐기를 신경쓸 필요가 ㅇ벗이 기능에만 집중할 수 있도록 설계되어 있따.
인스턴스를 직접 생성하는 상황이 없으면 테스트 코드 작성도 매우 편리해진다.

클래스 A와 클래스 C가 컨트롤러라고 가정하면 클래스 B 인스턴스를 주입다은 경우
B는 서비스라고 볼 수 잇는데 그 클래스의 이름은 postService라고 이름을 지엇지만
이렇게 주입을 받을 수 잇는 클래스들을 'Provider'라는 일반화된 이름으로 nestJs에서 부른다.

Provider를 정의하고 Provider를 constructor에 주입 받겠다고 정의하면
IoC 컨테이너가 알아서 그 프로바이더들을 찾아서 인스턴스화해서 자동으로 주입해준다.

이것에 nestjs가 하는 굉장히 큰 역할 중 하나다.

service를 인스턴스화해서 controller에 주입한 적이 없는데
어떻게 service가 controller에서 잘 동작할까?

이는 nestJs ioc container에서 자동으로 생성이 되고 있다.
실행하면 자동으로 ioc container가 주입이 되어야 하는 서비스들을 생성한다.

이 서비스들을 ioc conttainer가 인지할 수 있도록 module에 등록해야한다.

module에는 기본적으로 두 개의 파라미터를 넣고 있다.
컨트롤러에는 컨트롤러로 사용할 것을 정의하면 된다.
컨트롤러에는 get, post, put, patch, delete 요청 등이 nestjs 프레임워크에 등록이 되어서
라우팅이 된다. (요청이 들어간다.)

providers라는 파라미터에는 리스트 형태로 클래스들을 넣을 수 있다.
이 리스트에는 인스턴스를 넣는 게 아니라 '클래스'를 그대로 넣는다.
그러면 IoC container가 자동으로 인스턴스화해서 관리를 한다.

controller에 주입하는 값들은 모두 providers에 넣어주자.
서비스는 어떤 역할을 하는 지에 대한 명칭일 뿐이고 크게 provider이다. (주입을 해야하는 대상이므로)
서비스에는 실제로 데이터를 다루는 로직을 작성했었고, 데이터를 다루는 로직을 작성하는 클래스를 '서비스'라는 명치응로 부른다.

나중에 DB와 통신할 수 잇게 TypeORM이나 인증, 검증에 필요한 기능들을 컨트롤러에 혹은 서비스에 주입해야한다.
그렇게 주입의 대상이 되는 클래스들은 모두 providers에 넣어주면 된다.
providers 안에 등록된 모든 클래스들은 인스턴스화 없이 ioC 컨테이너에 의존하면서 사용할 수 있게 된다.

이때, service에 가면 @injectable이라는 어노테이션이 있다.
providers 안에 등록된 모든 클래스들을 ioc 컨테이너가 관리하게 하기 위해선 등록할 클래스들에 @injectable 으노테이션을 해주어야만 프로바이더로 사용할 수 있다.

injectable 가능한 클래스들을 providers로 등록해야 한다.
그러면 인스턴스를 우리가 직접 생성할 필요 없이 ioc container가 고나리해준다.

---

특정 기능에 대한 모듈만 봤는데,
nest js는 여러 모듈들을 어떻게 관리 해야하는 지 어떠헥 알 수 있냐?

nest new . 했을 때 appcontroller, app module, app service가 있었다. (spec file 생략)
app controller, app service는 사용할 일이 없지만

중요한 것은 app.module.ts에 가면 import라는 게 하나 더있다.
여기서도 마찬가지로 앱서비스와 앱 컨트롤러를 앱 모듈 안에 등록했다.

imports 파람도 있는데 이것은 다른 모듈을 불러올 때 사용하게 된다.
원래 우리가 손으로 파일을 하나하나 만들면 app module 안에 새로 만든 모듈을 직접 등록해야 한다.

그런데 cli를 사요ㅕㅇㅎ새서 nest g resource sth을 사용해서 생성해서
자동으로 app module에 새로 생성한 posts module이 등록되었다.
-> 그럼으로 cli를 잘 이용해야 한다.

app module에 post modules이 등록되고 다른 모듈들도 imports에 등록해야 하는 건 아렉ㅆ는데
그러면 app module이 존재한다는 것은 nest js가 어떻게 아는가?

흐름을 타고 올라가보면 main.ts를 실행하면 bootstrap이라는 함수가 그 밑에서 실행하고 있다.

bootstrap 함수는 express를 생성할 때도 본 코드가 적혀있다.
nestFactory라는 것이 create()를 통해서 무언가를 생성하고
그 생성한 무언가에 app module을 넣어줬다.
app이라는 것을 생성했고 그 app은 실제로 실행할 서버인데
이 앱을 실행할 때 app module이라는 레퍼런스를 넣어줬다.

nestjs는 appmodule로부터 모듈을 확장해 나가고 이 안에 잇는 파일과 폴더를 관리하면 되겟구나를 알 수 가 잇다.
그러므로 새로운 모듈을 생성할 때는 항상 app module에 등록이 되고 app module은 main.ts에서 nestjs를 실행할 때
앱을 만들고 생성할 때 레퍼런스 되어 있다.
그렇기 땜누에 app module로부터 모듈들을 하나씩 보면서 providers, controllers를 등록하면 되는 것을
nestjs 프레임워크에서 알고 있다.
