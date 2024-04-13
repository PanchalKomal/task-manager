import React from 'react';
import { useState, useEffect } from 'react';
import TaskList from './taskList';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import NewTask from './newTask';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Content(){
    const [addTask, setAddTask] = useState(false);
    const [filter, setFilter] = useState(1);
    const[taskList, setTaskList] = useState([]);

    const onAddTask = () => {
        setAddTask(!addTask);
    }
    
    const onRemoveTask = () => {

    }

    const onTaskSubmit = (taskDetail) => {
        const items = localStorage.getItem('taskList') ? JSON.parse(localStorage.getItem('taskList')) : [];
        items.push(taskDetail);
        localStorage.setItem('taskList', JSON.stringify(items));
        setAddTask(false);
    }   

    const onFilterChange = (event) => {
        setFilter(event.target.value);
    }

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('taskList'));
        if (items) {
            setTaskList(items);
        }
      }, []);

    return <div className='px-5 py-5'>
        <div className='flex items-center justify-between'>
            <div className='flex space-x-3'>
                <div>
                    <Button variant="outlined" startIcon={<AddIcon />} onClick={onAddTask}>
                        Add
                    </Button>
                </div>
                <div>
                    <Button variant="outlined" startIcon={<DeleteIcon />} onClick={onRemoveTask}>
                        Remove
                    </Button>
                </div>
            </div>
            <div>
                <FormControl sx={{ m: 1, minWidth: 80, margin:'0px' }}>
                    <InputLabel id="demo-simple-select-autowidth-label" sx={{fontSize: '12px'}}>Show</InputLabel>
                    <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={filter}
                        onChange={onFilterChange}
                        autoWidth
                        label="Show"                                       
                    >
                    <MenuItem value={1}>All</MenuItem>
                    <MenuItem value={2}>Pending</MenuItem>
                    <MenuItem value={3}>Completed</MenuItem>                    
                    </Select>
                </FormControl>
            </div>
        </div>
        {
            addTask && <NewTask onTaskSubmit={onTaskSubmit}/>
        }
        <TaskList pTaskList={taskList} />
    </div>
}

export default Content;