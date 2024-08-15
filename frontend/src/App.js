import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [leads, setLeads] = useState([]);
  const [roles, setRoles] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cnae, setCnae] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    role: '',
    industry: '',
    country: '',
    CNAE: ''
  });

  console.log(selectedFilters)
  useEffect(() => {
    axios.get('http://localhost:5000/api/leads?industry=Entertainment')
      .then(response => {
        setLeads(response.data);
      })
      .catch(error => console.error('Error fetching leads:', error));

    axios.get('http://localhost:5000/api/leads/roles')
      .then(response=>{
        setRoles(response.data);
      })
      .catch(error => console.error('Error en el fecth de roles:', error));

    axios.get('http://localhost:5000/api/leads/industries')
      .then(response=>{
        setIndustries(response.data);
      })
      .catch(error => console.error('Error en el fecth de industries:', error));

    axios.get('http://localhost:5000/api/leads/countries')
      .then(response=>{
        setCountries(response.data);
      })
      .catch(error => console.error('Error en el fecth de countries:', error));

    axios.get('http://localhost:5000/api/leads/cnae')
      .then(response=>{
        setCnae(response.data);
      })
      .catch(error => console.error('Error en el fecth de cnae:', error));

  }, []);

  function handleFilterChange(event){
    const { name, value } = event.target;
    setSelectedFilters({
      ...selectedFilters,
      [name]: value
    });
  }

  function handleFilter(){
    axios.get('http://localhost:5000/api/leads', {params: selectedFilters })
      .then(response=>{
        setLeads(response.data);
      })
      .catch(error=> console.error('Error en el fecth de filtros:', error));
  }

  function handleDownload(){
    const leadEmails = leads.map(lead=> lead.email);
    axios.post('http://localhost:5000/api/leads/download',{
      emails: leadEmails
    },{
      responseType: 'blob'
    })
    .then(response=>{
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'leads.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    })
    .catch(error=>console.error('Error en la descarga del CSV:', error))
  }

  return (
    <div className="">
      <header className='px-6'>
        <h1 className="text-xl font-bold mb-2">Leads</h1>

        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Role</label>
            <select name="role" onChange={handleFilterChange} className="w-full p-2 border border-gray-300 rounded">
              <option value={''}>Select a Role</option>
              {roles.map((role, index) => (
                <option key={index} value={role}>{role}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Industry</label>
            <select name="industry" onChange={handleFilterChange} className="w-full p-2 border border-gray-300 rounded">
              <option value={''}>Select an Industry</option>
              {industries.map((industry, index) => (
                <option key={index} value={industry}>{industry}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Country</label>
            <select name="country" onChange={handleFilterChange} className="w-full p-2 border border-gray-300 rounded">
              <option value={''}>Select a Country</option>
              {countries.map((country, index) => (
                <option key={index} value={country}>{country}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">CNAE</label>
            <select name="CNAE" onChange={handleFilterChange} className="w-full p-2 border border-gray-300 rounded">
              <option value={''}>Select a CNAE</option>
              {cnae.map((cnae, index) => (
                <option key={index} value={cnae}>{cnae}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4 flex justify-evenly">
          <button onClick={handleFilter} className="mt-4 bg-blue-700 text-white p-2 rounded">Filter</button>
          <button onClick={handleDownload} className="mt-4 bg-green-700 text-white p-2 rounded">Submit</button>
        </div>
      </header>

      <div className="overflow-x-auto">
        {leads.length === 0 ? (
          <div className='text-center text-red-500 mt-10'>
            No leads found, try other filters.
          </div>
        ):(
          <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white text-xs">
            <tr>
              <th className="w-auto text-left py-2 px-1">Email</th>
              <th className="w-auto text-left py-2 px-1">Full Name</th>
              <th className="w-auto text-left py-2 px-1">First Name</th>
              <th className="w-auto text-left py-2 px-1">Last Name</th>
              <th className="w-auto text-left py-2 px-1">LinkedIn Url</th>
              <th className="w-auto text-left py-2 px-1">Company Name</th>
              <th className="w-auto text-left py-2 px-1">Company Website</th>
              <th className="w-auto text-left py-2 px-1">Ice Breaker</th>
              <th className="w-auto text-left py-2 px-1">Country</th>
              <th className="w-auto text-left py-2 px-1">Location</th>
              <th className="w-auto text-left py-2 px-1">Industry</th>
              <th className="w-auto text-left py-2 px-1">Company Profile Url</th>
              <th className="w-auto text-left py-2 px-1">Civility</th>
              <th className="w-auto text-left py-2 px-1">Role</th>
              <th className="w-auto text-left py-2 px-1">CNAE</th>
              <th className="w-auto text-left py-2 px-1">Company Website</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-xs">
            {leads.map((lead, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="w-auto text-left py-2 px-1 break-words">{lead.email}</td>
                <td className="w-auto text-left py-2 px-1 break-words">{lead.fullName}</td>
                <td className="w-auto text-left py-2 px-1 break-words">{lead.firstName}</td>
                <td className="w-auto text-left py-2 px-1 break-words">{lead.lastName}</td>
                <td className="w-auto text-left py-2 px-1 break-words">{lead.linkedInUrl}</td>
                <td className="w-auto text-left py-2 px-1 break-words">{lead.companyName}</td>
                <td className="w-auto text-left py-2 px-1 break-words">{lead.companyWebsite}</td>
                <td className="w-auto text-left py-2 px-1 break-words">{lead.icebreaker}</td>
                <td className="w-auto text-left py-2 px-1 break-words">{lead.country}</td>
                <td className="w-auto text-left py-2 px-1 break-words">{lead.location}</td>
                <td className="w-auto text-left py-2 px-1 break-words">{lead.industry}</td>
                <td className="w-auto text-left py-2 px-1 break-words">{lead.companyProfileUrl}</td>
                <td className="w-auto text-left py-2 px-1 break-words">{lead.civility}</td>
                <td className="w-auto text-left py-2 px-1 break-words">{lead.role}</td>
                <td className="w-auto text-left py-2 px-1 break-words">{lead.CNAE}</td>
                <td className="w-auto text-left py-2 px-1 break-words">{lead.companywebsite_1}</td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
      </div>
    </div>
  );
}

export default App;
