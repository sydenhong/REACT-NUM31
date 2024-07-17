import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../auth/Context";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { dispatch, isFetching, error } = useContext(Context);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => { 
        console.log("email::", email);
        console.log("password::", password); 
    }, [email, password]);

    const goToList = () => {
        console.log("HIi");
        navigate('/mytask')
    }

    const onLogin = async (e) => {
        if(email === '') {
            alert("Please enter the email!!!");
            return;
        }
        if(password === '') {
            alert("Please enter the password!!!");
            return;
        }

        dispatch({type: "LOGIN_START"});

        try {
            const datas = {
                "email": email,
                "password": password,
            }
            var userLogin = await axios.post('https://api-todolist.e-khmer.com/api/login', datas).then(function(response){
                console.log("Result: ",response.data);
                return response.data
            }).catch(function(error){
                console.log("Error::", error);
            });

            if(userLogin && userLogin.error) {
                // Login error 
                setIsError(true);
                setErrorMessage(userLogin.message)
            } else {
                // Login success 

            }

            if(userLogin && userLogin.user) {
                dispatch({ type: "LOGIN_SUCESS", payload: userLogin });
                navigate('/mytask')
            } else {
                dispatch({type: "LOGIN_FAILURE"});
            }
        } catch (e) {
            dispatch({type: "LOGIN_FAILURE"});
        }
    }

    return(
        <>
            <div className="container mt-3">
                <h1 className="text-center">Login Form</h1>
                {isError && (
                <>
                    <div className="alert alert-danger">
                        {errorMessage}
                    </div>
                </>) }
                
                <form action="#">
                    <div className="mb-3 mt-3">
                        <label htmlFor="email"> <span className="text-danger">*</span> Email:</label>
                        <input type="email" id="email" className="form-control" name="email" placeholder="Ex: jonh@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                        
                        {errorMessage === 'User does not exist' && (<>
                            <small className="text-danger">{errorMessage}</small>
                        </>)}
                    </div>
                    <div className="mb-3 mt-3">
                        <label htmlFor="pwd"> <span className="text-danger">*</span> Password:</label>
                        <input type="password" id="pwd" className="form-control" name="password" placeholder="Ex: weA@310u" value={password} onChange={(e) => setPassword(e.target.value)} />
                        
                        {errorMessage === 'The password not match!' && (<>
                            <small className="text-danger">{errorMessage}</small>
                        </>)}
                    </div>
                    <button className="btn btn-primary" type="button" disabled={isFetching} onClick={() => onLogin()} >Login</button>
                    <p className="text-muted">You don't have account yet! <Link to="/register">Sign-up</Link> </p>
                </form>
            </div>
        </>
    );
}

export default Login;