import React from 'react';
import {useState} from 'react';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';

function NewTask({onTaskSubmit}){
    
    const [textTask, setTextTask] = useState("");
    const [textDesc, setTextDesc] = useState("");
    const [dueDate, setDueDate] = useState(dayjs().startOf('day').format('DD-MMM-YYYY'));

    const onSubmit = () => {
        let taskDetail = {
          Id:Math.random(),
          Task: textTask,
          DueOn:dueDate,
          Description: textDesc,
          Status: "Pending"
        }
        onTaskSubmit(taskDetail);
    }    

    return <div className='py-5 px-5 border mt-3 max-w-screen-sm'>
        <div>
            <TextField
                required
                id="outlined-required"
                label="Task"
                defaultValue=""          
                size="small"
                onChange={(event) => {setTextTask(event.target.value)}}
                InputProps = {{'data-testid': "Task"}}
            />
        </div>
        <div className='mt-3'>
            <TextField
                id="outlined-multiline-flexible"
                label="Description"
                multiline  
                rows={4} 
                size="small"    
                onChange={(event) => {setTextDesc(event.target.value)}}  
                InputProps={{style: {padding:'0px'}, 'data-testid': "Description"}}
                
            />
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className='mt-3'>
                <DatePicker 
                    defaultValue={dayjs().startOf('day')} 
                    sx={{maxWidth: '200px', fontSize: '0.8rem'}}
                    onChange={(value) => {setDueDate(value.format('DD-MMM-YYYY'))}}                                   
                />        
            </div>
        </LocalizationProvider>
        <div className='mt-5 flex justify-end'>
            <Button variant="outlined" onClick={onSubmit} disabled={textTask != "" ? false : true}>
                Submit
            </Button>
        </div>
    </div>
}

export default NewTask;