import React,{useState} from 'react';
import styles from './TaskComponent.module.scss'
import { useDispatch } from 'react-redux';
import { deleteTaskById,getTaskSlice,setTaskIdDone } from '../../redux/slices/taskSlice';

const TaskComponent = ({task,taskNumber}) => {
    const [taskIsDoneHandler,setTaskIdDoneHandler] = useState(task.isDone)

    const dispatch = useDispatch();

    
    const deleteHandler = async ()=>{
        await dispatch(deleteTaskById(task._id))
        await dispatch(getTaskSlice());
    }

    const setIsDoneHandler = async(event)=>{
        // event.preventDefault()
        setTaskIdDoneHandler(!taskIsDoneHandler)
        await dispatch(setTaskIdDone({taskId: task._id,taskBody: {isDone: `${!taskIsDoneHandler}`}}))
        // await dispatch(getTaskSlice())
    }

    
    return (
        <article className={taskIsDoneHandler?styles['card-wrapper-is-done']:styles['card-wrapper']}>
            <h1>Task №{++taskNumber}</h1>
            <p  className={taskIsDoneHandler?styles.isDone:''}><input type='checkbox' checked={taskIsDoneHandler} onChange={setIsDoneHandler}/>{task.body}</p>
            {/* <p>Task done: {task.isDone?'true':'false'}</p> */}
            <button onClick={deleteHandler}>Delete</button>
        </article>
    );
}

export default TaskComponent;
