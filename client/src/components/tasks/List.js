import React from 'react'
import axios from '../../config/axios'
import {Link } from 'react-router-dom'
import moment from 'moment'

export default class TaskList extends React.Component{
    constructor(){
        super()
        this.state={
            tasks:[]
        }
    }

    componentDidMount(){
        axios.get('/tasks',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            const tasks=response.data
            this.setState({tasks})
        })
    }
    handleChange=(e)=>{
        const text=e.target.value
        this.setState({text})
    }

    handleClick=(id)=>{
        axios.delete(`/tasks/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            // window.location.reload()
            const tasks=this.state.tasks.filter(task=>task._id!==response.data._id)
            this.setState({tasks})
        })
        .catch(err=>{
            alert(err)
        })
    }
    render(){
        return(
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-3'>
                <h2>Listing Task-{this.state.tasks.length}</h2></div><div className='col-md-3 offset-md-6'>
                <Link to='/tasks/add '><button className='btn btn-outline-primary' >Add Task</button></Link></div></div>
                    <div className='row'>  {
                            this.state.tasks.map(task=>{
                                return (<div className="card col-md-4 mr-1 mb-4 container" key={task._id}> 
                                <div  className="card-body">
                                    <h3 className='card-header'>{task.title}</h3>
                                    <h3 className='card-title'>{task.state}</h3>
                                <div >{task.label.map(lab=>{
                                    return <p key={lab._id} className='card-text'>{lab.name}</p>
                                })}</div>
                                    <h6>{moment(task.dueDate).format("Do MMM YY, h:mm a")}</h6>
                                   <div className='card-footer row'> 
                                   <div className='col-md-3'>
                                    <button className='btn btn-primary' onClick={()=>this.handleClick(task._id)}>remove</button></div>
                                   
                                    <div className='col-md-3 offset-md-3'>
                                        <button className='btn btn-primary'>completed</button>
                                    </div>
                                    </div>
                                </div>
                                </div>    )
                            })
                        }
                </div>
            </div>
        )
    }
}


