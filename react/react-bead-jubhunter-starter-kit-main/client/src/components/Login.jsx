import { useState } from "react"
import { useLoginUserMutation } from "../store/jobApiSlice";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import Nav from "./navBar/Nav";
import { useNavigate } from "react-router-dom";

function Login() {
    const [loginUser, { isLoading }] = useLoginUserMutation();
    const [form, setForm] = useState({ email: '', password: '' });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleInput = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    const handleLogin = async () => {
        try {
            const user = await loginUser(form).unwrap();
            console.log(user.user.fullname);
            dispatch(login({ accessToken: user.accessToken, user: user.user, role: user.user.role }));
            navigate('/');
        } catch (err) {
            console.error('Failed to authenticate: ', err);
        }
    }
    return (
        <div>
            <Nav />
            <h2>Bejelentkés</h2>
            <h3>Email</h3>
            <input type="email" name="email" value={form.email} onInput={handleInput}></input>
            <h3>Jelszó</h3>
            <input type="password" name="password" value={form.password} onInput={handleInput}></input> <br /> <br />
            <button onClick={handleLogin}>Bejelentkezés</button>
        </div>
    )
}

export default Login;
