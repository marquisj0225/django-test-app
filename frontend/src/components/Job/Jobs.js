import React, { useEffect, useRef, useState } from 'react'


import { useDispatch } from 'react-redux';
import axios from 'axios'
import REACT_APP_API_URL from '../../testurl'
import alert from '../../redux/alert/actions';

import '../../assets/css/table.css'
import OffCanvas from '../../components/OffCanvas/OffCanvas'

export default function Jobs({ reload }) {
    const [jobs, setJobs] = useState([])
    const [showDetails, setShowDetails] = useState(false)
    const [details, setDetails] = useState({})
    const dispatch = useDispatch()
    useEffect(() => {

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        };
        // calling api to fetch all the jobs
        axios.get(`${REACT_APP_API_URL}/api/jobs/`, config)
            .then((response) => {
                setJobs(response.data)
            }).catch(() => {
                dispatch(alert('Failed fetch jobs', 'danger'))
            })
    }, [])

    // this function will be called on row click  
    const showAllDetails = (id) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        };
        // fetching sing;e job data
        axios.get(`${REACT_APP_API_URL}/api/jobs/${id}/`, config)
            .then((response) => {
                setDetails(response.data)
                setShowDetails(true)
            }).catch(() => {
                dispatch(alert('Failed to fetch job', 'danger'))
            })
    }

    return (
        <>
            <table>
                <tr>
                    <th>Title</th>
                    <th>Skills</th>
                </tr>
                {
                    jobs.map(job => (
                        <>
                            <tr style={{ cursor: 'pointer' }} onClick={e => showAllDetails(job.id)}>
                                <td>{job.title}</td>
                                <td>{job.skills.map(skill => `${skill}, `)}</td>
                            </tr>
                        </>
                    ))
                }
            </table>
            <OffCanvas show={showDetails} setShow={setShowDetails}>
                {
                    showDetails ? (
                        <>
                            <div class="heading">
                                <h1>Title:</h1>
                                <p>{details.title}</p>
                            </div>
                            <div class="heading">
                                <h1>Skills:</h1>
                                <p>{details.skills.map(skill => `${skill}, `)}</p>
                            </div>
                            <div class="heading">
                                <h1>Description:</h1>
                                <p>{details.description}</p>
                            </div>
                        </>
                    ) : ''
                }
            </OffCanvas>
        </>
    )
}
