import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register =  () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [messageError, setMessageError] = useState("")

    const registerNow = async () => {
        if(name === '') {
            alert("Please enter the name!!!");
            return;
        }
        if(email === '') {
            alert("Please enter the email!!!");
            return;
        }
        if(password === '') {
            alert("Please enter the password!!!");
            return;
        } else {
            if(password.length < 6) {
                alert("The password min 6 char!");
                return;
            }
        }
        if(age === '') {
            alert("Please enter the age!!!");
            return;
        }
        const datas = {
            "name": name,
            "email": email,
            "password": password,
            "age": age
        }
        console.log("Data:", datas);
        setIsLoading(true);
        
        var userRegister = await axios.post('https://api-todolist.e-khmer.com/api/register', datas)
        .then(function(response){
            console.log("Response::", response);
            setIsLoading(false);
            return response.data
        }).catch(function(error){
            console.log("Error::", error);
            setIsLoading(false);
        });

        if(userRegister.error) {
            setIsError(true);
            setMessageError(userRegister.message);
        }

        if(userRegister && userRegister.user) {
            navigate('/login')
        }
    }

    if(isLoading) {
        // True
    } else {
        // false
    }
    
    return (
        <>
            <div className="container mt-3">
                <h2 className="text-center">Register Form</h2>
                {isError && (
                    <>
                        <div className="alert alert-danger">
                            {messageError}
                        </div>
                    </>
                )}
                <form action="#">
                    <div className="mb-3 mt-3">
                        <label htmlFor="name"> <span className="text-danger">*</span> Name</label>
                        <input type="text" id="name" className="form-control" placeholder="Ex: Jonh Doe" value={name} onChange={(e) => setName(e.target.value) } />
                    </div>
                    <div className="mb-3 mt-3">
                        <label htmlFor="email"> <span className="text-danger">*</span> Email</label>
                        <input type="email" id="email" name="email" className="form-control" placeholder="Ex: jonh@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3 mt-3">
                        <label htmlFor="password"> <span className="text-danger">*</span> Password</label>
                        <input type="password" id="password" name="password" className="form-control" placeholder="Ex: A12#$aOQ" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="mb-3 mt-3">
                        <label htmlFor="age"> <span className="text-danger">*</span> Age</label>
                        <input type="number" id="age" name="age" className="form-control" placeholder="Ex: 12, 18" value={age} onChange={(e) => setAge(e.target.value)} />
                    </div>
                    <button type="button" className="btn btn-primary" onClick={() => registerNow()} disabled={isLoading} > {isLoading ? <i class="fas fa-spinner fa-spin"></i> : '' }  Register now</button>
                    <p>I have an account! <Link to="/login">Sign-In</Link> </p>
                </form>
            </div>
        </>
    );
}

export default Register;