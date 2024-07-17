import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../auth/Context";
import axios from "axios";

const EditTask = () => {
    const navigate = useNavigate();
    const [description, setDescription] = useState('');
    const { user } = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);
    let { id } = useParams();

    const updateTask = async() => {
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
        var url = 'https://api-todolist.e-khmer.com/api/task/update/'+id;
        const rsUpdate = await axios.post(url, datas, {headers: header})
        .then(function(res){
            console.log("res::", res);
            return res.data
        })
        .catch(function(err){

        });
        if(rsUpdate && rsUpdate.success) {
            navigate('/mytask')
        }
    }

    const getTaskByID = async() => {
        var header = {
            "Authorization": "Bearer "+user.token
        }
        var url = 'https://api-todolist.e-khmer.com/api/task/'+id;
        const rsTaskByID = await axios.get(url, {headers: header})
        .then(function(res){ 
            return res.data;
        }).catch(function(err) {

        })
        if(rsTaskByID && rsTaskByID.data) {
            setDescription(rsTaskByID.data.description)
        }
    }

    useEffect(() => {
        getTaskByID();
    }, [])
    

    return(
        <>
            <div className="container mt-3">
                <h2>Edit From</h2>
                <form action="#">
                    <div className="mb-3 mt-3">
                        <label htmlFor="des"><span className="text-danger">*</span> Description</label>
                        <input type="text" className="form-control" id="des" value={description} 
                        onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <button type="button" className="btn btn-primary" disabled={isLoading} onClick={() => updateTask()}> 
                        {isLoading && (<i className="fas fa-spinner fa-spin"></i>)} Update
                    </button>
                </form>
            </div>
        </>
    )
}

export default EditTask;