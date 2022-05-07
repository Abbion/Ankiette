import '../Css/BasicComponents.css'

const YourFormsContent = () =>
{
    return  <div className="YourFromsContent">

        <div className="FormsInfoAndFilters">
            <h1>Your forms</h1>
            
            <div className="OrderBy">
                <div className="FormsInfoText">Order by</div>
                <select>
                    <option>name</option>
                    <option>date</option>
                    <option>participants</option>
                </select>
            </div>

            <div className="Search">
                <div className="FormsInfoText">Search</div>
                <input type="text"/>
            </div>

            <div className="Filter">
                <div className="FormsInfoText">Search</div>
                <select>
                    <option>all</option>
                    <option>open</option>
                    <option>closed</option>
                </select>
            </div>

         </div>

         <div className="CreatedForms">
            
         </div>

    </div>
}

export default YourFormsContent