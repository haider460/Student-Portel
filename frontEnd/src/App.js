import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Switch,BrowserRouter } from "react-router-dom"
import { LoginPage, StudentRequestFormPage, StudentRequestsPage, Registrar, Advisor } from './pages'
import ScheduleMeetingForm from './components/ScheduleMeetingForm'

function App() {
	return (
		<BrowserRouter forceRefresh={true}>
			<Switch>
					<Route exact path='/student-requests' component={StudentRequestsPage} />
					<Route exact path='/student-page' component={StudentRequestFormPage }  />
					<Route exact path='/registrar-page' component={Registrar}  />
					<Route exact path='/advisor-page' component={Advisor }  />
					<Route exact path='/schedule-meeting-form' component={ ScheduleMeetingForm }  />
					<Route exact path='/' component={ LoginPage }  />
				
		    </Switch>
		</BrowserRouter>
		
	)
}

export default App
