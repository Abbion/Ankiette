import '../Css/CreateForm.css';
import '../Css/BasicComponents.css';
import { useEffect, useState } from 'react';
import QuestionEditingCard from './QuestionEditingCard';

import {useNavigate} from 'react-router-dom';

import Loading from '../Graphics/Icons/loading__.gif';

const AddQuestionComponent = (props) =>
{
    const navigate = useNavigate();

    const [questionArr, setQuestionArr] = useState([]);
    const [key, setNewKey] = useState(0);
    const [questionId, setQuestionId] = useState(0);
    const [questionNumbers, setQuestionNumber] = useState([1]);
    const [removeIndex, setRemoveIndes] = useState(-1);

    const [isLoading, setIsLoading] = useState(false);

    function onAddQuestionClicked(){
        setQuestionArr(prevState => [...prevState,
                        <QuestionEditingCard 
                        key={key}
                        id={questionId}
                        number={questionNumbers[questionNumbers.length - 1]}
                        RemoveQuestionFnc={ (delFunc) => onDeleteClicked(key) }/>,
                    ]);
        setQuestionNumber(prevState => [...prevState, prevState[questionNumbers.length - 1] + 1]);
        setNewKey(prevKey => prevKey + 1 );
        setQuestionId(prevId => prevId + 1);
    }

    function onDeleteClicked(questionNumber){
        setRemoveIndes(questionNumber);
    }

    useEffect(() => {

        setQuestionArr((prevState) => prevState.filter((index) => {
            return index.key != removeIndex;
        }));

    }, [removeIndex])

    const submitHandler = () => {

        setIsLoading(true);

        let query = {
            formCode: props.formCode,
            questions: [

            ]
        };

        let singleQuestionsElementsList = document.querySelectorAll(".singleQuestionInput");
        let multipleQuestionsElementsList = document.querySelectorAll(".multipleQuestionInput");
        let shortQuestionElementList = document.querySelectorAll(".short");
        let longQuestionElementList = document.querySelectorAll(".long");
        let singleQuestions = {};
        let multipleQuestions = {};
        let allSingleAnswers = document.querySelectorAll(".singleAnswer");
        let allMultipleAnswers = document.querySelectorAll(".multipleAnswer")
        let singleAnswers = [[]];
        let multipleAnswers = [[]];
        let shortQuestions = [];
        let longQuestions = [];


        let counter = 0;
        let i = 0;
        for(let i = 0; i < allSingleAnswers.length; i++) {
            singleAnswers[counter].push(allSingleAnswers[i].value);
            if(i !== (allSingleAnswers.length -1)) {
                if(allSingleAnswers[i+1].parentElement.getAttribute("id") === "0") {
                    counter++;
                    singleAnswers[counter] = [];
                }
            }
        }

        counter = 0;
        for(let i = 0; i < allMultipleAnswers.length; i++) {
            multipleAnswers[counter].push(allMultipleAnswers[i].value);
            if(i !== (allMultipleAnswers.length -1)) {
                if(allMultipleAnswers[i+1].parentElement.getAttribute("id") === "0") {
                    counter++;
                    multipleAnswers[counter] = [];
                }
            }
        }

        singleQuestionsElementsList.forEach(elem => {
            singleQuestions.id = elem.parentElement.parentElement.previousElementSibling.previousElementSibling.getAttribute("id")
            singleQuestions.type = 1
            singleQuestions.body = {
                content: elem.value,
                required: false,
                answers: singleAnswers[i]
            }
            query.questions.push({...singleQuestions})
            i++;
        })

        i=0;
        multipleQuestionsElementsList.forEach(elem => {
            multipleQuestions.id = elem.parentElement.parentElement.previousElementSibling.previousElementSibling.getAttribute("id")
            multipleQuestions.type = 2
            multipleQuestions.body = {
                content: elem.value,
                required: false,
                answers: multipleAnswers[i]
            }
            query.questions.push({...multipleQuestions})
            i++;
        })


        shortQuestionElementList.forEach(elem => {
            shortQuestions.id = elem.parentElement.previousElementSibling.previousElementSibling.getAttribute("id")
            shortQuestions.type = 3
            shortQuestions.body = {
                content: elem.value,
                required: false,
            }
            query.questions.push({...shortQuestions})
        })
        longQuestionElementList.forEach(elem => {
            longQuestions.id = elem.parentElement.previousElementSibling.previousElementSibling.getAttribute("id")
            longQuestions.type = 4
            longQuestions.body = {
                content: elem.value,
                required: false
            }
            query.questions.push({...longQuestions})
        })

        query.questions.sort((a, b) => (a.id - b.id));
        query.questions.forEach(elem => {
            elem.id = undefined;
        })
        console.log(JSON.stringify(query));

        let responseStatus = 0;
        fetch("http://localhost:8080/addQuestions", {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(query)
        }).then(response => {
            responseStatus = response.status;
            return response.json();
        }).then(data => {
            navigate('/home');
        })

    }


    return (
        isLoading ?
            <div className = "AddQuestionComponent">
                <div className="AddAndConfirm">
                    <img src={Loading} className={"Loading"}/>
                    <h1 className="ConfirmInfo">
                        Your form is being created...
                    </h1>
                </div>
            </div>
            :
        <div className = "AddQuestionComponent">
        <div className="AddAndConfirm">
            <h1 className="FormName">
                {props.formName}
            </h1>

            <div className="Questions">
                {questionArr}
            </div>

            <button className="Button" onClick={onAddQuestionClicked}>
                <h2>+</h2>
                <h1>Add question</h1>
            </button>

            <h1 className="ConfirmInfo">
                Confirm and create new form - Your form will be saved and You will be able to share it.
            </h1>

            <button className="Button ConfirmButton" onClick={submitHandler}>
                <h1>Confirm</h1>
            </button>
        </div>
    </div>
    )
}

export default AddQuestionComponent