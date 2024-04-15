import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import NewTask from './newTask';
import dayjs from 'dayjs';

test('it shows three inputs and a button', () => {
  // render the component
  render(<NewTask />); 
  // Manipulate the component or find an element in it
  
  const inputs = screen.getAllByRole('textbox');
 
    const button = screen.getByText(/Submit/i);

  // Assertion - make sure the component is doing
  // what we expect it to do
  expect(inputs).toHaveLength(3);
  expect(button).toBeInTheDocument();
});

test('Submit button is enabled when no text in Task input and enbled when text added to Task field', async () => {
    // render the component
    render(<NewTask />);    
    
    const taskInput = screen.getByTestId("Task");   
    const button = screen.getByText(/Submit/i); 
      
    expect(button).toBeDisabled();

    // Simulate typing in a Task
    await user.click(taskInput);
    await user.keyboard('Test');

    expect(button).not.toBeDisabled();

  });

  test('it calls onTaskSubmit when the submit is clicked', async () => {
    const mock = jest.fn();

    render(<NewTask onTaskSubmit={mock}/>);    
    
    const taskInput = screen.getByTestId("Task");   
    const descInput = screen.getByTestId("Description");     
   
    await user.click(taskInput);
    await user.keyboard('Test');

    await user.click(descInput);
    await user.keyboard('Test Desc');

    const date = dayjs().startOf('day').format('DD-MMM-YYYY');
    const button = screen.getByText(/Submit/i); 
    await user.click(button);

    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledWith( expect.objectContaining({ Id:expect.any(Number) ,Task: 'Test', Description: 'Test Desc', DueOn: date, Status: 'Pending' }));
  });
