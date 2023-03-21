import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import {login} from '../Services/Auth'
import {  toast } from 'react-toastify';

export const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState({email:'', password:''})


	const history = useHistory()

	const handleSubmit = async e => {
		if (email && password) {
			e.preventDefault()
			const data = {
					email,
					password
				}
			const respone = await login(data)
			if (respone?.role) {
		
				toast.success("user logged in successfully", { autoClose: 30000 });
				window.localStorage.setItem('studentId', respone?._id);
				history.push(`/${respone?.role}-page`) 

			}
		} else {
			if (error?.email === '') {
				setError({...error,email:'This field is required ' })
			}
			if (error?.password === '') {
				setError({...error,password:'This field is required' })
			}
			if (error?.email === '' && error?.password === '') {
				setError({email:'This field is required ',password:'This field is required' })
			}	
		}
	}

	return (
		<section className='login-page-card-section'>
			<h3 className='mb-3'>Login Portal</h3>
			<Form onSubmit={handleSubmit}>
				<Form.Group className='mb-3' controlId='formBasicEmail'>
					<Form.Label>Email address</Form.Label>
					<Form.Control
						requried
						type='email'
						placeholder='Enter email'
						onChange={e => { setEmail(e.target.value); setError({...error,email:'' })}}
					/>
					<Form.Text className='text-muted'>
						We'll never share your email with anyone else.
					</Form.Text>
				</Form.Group>

				<Form.Group className='mb-3' controlId='formBasicPassword'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						requried
						type='password'
						placeholder='Password'
						onChange={e => { setPassword(e.target.value);  setError({...error,password:'' })}}
					/>
				</Form.Group>
				<Button variant='primary' type='submit'>
					Submit
				</Button>
			</Form>
		</section>
	)
}
