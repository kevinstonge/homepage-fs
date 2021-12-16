import { axiosWithAuth } from "../api/axios.js";
export default function Login(props) {
  // action="/adminLogin/login" method="POST"
  const onSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth({
      method: "POST",
      url: "/adminLogin/login",
      data: {
        username: e.target[0].value,
        password: e.target[1].value,
      },
    })
      .then((r) => {
        const token = r.data.token;
        if (r.status === 200 && token) {
          props.setToken(token);
          localStorage.setItem("token", token);
        }
        console.log(r);
      })
      .catch(console.log);
  };
  return (
    <>
      <h1>Log in</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <input type="text" name="username" id="username" />
        <input type="password" name="password" id="password" />
        <button type="submit">log in</button>
      </form>
    </>
  );
}
