import React, { useEffect,  useState } from 'react'

import axios from 'axios'
import REACT_APP_API_URL from '../../testurl'
import { useDispatch } from 'react-redux'; 
import alert from '../../redux/alert/actions'; 



function Skils({reload}) {
    const [skills, setSkills] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json', 
            }
        };               
        axios.get(`${REACT_APP_API_URL}/api/skills/`,  config)
        .then((response) => {  
            setSkills(response.data)
        }).catch(() => { 
            dispatch(alert('Failed fetch skills', 'danger'))
        }) 
    }, [])
  
  return (
    <>
        <div className="skills-wrap" >
            {
                skills.map(skill => (
                    <>
                        <h3 ><span>{skill.name}: </span><span> {skill.used}</span></h3> 
                    </>
                ))
            }
        </div>
    </>
  );
}

export default Skils;


