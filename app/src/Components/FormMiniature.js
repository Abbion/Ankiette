import React, { useEffect } from 'react';
import '../Css/BasicComponents.css'
import '../Css/HomeView.css'

const FormMiniature = (props) =>
{
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

    function getMenu(){
        if(props.isAttended !== true) {
            if(clicked){
                return(
                    <div className="Menu">
                        <button className="Button" style={{backgroundColor: '#77E178'}} onClick={handleShare} value={shareButton}>
                            {shareButton}
                        </button>

                        <button className="Button" style={{border: '1px solid #787878'}}>
                            Show Report
                        </button>

                        <button className="Button" style={{backgroundColor: '#FF5341'}}>
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