import '../Css/BasicComponents.css'
import '../Css/Home.css'

const FormMiniature = () =>
{
    var gen = require('random-seed').create();

    function getStripes(FormID){
        var stripes = [];
        var rand = gen(FormID);
        
        var stripeCount = rand(3) + 4;
        
        console.log(stripeCount);
        console.log(Math.random());
        console.log(Math.random());
        console.log(Math.random());

        for(var i = 0; i < stripeCount; i++)
        {
            stripes.push(
                <div className='FormMiniatureStripe' key={i}>
                    
                </div>
            );
        }
        
        return stripes;
    }

    return  <div className="FormMiniature">
        {getStripes(2)}
    </div>
}

export default FormMiniature