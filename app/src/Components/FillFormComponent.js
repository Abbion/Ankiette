import react from "react";
import FormComponent from "./FormComponent";


const FillFormComponent = () => {
    let formCode = "";
    const requestData = {code: formCode}


    // let [responseForms, setResponseForms] = useState([]);
    // let [shownForms, setShownForms] = useState([]);

    // let responseStatus = 0;
    // useEffect(() => {
    //     fetch("http://localhost:8080/getAllForms", {
    //         method: "POST",
    //         headers: {
    //             'Content-Type' : 'application/json',
    //         },
    //         body: JSON.stringify(requestData)
    //     }).then(response => {
    //         responseStatus = response.status;
    //         return response.json();
    //     }).then(data => {
    //         if(responseStatus === 200) {
    //             setResponseForms(data);
    //             setShownForms(data);
    //             return data;
    //         }
    //     });
        
    // }, []);



    return (<div>
        
        </div>)
}

export default FillFormComponent;