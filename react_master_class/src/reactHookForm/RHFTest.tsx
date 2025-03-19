/**
 * g 리액트 훅 폼 
 * g 폼 데이터 관리
*/
import { useForm } from "react-hook-form";

interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  password1: string;
  extraErrors?: string; 
}

const App = () => {
  /**
   * g register : 폼 데이터를 관리하도록 돕는 함수
   * g watch : 폼 데이터를 실시간으로 관찰하고 해당 값을 즉각 사용할 수 있게 돕는 함수
   * g handleSubmit : 폼 서브밋 이벤트에서 사용하는 함수로 유효성 검사를 자동으로 수행하며 유효성에 대한 동작을 구분할 수 있다.
   * ex handleSubmit(successEvent, errorEvent);
   * g formState : 폼의 유효성 검사 결과나 수정 상태 등 폼의 상태를 확인할 때 사용
  */
  const {
    register, 
    watch, 
    handleSubmit, 
    formState : {
      errors
    },
    setError
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    }
  });

  const submitEvent = (data: IForm) => {

    if (data.password !== data.password1) {

      return setError(
        "password1",
        { message: "Password are not the same" },
        { shouldFocus: true },
      );
    }

    console.log(data);

    // setError("extraErrors", {
    //   message: "sever is offine"
    // });
  }

  /**
   * g register에는 여러가지 옵션이 존재
  */
  return (
    <div>
      <form 
      onSubmit={handleSubmit(submitEvent)}
      style={{
        display: "flex",
        flexDirection: "column",
        width: "500px"
      }}>
        <input 
          type="text" 
          {
            ...register("email", 
              {
                required: "Email is required",
                pattern: {
                  value: /^[A-Za-z0-9,_%+-]+@naver.com$/,
                  message: "Only naver.com emails allowed"
                }
              }
            )
          } 
          placeholder="email"
        />
        <span>{errors.email?.message}</span>
        <input 
          type="text" 
          {
            ...register("firstName", 
              {
                required: "write here",
                validate: {
                  noJisu: (val) => val.includes("jisu") ? "no jisu allowed" : true,
                  noUni: (val) => val.includes("uni") ? "no uni allowed" : true,
                }
              }
            )
          }
          placeholder="firstName"
        />
        <span>{errors.firstName?.message}</span>
        <input 
          type="text" 
          {
            ...register("lastName", 
              {
                required: "write here"
              }
            )
          }
          placeholder="lastName"
        />
        <span>{errors.lastName?.message}</span>
        <input 
          type="text" 
          {
            ...register("userName",
              {
                required: "write here",
              }
            )
          }
          placeholder="userName"
        />
        <span>{errors.userName?.message}</span>
        <input 
          type="text" 
          {
            ...register("password",
              {
                required: "write here",
                minLength: 5
              }
            )
          }
          placeholder="password"
        />
        <span>{errors.password?.message}</span>
        <input 
          type="text" 
          {
            ...register("password1",
              {
                required: "write here"
              }
            )
          }
          placeholder="password1"
        />
        <span>{errors.password1?.message}</span>
        <button>submit</button>
        <span>{errors.extraErrors?.message}</span>
      </form>
    </div>
  );
}

export default App;