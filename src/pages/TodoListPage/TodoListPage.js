import React, {useEffect, useState} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import { getTaskSlice } from '../../redux/slices/taskSlice'; 
import TaskComponent from '../../components/TaskComponent/TaskComponent';
import style from './TodoListPage.module.scss'
import CreateTaskModal from '../../components/Modals/CreateTaskModal';

const TodoListPage = () => {
    const {tasks,isLoading,error} = useSelector((state)=> state.taskSlice);
    const dispatch = useDispatch();
    const [inputeValue,setInputeValue] = useState('');
    const [createTaskModalOpen,setCreateTaskModalOpen] = useState(false)

    useEffect(()=>{
        dispatch(getTaskSlice());
    },[])

    if(isLoading){
        return <div>LOADING {"=) =) =)"}</div>
    }

    if(error){
        return <div>ERROR HAPPEND</div>
    }

    const tasksCards = tasks.map((currentTask,currentIndex) => <TaskComponent task={currentTask} key={currentTask._id} taskLength={tasks.length} taskNumber={currentIndex}/>)

    return (
        <>
        <button onClick={()=>setCreateTaskModalOpen(true)}>Create task</button>
        {createTaskModalOpen && <CreateTaskModal open={createTaskModalOpen} setIsOpen={setCreateTaskModalOpen} />}
        <section className={style.sectionStyle}>
            {tasksCards}
        </section>
        </>
    );
}

export default TodoListPage;
