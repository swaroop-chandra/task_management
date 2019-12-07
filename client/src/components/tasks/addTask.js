import React from 'react'
import axios from '../../config/axios'
import Form from './Form'

export default class AddTask extends React.Component{
    constructor(){
        super()
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    handleSubmit(formData){
        axios.post('/tasks',formData,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            // console.log(response.data)
            this.props.history.push('/tasks')
        })
        console.log(formData)
    }
    render(){
        return (
            <div>
                <Form handleSubmit={this.handleSubmit}/>
            </div>
        )
    }
}