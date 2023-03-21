import Table from 'react-bootstrap/Table'
import { useHistory } from 'react-router-dom';
import React, {useEffect,useState} from 'react'
import { getAllStudentsRequests } from '../Services/studentRequest';
import { updateStudentProgramStatus } from '../Services/advisor';


export const AdivsorTable = () => {
	const [allApprovedRequest, setAllApprovedRequest] = useState([])
	const [allPrograms, setAllPrograms] = useState([])
	const [isProgramUpdate, setIsProgramUpdate] = useState(false)

		console.log('22222222',allPrograms)


	const handleAllStudentRequests = async () => {
		const request = await getAllStudentsRequests()
		console.log('111111', request?.response)
		const draft = request?.response;
		const data_ = draft.map((obj) => {
			const _data = { _id: obj._id, ...obj?.program };
			return _data;
		})
		setAllPrograms([...data_])
		const data = request?.response?.map(items => {
			
			
				const request =items?.requests?.map(item => {
					return {
						...item,
						name: items?.studentRef?.firstName + " " + items?.studentRef?.lastName, 
					    email: items?.studentRef?.email
					} 
				})
				
				return request
			});
			const allRequest= data.flat(Infinity) 
		    const ApprovedRequest = allRequest?.filter(item => item?.status == 'approved')
		setAllApprovedRequest(ApprovedRequest)
	}
	useEffect(() => {
		handleAllStudentRequests()
	}, [isProgramUpdate])

	const handleStudentRequestatatus = (id, status) => { 
		updateStudentProgramStatus(id, status)
		setIsProgramUpdate(!isProgramUpdate)
	}
	
	const history =  useHistory();
	return (
		<>
			<section className='mb-5'>
			<h3 className='mb-3'>Advisor page</h3>
			<Table striped bordered>
				<thead>
					{headers?.map(item => (
						<th key={item}>{item}</th>
					))}
				</thead>
				<tbody>
					{allApprovedRequest?.length ? allApprovedRequest?.map(item => (
						<tr key={item.id}>
							<td>{item.name}</td>
							<td>{item.status}</td>
							<td>{item.subject}</td>
							<td>{item.description}</td>
							<td>
								<button className='btn btn-info' onClick={() => history.push({
											pathname: '/schedule-meeting-form',
											state: { detail: item.email }
							})}>Schedule Meeting</button>
							</td>
						</tr>
					)) : <center>
								<h3>No student request found</h3>
						</center>}
				</tbody>
			</Table>
		</section>
			
			<section>
			<h3 className='mb-3'>Approved and reject programs</h3>
			<Table striped bordered>
				<thead>
					{Progheaders?.map(item => (
						<th key={item}>{item}</th>
					))}
				</thead>
				<tbody>
						{allPrograms?.length ? allPrograms?.map(item => (
							item?.name && (
								<tr key={item?._id}>
							<td>{item?.name}</td>
							<td>{item?.status}</td>
							<td className='registrar-action'><button onClick={() => handleStudentRequestatatus(item?._id, 'approved')} className='btn btn-info'>Accept</button>
							<button className='btn btn-danger' onClick={() => handleStudentRequestatatus(item?._id, 'reject')}>Reject</button></td>
						</tr>
							)
						)) : <center>
								<h3>No student programs found</h3>
						</center>
						
					}
				</tbody>
			</Table>
		</section>
		</>
		
	)
}

const headers = ['Name', 'status', 'Subject', 'Description', 'Action']
const Progheaders = ['Program','status','Action']


