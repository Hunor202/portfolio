import React from 'react'
import { useLocation } from 'react-router-dom';
import Nav from '../../navBar/Nav';

const Job = () => {
    const location = useLocation();
    const { job } = location.state;
    return (
        <div>
            <Nav />
            <div>
                <h2>{job.company}</h2>
                <h3>{job.position}</h3>
                <p>{job.description}</p>
                <p><strong>Fizetés:</strong> {job.salaryFrom} - {job.salaryTo} HUF</p>
                <p><strong>Típus:</strong> {job.type}</p>
                <p><strong>Város:</strong> {job.city}</p>
                <p><strong>Home Office:</strong> {job.homeOffice ? 'Igen' : 'Nem'}</p>
            </div>
        </div >
    )
}

export default Job;