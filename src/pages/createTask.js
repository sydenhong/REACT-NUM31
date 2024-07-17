import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../auth/Context";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
    const navigate = useNavigate();
    const [description, setDescription] = useState('');
    const { user } = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);

    const addTask = async() => {
        if(description == '') {
            alert("Please enter the description");
            return;
        }
        var datas = {
            "description": description
        };
        var header = {
            "Authorization": "Bearer "+user.token
        }
        setIsLoading(true);
        var resultTask = await axios.post('https://api-todolist.e-khmer.com/api/task/create', datas, {headers: header})
        .then(function(res){
            console.log("Result:", res);
            setIsLoading(false);
            return res.data;
        }).catch(function(err){
            console.log("Err:", err);
            setIsLoading(false);
        });
        if(resultTask && resultTask.success) {
            navigate('/mytask');
        }
    }

    return(
        <>
            <div className="container mt-3">
                <h2>Create From</h2>
                <form action="#">
                    <div className="mb-3 mt-3">
                        <label htmlFor="des"><span className="text-danger">*</span> Description</label>
                        <input type="text" className="form-control" id="des" value={description} 
                        onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <button type="button" className="btn btn-primary" disabled={isLoading} onClick={() => addTask()}> 
                        {isLoading && (<i className="fas fa-spinner fa-spin"></i>)} Add
                    </button>
                </form>
            </div>
        </>
    );
}

export default CreateTask;