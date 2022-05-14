import '../Css/BasicComponents.css'
import FormMiniature from './FormMiniature'

const YourFormsContent = () =>
{
    return  <div className="YourFromsContent">

        <div className="FormsInfoAndFilters">
            <h1>Your forms</h1>
            
            <div className="OrderBy">
                <div className="FormsInfoText">Order by</div>
                <select className="Select">
                    <option>name</option>
                    <option>date</option>
                    <option>participants</option>
                </select>
            </div>

            <div className="Search">
                <div className="FormsInfoText">Search</div>
                <input type="text" className="Input"/>
            </div>

            <div className="Filter">
                <div className="FormsInfoText">Search</div>
                <select className="Select">
                    <option>all</option>
                    <option>open</option>
                    <option>closed</option>
                    <option>participated</option>
                    <option>created</option>
                </select>
            </div>
         </div>
        
        <div className="SeparationLine">

        </div>

         <div className="Forms">
             <div className="FormsGrid">
                <FormMiniature/>
                <FormMiniature/>
                <FormMiniature/>
                <FormMiniature/>
                <FormMiniature/>
                <FormMiniature/>
                <FormMiniature/>
                <FormMiniature/>
            </div>
         </div>
        
        <div className="Footer">
            
        </div>
    </div>
}

export default YourFormsContent