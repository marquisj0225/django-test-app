import React, { useEffect, useRef, useState } from 'react'
import {
    FormWrap,
    Form,
    InputDiv,
    Input,
    TextArea,
    Button,
    Label,
} from "../../globalStyles"; 
import {AiOutlinePlusCircle} from "react-icons/ai" 

import axios from 'axios'
import { useDispatch } from 'react-redux'; 
import REACT_APP_API_URL from '../../testurl'
import alert from '../../redux/alert/actions'; 

export default function Navbar({setReload, reload}) {
    const dispatch = useDispatch()
    const [skill, setSkill] = useState(['', '', ''])
    const [formData, setFormData] = useState({
        title: '',
        description: ''
    }) 

    const {title, description} = formData

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = e => {
        // call the apis to save the job
        e.preventDefault() 
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json', 
            }
        };              
        const data = JSON.stringify({title, skill, description})
        axios.post(`${REACT_APP_API_URL}/api/jobs/`, data, config)
        .then((response) => { 
            dispatch(alert('Job Added Successfullly', 'success'))
            setFormData({
                title: '',
                description: ''
            }) 

        }).catch(() => { 
            dispatch(alert('Failed to add the job', 'danger'))
        })
    }

    return (
        <>
            <FormWrap>
                <Form onSubmit={onSubmit}>
                    <InputDiv size={12}>
                        <Label  htmlFor="title">Job Title</Label>
                        <Input required onChange={onChange} id="title" name="title" value={title} placeholder="Job Title" type="text" />
                    </InputDiv>

                    {
                        skill.map((item, i) => (
                            <InputDiv size={12}>
                                <Label htmlFor="skill">Job Skill {i+1}</Label>
                                <Input id="skill" onChange={e => {let tmpSkill=skill; tmpSkill[i]=e.currentTarget.value; setSkill(tmpSkill)}}    name="skill" placeholder="Job Skill" type="text" />
                            </InputDiv>
                        ))
                    }

                    <InputDiv style={{display: "flex", justifyContent: "center", alignItems: "center", fontSize: "42px", color: "var(--primary-color)"}} size={12}>
                        <AiOutlinePlusCircle onClick={e => setSkill([...skill, ""])} style={{cursor: 'pointer'}} />
                    </InputDiv>

                    <InputDiv   size={12}>
                        <TextArea required onChange={onChange} name="description" placeholder="Description" id="description" value={description} ></TextArea>
                    </InputDiv>


                    <InputDiv
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            width: "100%",
                        }}
                        size={12}
                    >
                        <Button type="submit" blockOnSmall>Post</Button>
                    </InputDiv>


                </Form>
            </FormWrap>
        </>
    )
}
