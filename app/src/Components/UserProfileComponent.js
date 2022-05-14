import '../Css/UserProfileComponent.css';
import { useEffect, useState } from 'react';

import { ReactSession } from 'react-client-session';
import {useNavigate} from 'react-router-dom';

const UserProfileComponent = () => {
    const navigate = useNavigate();
    let responseStatus = 0;
    const requestData = {
        email: ReactSession.get("email")
    }

    fetch("http://localhost:8080/getUserDetails", {
        method: "POST",
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(requestData)
    }).then(response => {
        responseStatus =response.status;
        return response.json();
    }).then(data => {
        if(responseStatus === 200) {
            return data;
        } else {
            setResponseError(data);
        }
    }).then(user => {
        ReactSession.set("picture", user.picture);
    })

    let[name, setName] = useState("");
    let[surname, setSurname] = useState("");
    const[password, setPassword] = useState("");
    const[newPassword, setNewPassword] = useState("");
    const[confirmNewPassword, setConfirmNewPassword] = useState("");

    const [responseError, setResponseError] = useState("");

    const logOutHandler = () => {
        ReactSession.set("email", '');
        ReactSession.set("name", '');
        ReactSession.set("surname", '');
        ReactSession.set("picture", '');
        ReactSession.set("isAuthenticated", false);
        navigate('/');
    }

    const confirmChangesHandler = (e) => {
        e.preventDefault();

        let changeData;

        if(name === "") {
            name = ReactSession.get("name");
        }

        if(surname === "") {
            surname = ReactSession.get("surname");
        }

        if(newPassword === "" || confirmNewPassword === "") {
            changeData = {
                email: ReactSession.get("email"),
                password: password,
                name: name,
                surname: surname
            }
            console.log(changeData);
        }else {
            changeData = {
                email: ReactSession.get("email"),
                password: password,
                name: name,
                surname: surname,
                new_password: newPassword
            }
            console.log(changeData);
        }

        let responseStatus = 0;

        fetch("http://localhost:8080/setUserDetails", {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(changeData)
        }).then(response => {
            responseStatus = response.status;
            return response.json();
        }).then(data => {
            if(responseStatus === 200) {
                console.log(data);
                return data;
            }else {
                setResponseError(data);
                console.log(data);
            }
        }).then(user =>  {
            ReactSession.set("name", user.name);
            ReactSession.set("surname", user.surname);
            navigate("/account");
        });
    }

    const nameHandler = (e) => {
        setName(e.target.value);
    }

    const surnameHandler = (e) => {
        setSurname(e.target.value);
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value);
    }

    const newPasswordHandler = (e) => {
        setNewPassword(e.target.value);
    }

    const confirmNewPasswordHandler = (e) => {
        setConfirmNewPassword(e.target.value);
    }

    useEffect(() => {
    }, [name, surname, password, newPassword]);

    const previewPicture = (e) => {
        if(e.target.files.length > 0) {
            const previewImg = document.querySelector('.ProfilePicture');
            let src = URL.createObjectURL(e.target.files[0]);
            previewImg.src = src;
        }

        const form = document.querySelector("#updatePicture");
        form.submit();
    }

    return (

        <div className="ProfilePanel">
            <div className="AccountInfoPanel">
                <h1 className="SectionName">Account info</h1>
                <form encType="multipart/form-data" id="updatePicture" action="http://localhost:8080/setProfilePicture" method="POST" target="hiddenFrame">
                    <input id="picture" type="file" onChange={previewPicture} name="picture"/>
                    <input type="hidden" value={ReactSession.get("email")} name="email"/>
                    <label htmlFor="picture">
                        <img src={ReactSession.get('picture')} className="ProfilePicture"/>
                    </label>
                </form>
                <h1 className="AccountDetailText">Name: {ReactSession.get('name')}</h1>
                <h1 className="AccountDetailText">Surname: {ReactSession.get('surname')}</h1>
                <h1 className="AccountDetailText">Email: {ReactSession.get('email')}</h1>
                <h1 className="AccountDetailText">Forms created: </h1>
                <h1 className="AccountDetailText">Forms taken: </h1>
            </div>
            <form id="changeDetails" onSubmit={confirmChangesHandler}>
            <div className="ChangeDetailsPanel">
                <h1 className="SectionName">Change details</h1>
                <label className="InputLabel">Name</label>
                <input className="Input" onChange={nameHandler} value={name}/>
                <label className="InputLabel">Surname</label>
                <input className="Input" onChange={surnameHandler} value={surname}/>
                <label className="InputLabel">New password</label>
                <input className="Input" onChange={newPasswordHandler} value={newPassword} type="password"/>
                <label className="InputLabel">Repeat new password</label>
                <input className="Input" onChange={confirmNewPasswordHandler} value={confirmNewPassword} type="password"/>
                <h1 className="ApplyChangesInfoText">To apply changes, type the old password or the account recovery code</h1>
                <label className="InputLabel">Old password</label>
                <input className="Input" required onChange={passwordHandler} value={password} type="password"/>
                <button className="Button" type="submit" form="changeDetails">Confirm changes</button>
            </div>
            </form>
            <div className="LogoutPanel">
                <h1 className="SectionName">Logout</h1>
                <button className="Logout" onClick={logOutHandler}>Logout</button>
            </div>
            <iframe name="hiddenFrame" style={{display: "none"}}/>
        </div>


    )
}

export default UserProfileComponent;