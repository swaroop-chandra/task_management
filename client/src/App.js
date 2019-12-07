import React from 'react'

import Home from './components/common/Home'

import Register from './components/users/register'
import Login from './components/users/login'

import AddTask from './components/tasks/addTask'
import TaskList from './components/tasks/List'

import axios from './config/axios'
import {BrowserRouter,Route,Link,Switch} from 'react-router-dom'

function handleClick(){
  axios.delete('/users/logout',{
    headers:{
      'x-auth':localStorage.getItem('authToken')
    }
  })
  .then(response=>{
    alert(response.data.notice)
    localStorage.removeItem('authToken')
    window.location.href='/'
  })
}
function App() {
  return (
    <div className='container'>
    <BrowserRouter>
    <h2>Task Manager</h2>
      {
        localStorage.getItem('authToken')?(
          <div>
            <Link to='/'>Home</Link> |
            <Link to='/tasks'>Tasks</Link> |
            <Link to='#' onClick={handleClick}>logout</Link>
          </div>):(<ul><div>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/users/register'>register</Link></li>
            <li><Link to='/users/login'>login</Link></li>
          </div>
          </ul>
        )
      }
      

      <Route path='/' component={Home} exact={true}/>
      <Route path='/users/register' component={Register}/>
      <Route path='/users/login' component={Login}/>

      <Switch>
      <Route path='/tasks' component={TaskList} exact={true}/>
      <Route path='/tasks/add' component={AddTask}/>
      </Switch>
      
    </BrowserRouter>
    </div>
  )
}

export default App;
