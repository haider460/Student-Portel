import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { studentRequestForm } from '../Services/studentRequest'
import { useHistory } from 'react-router-dom';


export const StudentRequestForm = () => {
	//local states
	const [subject, setSubject] = useState('')
	const [error, setError] = useState({subject:'', description:''})
	const [description, setDescription] = useState('')
	const studentID = localStorage.getItem("studentId");
	const history = useHistory()

	const handleSubmit = async e => {
		e.preventDefault()
		if(subject && description){
			const data = {
				requests: [
					{
						subject,
						description
					}
				],
				studentRef: studentID
			}
			const res = await studentRequestForm(data)
			if (res) {
				history.push('/student-requests')
			}
		}else{
			if (error?.subject === '') {
				setError({...error,subject:'This field is required ' })
			}
			if (error?.description === '') {
				setError({...error,description:'This field is required' })
			}
			if (error?.subject === '' && error?.description === '') {
				setError({subject:'This field is required ',description:'This field is required' })
			}	
		}
	}

	return (
		<section className='login-page-card-section'>
			<h3 className='mb-3'>Application/Request Form</h3>
			<Form onSubmit={handleSubmit}>
				<Form.Group className='mb-3' controlId='formBasicEmail'>
					<Form.Label>Subject </Form.Label>
					<Form.Control
						requried
						value={subject}
						type='text'
						placeholder='Enter subject'
						onChange={(e)  => { setSubject(e.target.value); setError({...error,subject:'' })}}
					/>
					{ error?.subject && 
						<Form.Text className='text-danger'>
						{error?.subject}
					</Form.Text>
					}
					
				</Form.Group>

				<Form.Group className='mb-3' controlId='formBasicPassword'>
					<Form.Label>Description</Form.Label>
					<Form.Control
						requried ={true}
						value={description}
						type='descrition'
						placeholder='Write Application Description'
						onChange={e => { setDescription(e.target.value);  setError({...error,description:'' })}}
					/>
					{ error?.description && 
						<Form.Text className='text-danger'>
						{error?.description}
					</Form.Text>
					}
				</Form.Group>
				<Button variant='primary' type='submit'>
					Submit Application
				</Button>
			</Form>
		</section>
	)
}
