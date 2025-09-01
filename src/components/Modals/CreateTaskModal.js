import React from 'react';
import Modal from 'react-modal'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import { useDispatch } from 'react-redux';
import { createTask,getTaskSlice } from '../../redux/slices/taskSlice';
import * as yup from 'yup';

const initialValues = {
    body: ''
}

const validationSchema = yup.object().shape({
    body: yup.string().required().trim().min(3,'Body tasks must be a least 3 characters')
})

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    display: 'block',
  },
};

Modal.setAppElement('#root');

const CreateTaskModal = ({open,setIsOpen}) => {
    const dispatch = useDispatch()

    const submitHandler = async (values,{resetForm})=>{
        console.log(values);
        await dispatch(createTask(values))
        await dispatch(getTaskSlice())
        resetForm()
        setIsOpen(false)
    }
    return (
        <Modal
        isOpen={open}
        onRequestClose={()=>setIsOpen(false)}
        style={customStyles}
        >
            <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={submitHandler}
            >
                {(formikProps)=>(
                    <Form>
                        <label>New task: 
                            <Field name='body'/>
                            <ErrorMessage name='body'/>
                        </label>
                        <button type='submit'>Create</button>
                        <button type='button' onClick={()=>setIsOpen(false)}>Close</button>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
}

export default CreateTaskModal;
