import '../Css/BasicComponents.css'
import '../Css/Home.css'

const FormMiniature = () =>
{
    

    function getStripes(FormID){
        var stripes = [];
        
        var gen = require('random-seed');
        var rand = gen(FormID);
        
        var stripeCount = rand(3) + 4;

        for(var i = 0; i < stripeCount; i++)
        {
            stripes.push(
                <div className='FormMiniatureStripe' key={i} style={{width: rand(77) + 60}}>
                    
                </div>
            );
        }
        
        return stripes;
    }

    return  <div className="FormMiniatureComponent">
        <div className="FormMiniature">
            {getStripes(2)}
        </div>
        <div className="Title">
            Name 1
        </div>
    </div>
}

export default FormMiniature