import React from 'react'
import axios from '../../config/axios'
import CreatableSelect from 'react-select/creatable'
import Select from 'react-select'
import DateTime from 'react-datetime/DateTime'


export default class Form extends React.Component{
    constructor(props){
        super(props)
        this.state={
            title:'',
            state:'',
            // startDate:Date,
            dueDate:Date,
            label:[],
            selectlabels:[],
            options:[],
            states:[{value:1,label:'new'},{value:2,label:'on-progress'}]
        }
    }

    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    componentDidMount=()=>{
        axios.get('/labels',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            let obj=[]
            const datas=response.data
            datas.map(data=>{
                obj=obj.concat({value:data._id,label:data.name})
            })
            this.setState({options:obj})
            // console.log(obj)

        })


    }

    handleSubmit=(e)=>{
        e.preventDefault()
        const labfil=this.state.selectlabels.filter(lab=>lab.__isNew__)
        let array=[]
        labfil.map(lab=>array.push({name:lab.label}))
        axios.post('/labels/insert_all',array,{
                headers:{
                    'x-auth':localStorage.getItem('authToken')
                }
            })
            .then(response=>{
                // this.props.history.push('/tasks')
                console.log(response.data)
                axios.get('/labels',{
                    headers:{
                        'x-auth':localStorage.getItem('authToken')
                    }
                })
                .then(response=>{
                    const label=response.data
                    this.setState({label})
                })
                .catch(err=>{
                    alert(err)
                })
                
            .catch(err=>{
                alert(err)
            })
        
            let labelData=[]
                setTimeout(()=>{
                    this.state.label.map(lab=>{
                        this.state.selectlabels.map(sele=>{
                            if(sele.label==lab.name){
                                labelData.push(lab._id)
                            }
                        })
                    })
                    const formData={
                        title:this.state.title,
                        state:this.state.state,
                        label:labelData,
                        dueDate:this.state.dueDate,
                    }
                    console.log(formData)
                    this.props.handleSubmit(formData)
                },2000)
            })
        
    }

    changeHandle = (newValue) => {
        this.setState({ state: newValue.label });
      }

    changeHandle1= (newValue) => {
        this.setState({ selectlabels: newValue });
      }

      handleChange1=(Date)=>{
        console.log(Date._d)
          this.setState({dueDate:Date._d})
      }

    render(){
        // console.log(this.state.options)
        return (
            <div className='row'>
                <div className='col-md-4 offset-md-4'>
                <h2>Form for Adding task</h2>
                <form onSubmit={this.handleSubmit}>
                <label>title:</label>
                <input type='text' value={this.state.title} onChange={this.handleChange} name='title'/>
                <label>status:</label>
                <Select onChange={this.changeHandle} options={this.state.states}/>
                <label>label:</label>
                <CreatableSelect isMulti onChange={this.changeHandle1} options={this.state.options} />
                <label>due-date:</label>
{/* <input type='date' onChange={this.handleChange} name='dueDate'/> */}

                    <DateTime selected={this.state.dueDate} onChange={this.handleChange1} name='dueDate' dateFormat="MM/DD/YYYY"/>    
                <input type='submit'/>
                </form>
            </div></div>
        )
    }
}


{/* <input type='date' onChange={this.handleChange} name='dueDate'/> */}

