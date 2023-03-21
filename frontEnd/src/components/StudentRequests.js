import Table from 'react-bootstrap/Table'
import React, {useEffect,useState} from 'react'
import { getStudentRequests, SelectProgram } from '../Services/studentRequest'

export const StudentRequests = () => {
	const [allResquet, setAllRequst] = useState([])
	const[selectProgam, setSelectProgam] = useState('')
	
	const studentID = localStorage.getItem("studentId");
	const handleAllStudentRequests = async () => {
		if (studentID) {
			const request = await getStudentRequests(studentID)
			console.log('request111', request)
			setAllRequst(request?.requests)
			setSelectProgam(request?.program?.name)
		}
	}
	const handleProgram = (e) => {
		e.preventDefault()
		if (selectProgam) {
			const body = {
			name: selectProgam,
			studentRef: studentID
			}
			SelectProgram(body)
		}
	}
	useEffect(() => {
		handleAllStudentRequests()
	}, [])
	
	return (
		<section>
			<div>
			<h3 className='mb-3'>Student Requests</h3>
			<Table striped bordered>
				<thead>
					{headers?.map(item => (
						<th key={item}>{item}</th>
					))}
				</thead>
				<tbody>
					{allResquet?.map(item => (
						<tr key={item._id}>
							<td>{item.subject}</td>
							<td>{item.status}</td>
							<td>{item.description}</td>
						</tr>
					))}
				</tbody>
			</Table>
			</div>
			{ allResquet?.[0]?.status === 'approved' &&<div>
				<h3 className='mb-3'>Choose Program</h3>
				<form>
					<div class="form-check">
						<div>
							<input onChange={(e) => setSelectProgam(e.target?.value)} class="form-check-input" name='program' type="radio"  value="program 1" id="flexCheckChecked" checked = {selectProgam === "program 1"}  />
							<label class="form-check-label" for="flexCheckChecked">
								Program 1
							</label>
						</div>
						<div>
							<input class="form-check-input" onChange={(e) => setSelectProgam(e.target?.value)} name='program' type="radio" value="program 2" id="flexCheckChecked"  checked = {selectProgam === "program 2"} />
							<label class="form-check-label" for="flexCheckChecked">
								Program 2
							</label>
						</div>
						<div>
							<input class="form-check-input" onChange={(e) => setSelectProgam(e.target?.value)} name='program' type="radio"value="program 3" id="flexCheckChecked"  checked = {selectProgam === "program 3"} />
							<label class="form-check-label" for="flexCheckChecked">
								Program 3
							</label>
						</div>
						<div>
							<input class="form-check-input" onChange={(e) => setSelectProgam(e.target?.value)} name='program' type="radio"  value="program 4" id="flexCheckChecked" checked = {selectProgam === "program 4"}  />
							<label class="form-check-label" for="flexCheckChecked">
								Program 4
							</label>
						</div>
						<div>
							<input class="form-check-input" onChange={(e) => setSelectProgam(e.target?.value)} name='program' type="radio"  value="program 5" id="flexCheckChecked"  checked = {selectProgam === "program 5"} />
							<label class="form-check-label" for="flexCheckChecked">
								Program 5
							</label>
						</div>
						<button onClick={handleProgram} className='btn btn-primary'>Submit</button>
					</div>
				</form>
			</div>}
			
		</section>
	)
}

const headers = ['Subject', 'Status', 'Description']

