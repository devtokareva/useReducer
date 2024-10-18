import React, { useReducer } from "react";

type State = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  errors: {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  };
};

type Action =
  | {
      type: "updateField";
      fieldName: keyof Omit<State, "errors">;
      payload: string;
    }
  | { type: "setErrors"; payload: State["errors"] }
  | { type: "reset" };

const initialState: State = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  errors: {},
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "updateField":
      return {
        ...state,
        [action.fieldName]: action.payload,
        errors: {
          ...state.errors,
          [action.fieldName]: "",
        },
      };
    case "setErrors":
      return {
        ...state,
        errors: action.payload,
      };
    case "reset":
      return initialState;
    default:
      return state;
  }
}

export const RegisterForm: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { username, email, password, confirmPassword, errors } = state;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: State["errors"] = {};
    if (!username) newErrors.username = "Введите имя пользователя";
    if (!email) newErrors.email = "Введите email";
    if (!password) newErrors.password = "Введите пароль";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Пароли не совпадают";

    if (Object.keys(newErrors).length > 0) {
      dispatch({ type: "setErrors", payload: newErrors });
    } else {
      // Здесь логика отправки данных на сервер
      alert("Регистрация успешна");
      dispatch({ type: "reset" });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "updateField",
      fieldName: e.target.name as keyof Omit<State, "errors">,
      payload: e.target.value,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Имя пользователя:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
          />
          {errors.username && <p>{errors.username}</p>}
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>

        <div>
          <label>Пароль:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>

        <div>
          <label>Подтвердите пароль:</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        </div>

        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
};
