import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useLocation } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import {  toast } from 'react-toastify';


import { ScheduleMeeting } from '../Services/advisor';

export default function StudentRequestForm () {
	//local states
	const [date, setDate] = useState('')
	const location = useLocation();
	const navigate = useHistory();


	const handleSubmit = async e => {
		e.preventDefault()
		if (date) {
			const res = await ScheduleMeeting(location.state.detail)
			if (res) {
				navigate.push('/advisor-page')
				
			}
		}
	}

	return (
		<section className='login-page-card-section'>
			<h3 className='mb-3'>Meeting Schedule Form</h3>
			<Form onSubmit={handleSubmit}>
				<Form.Group className='mb-3' controlId='formBasicEmail'>
					<Form.Label>Subject</Form.Label>
					<Form.Control
						requried
						value={date}
                        type='date'
						placeholder='Enter Subject'
						onChange={e => setDate(e.target.value)}
					/>
					<Form.Text className='text-muted'>
						We'll never share your email with anyone else.
					</Form.Text>
				</Form.Group>
				<Button variant='primary' type='submit'>
					Submit Application
				</Button>
			</Form>
		</section>
	)
}



