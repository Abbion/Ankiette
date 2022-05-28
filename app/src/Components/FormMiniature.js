import React, { useEffect } from 'react';
import '../Css/BasicComponents.css'
import '../Css/HomeView.css'

import { ReactSession } from 'react-client-session';
import { useNavigate } from 'react-router-dom';

const FormMiniature = (props) =>
{
    const navigate = useNavigate();

    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

    React.useEffect(() => {
        function Resize() {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener('resize', Resize);
    });

    const [clicked, setClicked] = React.useState(false);
    const [shareButton, setShareButton] = React.useState("Share");

    function getStripes(FormID){
        var stripes = [];
        
        var gen = require('random-seed');
        var rand = gen(FormID);
        
        var stripeCount = rand(3) + 4;

        for(var i = 0; i < stripeCount; i++)
        {
            stripes.push(
                <div className='FormMiniatureStripe' key={i} style={ windowWidth > 600 ? {width: rand(77) + 60} : {width: rand(61) + 48}}>
                    
                </div>
            );
        }
        
        return stripes;
    }

    const handleShare = (e) => {
        e.preventDefault();
        setShareButton("Link copied!");
        navigator.clipboard.writeText('http://localhost:3000/form/' + props.formCode);
    }

    const handleReport = (e) => {
        console.log("report");
        navigate("/reports/" + props.formCode)
    }

    const handleDelete = (e) => {
        e.preventDefault();

        const requestData = {
            email: ReactSession.get("email"),
            formCode: props.formCode
        }
        let responseStatus = 0;
        fetch("http://localhost:8080/removeForm", {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(requestData)
        }).then(response => {
            responseStatus = response.status;
            return response.json();
        }).then(data => {
            if(responseStatus === 200) {
                navigate("/home");
                window.location.reload(false);
            }
        })
    }

    function getMenu(){
        if(clicked){
            if(props.isAttended) {
                return (
                    <div className="Menu">
                        Not your form!
                    </div>
                )
            }else {
                return(
                    <div className="Menu">
                        <button className="Button" style={{backgroundColor: '#77E178'}} onClick={handleShare} value={shareButton}>
                            {shareButton}
                        </button>

                        <button className="Button" style={{border: '1px solid #787878'}} onClick={handleReport}>
                            Show Report
                        </button>

                        <button className="Button" style={{backgroundColor: '#FF5341'}} onClick={handleDelete}>
                            Delete
                        </button>
                    </div>
                );
            }
        }
    }

    function handleClick(){
        setClicked(true);
    }

    function handleHoverOff(){
        setClicked(false);
        setShareButton("Share");
    }

    return  <div className="FormMiniatureComponent">
        <div className="FormMiniature" onClick={handleClick} onMouseLeave={handleHoverOff}>
            {getMenu()}
            {getStripes(props.formCode)}
        </div>
        <div className="Title">
            {props.name}
        </div>
    </div>
}

export default FormMiniature