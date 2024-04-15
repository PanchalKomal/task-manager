import React from 'react';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import CheckIcon from '@mui/icons-material/CheckCircle';
import CheckIconOutlined from '@mui/icons-material/CheckCircleOutlined';
import { lightGreen } from '@mui/material/colors';

function TaskDetails({row}) { 

  return <Box sx={{ fontSize:'0.8rem', backgroundColor:'#fafafa'}}>
    <div className='border rounded-md px-5 py-5 space-y-3'>
    <h1 className='font-bold'>{row.Task}</h1>
    <div>Due On: {row.DueOn} </div>
    <div>{row.Description}</div>
    </div>
  </Box>;
}

function Task(props) {
    const { row, isSelected, onRowSelect, onStatusChange } = props;
    const [open, setOpen] = React.useState(false);
  
    const onRowSelected = (event) => {
      onRowSelect(event, row.Id);
    }
    return (
      <React.Fragment>
        <TableRow>
          <TableCell>
          <Checkbox
            color="primary"          
            onChange={onRowSelected}
            checked = {isSelected}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
          </TableCell>
          <TableCell component="th" scope="row" onClick={() => {setOpen(!open)}} sx={{ cursor:'pointer'}}>
            {row.Task}
          </TableCell>
          <TableCell align="right" sx={{ border:'none', fontSize:'0.8rem'}}>{row.DueOn}</TableCell>
          <TableCell align="right" sx={{ border:'none', fontSize:'0.8rem'}}>
            {
              row.Status == 'Completed'  
              ? <CheckIcon sx={{color: lightGreen[500], fontSize:'25px', cursor:'pointer'}} onClick={() => onStatusChange(0, row.Id)}/>
              : <CheckIconOutlined sx={{color: lightGreen[500], fontSize:'25px', cursor:'pointer'}} onClick={() => onStatusChange(1, row.Id)}/>
            }
          </TableCell>          
        </TableRow>      
        <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <TaskDetails row={row} />            
          </Collapse>
        </TableCell>
      </TableRow>     
      </React.Fragment>
    );
  }

function TaskList(props) {

    const {pTaskList, onRowSelect, onSelectAllClick, selected, onStatusChange} = props;  

    return <TableContainer  style={{marginTop:'20px'}}>
    <Table size="small" aria-label="task list table" >
      <TableHead sx={{borderBottom:'1px solid #aaaaaa'}}>
        <TableRow>          
          <TableCell sx={{width:'50px'}}>
            <Checkbox
                color="primary"
                indeterminate={selected.length > 0 && selected.length < pTaskList.length}
                checked={pTaskList.length > 0 && selected.length === pTaskList.length}
                onChange={(event) => onSelectAllClick(event)}
                inputProps={{
                'aria-label': 'select all task',
                }}
            />
          </TableCell>
          <TableCell>Task</TableCell>
          <TableCell align="right">Due On</TableCell>
          <TableCell align="right" >Status</TableCell>          
        </TableRow>
      </TableHead>
      <TableBody>
        {pTaskList.map((row) => (
          <Task 
            key={row.Id} 
            row={row} 
            isSelected={selected.indexOf(row.Id) !== -1} 
            onRowSelect={(event, id) => onRowSelect(event, id)}
            onStatusChange={(status, id) => onStatusChange(status, id)}
          />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
}


export default TaskList;