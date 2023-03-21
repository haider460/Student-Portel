import Table from 'react-bootstrap/Table'
import React, {useEffect,useState} from 'react'
import { getAllStudentsRequests } from '../Services/studentRequest'
import '../style/style.css'
import { updateStudentRequestStatus } from '../Services/registrar'

export const RegistrarTable = () => {
	const [allResquet, setAllRequst] = useState([])
	const studentID = localStorage.getItem("studentId");
	const [isStateChanged, setIsStateChanged] = useState(false)
	
	const handleAllStudentRequests = async () => {
		if (studentID) {
			const request = await getAllStudentsRequests()
			const data = request?.response?.map(items => {
				const request =items?.requests?.map(item => {
					return {
						...item,
					name:items?.studentRef?.firstName + " " + items?.studentRef?.lastName
					} 
				})

				console.log('requestrequest 11',request)
				return request
			});
			setAllRequst(data.flat(Infinity))
			const ApprovedRequest= data.flat(Infinity)?.filter(item => item?.status == 'approved') 
				window.localStorage.setItem('AprovedRequest', ApprovedRequest);
		}
	}
	const handleStudentRequestatatus = (id, status) => {
		updateStudentRequestStatus(id, status)
		setIsStateChanged(!isStateChanged)
	}
	useEffect(() => {
		handleAllStudentRequests()
	}, [isStateChanged])

	return (
		<section>
			<h3 className='mb-3'>Registrar page</h3>
			<Table striped bordered>
				<thead>
					{headers?.map(item => (
						<th key={item}>{item}</th>
					))}
				</thead>
				<tbody>
					{ allResquet?.length ? allResquet?.map(item => (
						<tr key={item._id}>
							<td>{item.name}</td>
							<td>{item.subject}</td>
							<td>{item.status}</td>
							<td className='registrar-action'><button onClick={() => handleStudentRequestatatus(item._id, 'approved')} className='btn btn-info'>Accept</button>
							<button className='btn btn-danger' onClick={() => handleStudentRequestatatus(item._id, 'reject')}>Reject</button></td>
						</tr>
					)) :
						<center>
							<h3>No student request found</h3>
						</center>
						}
				</tbody>
			</Table>
		</section>
	)
}

const headers = ['Name', 'Subject', 'Status', 'Action']


