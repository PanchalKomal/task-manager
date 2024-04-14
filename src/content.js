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
    const [taskList, setTaskList] = useState([]);
    const [selected, setSelected] = useState([]);
    const [allTaskList, setAllTaskList] = useState([]);

    const onAddTask = () => {
        setAddTask(!addTask);
    }
    
    const onRemoveTask = () => {
        let items = localStorage.getItem('taskList') ? JSON.parse(localStorage.getItem('taskList')) : [];
        selected.map((id) => {
            items = items.filter((x) => x.Id != id);
        });
        localStorage.setItem('taskList', JSON.stringify(items));        
        setAllTaskList(items);
    }

    const onTaskSubmit = (taskDetail) => {
        const items = localStorage.getItem('taskList') ? JSON.parse(localStorage.getItem('taskList')) : [];
        items.push(taskDetail);
        localStorage.setItem('taskList', JSON.stringify(items));
        setAddTask(false);
        setAllTaskList(items);        
    }   

    const onFilterChange = (event) => {
        setFilter(event.target.value);
        setSelected([]);
        if(event.target.value == 1){
            setTaskList(allTaskList);
        }
        else if(event.target.value == 2){
            setTaskList(allTaskList.filter((t) => t.Status == 'Pending'));
        }
        else if(event.target.value == 3){
            setTaskList(allTaskList.filter((t) => t.Status == 'Completed'));
        }
    }

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('taskList'));
        if (items) {
            setTaskList(items);
            setAllTaskList(items);
        }
      }, []);

      useEffect(() => {
        if(filter == 1){
            setTaskList(allTaskList);
        }
        else if(filter == 2){
            setTaskList(allTaskList.filter((t) => t.Status == 'Pending'));
        }
        else if(filter == 3){
            setTaskList(allTaskList.filter((t) => t.Status == 'Completed'));
        }
      }, [allTaskList]);

      const onSelectAllClick = (event) => {
        if (event.target.checked) {
          const newSelected = taskList.map((task) => task.Id);
          setSelected(newSelected);
          return;
        }
        setSelected([]);
      }
  
      const onRowSelect = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
    
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
          newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
          );
        }
        setSelected(newSelected);
      }

      const onStatusChange = (status, id) => {
        let local = [...allTaskList];
        local.map((task) => {
            if(task.Id == id){
                task.Status = status == 1 ? 'Completed' : 'Pending';
            }
        });

        setAllTaskList(local);
        localStorage.setItem('taskList', JSON.stringify(local));
      }

    const completedCount = allTaskList.filter((n) => n.Status == 'Completed').length;
    const pendingCount = allTaskList.filter((n) => n.Status != 'Completed').length;

    return <div className='px-5 py-5'>
        <div className='flex items-center justify-between'>
            <div className='flex space-x-3'>
                <div>
                    <Button variant="outlined" startIcon={<AddIcon />} onClick={onAddTask}>
                        Add
                    </Button>
                </div>
                <div>
                    <Button variant="outlined" startIcon={<DeleteIcon />} onClick={onRemoveTask} disabled={!selected.length > 0}>
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
                    <MenuItem value={1}>All ({allTaskList.length})</MenuItem>
                    <MenuItem value={2}>Pending ({pendingCount})</MenuItem>
                    <MenuItem value={3}>Completed ({completedCount})</MenuItem>                    
                    </Select>
                </FormControl>
            </div>
        </div>
        {
            addTask && <NewTask onTaskSubmit={onTaskSubmit}/>
        }        
        { taskList.length > 0 && <TaskList 
            pTaskList={taskList} 
            onSelectAllClick={onSelectAllClick}
            onRowSelect={onRowSelect}
            numSelected={selected.length}
            selected={selected}
            onStatusChange={onStatusChange}
        />}
    </div>
}

export default Content;