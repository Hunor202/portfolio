import React, { useState } from 'react'
import { useAddJobMutation } from '../store/jobApiSlice';
import Nav from './navBar/Nav';

const AddJob = () => {
    const [addJob, { isLoading }] = useAddJobMutation();
    const [form, setForm] = useState({
        company: '',
        position: '',
        description: '',
        salaryFrom: 0,
        salaryTo: 0,
        type: '',
        city: '',
        homeOffice: false
    });

    const handleInput = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    const handleCreate = () => {
        console.log(form);
        addJob(form);
    }
    const handleCheckbox = (e) => {
        const { name, checked } = e.target;
        setForm({ ...form, [name]: checked });
    };

    return (
        <div>
            <Nav />
            <h2>Munkaajánlat létrehozása</h2>
            <h3>Cég</h3>
            <input type="text" name="company" value={form.company} onInput={handleInput}></input>
            <h3>Pozició</h3>
            <input type="text" name="position" value={form.position} onInput={handleInput}></input>
            <h3>Leírás</h3>
            <input type="text" name="description" value={form.description} onInput={handleInput}></input>
            <h3>Minimum fizetés</h3>
            <input type="number" name="salaryFrom" value={form.salaryFrom} onInput={handleInput}></input>
            <h3>Maximum fizetés</h3>
            <input type="number" name="salaryTo" value={form.salaryTo} onInput={handleInput}></input>
            <h3>Típus</h3>
            <input type="text" name="type" value={form.type} onInput={handleInput}></input>
            <h3>Város</h3>
            <input type="text" name="city" value={form.city} onInput={handleInput}></input> <br />
            <span>Home office</span>
            <input type="checkBox" name="homeOffice" value={form.homeOffice} onChange={handleCheckbox}></input> <br /> <br />
            <button onClick={handleCreate}>Munka létrehozása</button>
        </div >
    )
}

export default AddJob
