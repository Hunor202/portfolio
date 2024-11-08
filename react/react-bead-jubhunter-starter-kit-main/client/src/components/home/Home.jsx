import React, { useState } from 'react';
import Nav from '../navBar/Nav.jsx';
import { useGetJobsQuery } from '../../store/jobApiSlice.js';
import './home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { data, error, isLoading } = useGetJobsQuery();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState({
    salaryFrom: '',
    salaryTo: '',
    type: '',
    homeOffice: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleOnClick = (job) => {
    navigate(`/job/${job.id}`, { state: { job } });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: type === 'checkbox' ? checked : value || '',
    }));
  };

  const filteredJobs = data.data.filter((job) => {
    const matchSearchTerm = job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchSalary =
      (!filter.salaryFrom || job.salaryFrom >= parseInt(filter.salaryFrom)) &&
      (!filter.salaryTo || job.salaryTo <= parseInt(filter.salaryTo));
    const matchType = !filter.type || job.type === filter.type;
    const matchHomeOffice = !filter.homeOffice || job.homeOffice === filter.homeOffice;

    return matchSearchTerm && matchSalary && matchType && matchHomeOffice;
  });

  return (
    <div>
      <Nav />
      <h2>Kezdőlap</h2>
      <div className="search-filter">
        <input
          type="text"
          placeholder="Keresés..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div>
          <label>
            Fizetés (min):
            <input
              type="number"
              name="salaryFrom"
              value={filter.salaryFrom || ''}
              onChange={handleFilterChange}
            />
          </label>
          <label>
            Fizetés (max):
            <input
              type="number"
              name="salaryTo"
              value={filter.salaryTo || ''}
              onChange={handleFilterChange}
            />
          </label>
          <label>
            Foglalkoztatás típusa:
            <select
              name="type"
              value={filter.type || ''}
              onChange={handleFilterChange}
            >
              <option value="">Mindegy</option>
              <option value="full-time">Teljes állás</option>
              <option value="part-time">Részmunkaidő</option>
              <option value="internship">Gyakornoki</option>
            </select>
          </label>
          <label>
            Home Office lehetőség:
            <input
              type="checkbox"
              name="homeOffice"
              checked={filter.homeOffice}
              onChange={handleFilterChange}
            />
          </label>
          <button onClick={() => setFilter({
            salaryFrom: '',
            salaryTo: '',
            type: '',
            homeOffice: false,
          })}>Szűrés törlése</button>
        </div>
      </div>
      <div className="job-list">
        {
          filteredJobs.map((job, index) =>
            <div onClick={() => handleOnClick(job)} className="job-item" key={index}>
              <h2>{job.company}</h2>
              <p><strong>Fizetés:</strong> {job.salaryFrom} - {job.salaryTo} HUF</p>
              <p><strong>Típus:</strong> {job.type}</p>
              <p><strong>Home Office:</strong> {job.homeOffice ? 'Igen' : 'Nem'}</p>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Home;
