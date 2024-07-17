import axios from "axios";
import { Modal } from "bootstrap";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../auth/Context";
import $ from 'jquery'
import moment from 'moment';

const MyTask = () => {
    const { user } = useContext(Context);
    const [listMyTask, setlistMyTask] = useState([]);
    const [editDeleteTask, setEditDeleteTask] = useState({});
    const navigate = useNavigate();

    const updateDelete = (task) => {
        setEditDeleteTask(task);
        let myModal = new Modal(document.getElementById('myModal'));
        myModal.show();
    }

    const changeStatus = async() => {
        var header = {
            "Authorization": "Bearer "+user.token
        }
        var url = 'https://api-todolist.e-khmer.com/api/task/status/'+editDeleteTask.task.id;
        var datas = {
            status: editDeleteTask.task.status == 1 ? 2 : 1
        }
        var rsChange = await axios.post(url, datas, {headers: header})
        .then(function(res){
            console.log("Result:", res);
            return res.data;
        })
        .catch(function(err){
            console.log("Error:", err);
        })
        if(rsChange && rsChange.success) {
            setlistMyTask(
                listMyTask.map((task) => editDeleteTask.task.id == task.id ? {...task, status: editDeleteTask.task.status == 1 ? 2 : 1 } : task )
            )
            $('.btn-close').click();
        }
    }

    const editTask = () => {
        $('.btn-close').click();
        navigate('/edit/task/'+editDeleteTask.task.id);
    }

    const deleteTask = async() => {
        var header = {
            "Authorization": "Bearer "+user.token
        }
        if(editDeleteTask && editDeleteTask.task) {
            var url = 'https://api-todolist.e-khmer.com/api/task/delete/'+editDeleteTask.task.id;
            var rsDelete = await axios.delete(url, {headers: header})
            .then(function(res) {
                console.log("Res:", res);
                return res.data;
            })
            .catch(function(err){
                console.log("Error:", err);
            });
            if(rsDelete && rsDelete.success) {
                setlistMyTask(
                    listMyTask.filter((task) => editDeleteTask.task.id !== task.id)
                )
                $('.btn-close').click();
            }
        }
    }

    const getAllMyTasks = async() => {
        var header = {
            "Authorization": "Bearer "+user.token
        }
        var datas = await axios.get('https://api-todolist.e-khmer.com/api/task', {headers: header})
        .then(function(res){
            console.log("Result: ", res);
            if(res && res.data && res.data.success) {
                setlistMyTask(res.data.datas.data);
            }
        })
        .catch(function(err){
            console.log("Err: ", err);
        });
    }

    useEffect(() => {
        getAllMyTasks();
    }, [])

    console.log("listMyTask: ", listMyTask);

    return (
        <>
            <div className="container">
                <h1 className="text-center">My Todo List</h1>
                <Link to="/create/task" className="btn btn-primary">Create Task</Link>

                <div className="row">
                    <div className="col-4">
                        <div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" className="custom-radio-input" id="all" name="status" />
                            <label htmlFor="all" > All</label>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" className="custom-radio-input" id="pending" name="status" />
                            <label htmlFor="pending" > Pending</label>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" className="custom-radio-input" id="completed" name="status" />
                            <label htmlFor="completed" > Completed</label>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-12">
                        {listMyTask.map((task) => 
                        <>
                            <div className={task.status == 1 ? "alert alert-light" : "alert alert-success"} onClick={() => updateDelete({task})}>
                                <div className="row">
                                    <div className="col-10">
                                        {task.description} <br/>
                                        <small><i class="fas fa-calendar"></i> {moment(task.created_at).format('MMMM Do YYYY')}</small>
                                    </div>
                                    <div className="col-2 text-end">
                                        {task.status == 1 ? <i class="fas fa-ban"></i> : <i class="fas fa-check-circle"></i>}
                                    </div>
                                </div>
                            </div>
                        </> )}
                    </div>
                </div>
                {/* Modal */}
                <div className="modal" id="myModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Comfirmation!</h4>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div className="modal-body">
                                <div className="d-grid">
                                    <button type="button" className="btn btn-outline-info btn-block" onClick={() => changeStatus()}>Change Status</button>
                                    <button type="button" className="btn btn-outline-primary btn-block mt-3" onClick={() => editTask()}>Edit</button>
                                    <button type="button" className="btn btn-outline-danger btn-block mt-3" onClick={() => deleteTask()}>Delete</button>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyTask;