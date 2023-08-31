import express, {Request, Response} from 'express'

import { user } from './models/user'
import { dbs } from './models/dbs'
import { HTTP_STATUS } from './DATA'

const app = express()
const port = 3000
const jsonMiddleware = express.json()
app.use(jsonMiddleware)

const db = new dbs();

app.get('/', (req, res) => { res.json(db.courses) })
app.get('/user', (req: Request, res: Response) => {
	const users = new user();
	res.send(users.getUserId())
	//res.sendStatus(HTTP_STATUS.BAD_REQ_400);
})
app.get('/c', (req, res) => {

	/*
	fetch('http://localhost:3000/c?title=w', {methot: 'GET'}).
		then(res => res.json())
		.then(json => console.log(json))
	*/

	let fountC = db.courses;

	if (req.query.title) {
		fountC = fountC
		.filter(c => c.title.indexOf(req.query.title as string) > -1)
	}


	res.json(fountC)
})
app.get('/c/:id', (req, res) => {

	const findC = db.courses.find(c => c.id === +req.params.id)

	if (!findC) {
		res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
		return;
	} 

	res.json(findC)

})

app.post('/c', (req, res) => {
// fetch('http://localhost:3000/c', {method: 'POST', 
// body: JSON.stringify({ title: 'dba'}),
//  headers:{'content-type' : 'application/json'}})
// .then(res => res.json())
// .then(json => console.log(json))

	if (!req.body.title){
		res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
		return
	}

	const createCourse = {
		id: +(new Date()),
		title: req.body.title
	}
	
	db.courses.push(createCourse)
	res.status(HTTP_STATUS.OK_200)
	res.json(createCourse)
})

app.delete('/c/:id', (req, res) => {
	// fetch('http://localhost:3000/c/2', {method: 'DELETE'})
	db.courses = db.courses.filter(c => c.id !== +req.params.id);
	res.sendStatus(HTTP_STATUS.NO_CONTENT_204) 
})

app.put('/c/:id', (req, res) => {
	if (!req.body.title){
		res.sendStatus(HTTP_STATUS.BAD_REQ_400);
		return;
	}
	const fountC = db.courses.find(c => c.id !== +req.params.id);
	if (!fountC){
		res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
		return;
	}
	fountC.title = req.body.title
	res.json(fountC)
})

app.listen(port, () => {
  	console.log(`Example app listening on port ${port}`)
})