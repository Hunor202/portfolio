import { useState } from "react"
import { useAddExperienceMutation, useAddUserMutation } from "../store/jobApiSlice";
import Nav from "./navBar/Nav";
import { useNavigate } from "react-router-dom";

function Registration() {
    const [addUser, { isLoading }] = useAddUserMutation();
    const [addExperience] = useAddExperienceMutation();
    const [form, setForm] = useState({ email: '', password: '', role: 'jobseeker', fullname: '' });
    const [experiences, setExperiences] = useState('');
    const navigate = useNavigate();

    const handleInput = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    const handleLogin = () => {
        addUser(form).then(e => {
            if (e.data.id) {
                if (form.role == 'jobseeker') {
                    const exp = experiences.split('\n');
                    for (let ex of exp) {
                        let eData = ex.split(';');
                        let obj = {
                            company: eData[0],
                            title: eData[1],
                            interval: eData[2]
                        };
                        //addExperience(obj);
                    }
                }
                navigate('/');
            }
        })
    };
    const handleCheckbox = (e) => {
        const { name, checked } = e.target;
        setForm({ ...form, [name]: checked ? 'company' : 'jobseeker' });
    };
    return (
        <div>
            <Nav />
            <h2>Regisztráció</h2>
            <h3>Email</h3>
            <input type="email" name="email" value={form.email} onInput={handleInput}></input>
            <h3>Jelszó</h3>
            <input type="password" name="password" value={form.password} onInput={handleInput}></input>
            <h3>Teljes név</h3>
            <input type="text" name="fullname" value={form.fullname} onInput={handleInput}></input> <br />
            <span>Munkáltató </span>
            <input type="checkBox" name="role" onChange={handleCheckbox}></input>
            {form.role == 'jobseeker' &&
                <>
                    <br />
                    <h3>Korábbi tapasztalatok </h3>
                    <textarea
                        value={experiences}
                        onChange={e => { setExperiences(e.target.value) }}
                        placeholder='munkahely;pozíció;mettől-meddig'
                        rows="4"
                        cols="35"
                    ></textarea>
                </>
            }
            <br /> <br />
            <button onClick={handleLogin} >Regisztráció</button>
        </div>
    )
}

export default Registration
