import {axiosWithAuth} from "../api/axios.js";
export default function Login (props) {
    // action="/adminLogin/login" method="POST"
    const onSubmit = (e) => {
        e.preventDefault();
        axiosWithAuth({
            method:"POST",
            url: "/adminLogin/login",
            username: 'asdf',
            password: 'asdf'
        })
        .then(r=>{
            console.log(r);
        })
        .catch(console.log);
    }
    return <>
    <h1>Log in</h1>
    <form onSubmit={(e)=>onSubmit(e)}>
      <input type="text" name="username" id="username" />
      <input type="password" name="password" id="password" />
      <button type="submit">log in</button>
    </form>
    </>
}