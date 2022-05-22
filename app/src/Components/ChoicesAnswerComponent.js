import PropTypes from 'prop-types'
import React from 'react'

const ChoicesAnswerComponent = ({bgColor, percentage, text}) => {

    const containerStyles = {
        height: 40,
        backgroundColor: "#F2F2F2",
        border: '1px solid #787878'
    }

    const fillerStyles = {
        height: '100%',
        width: `${percentage}%`,
        backgroundColor: "#77E178",
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'right',
        transition: 'width 1s ease-in-out'
    }

    const labelStyles = {
        padding: 5,
        color: 'white',
        fontSize: 23,
        fontWeight: 500
    }

    return <div className='ChoiceResult' style={containerStyles}>
                <div style={fillerStyles}>
                    {text}
                    <span style={labelStyles}>{`${percentage}%`}</span>
                </div>
            </div>
}

export default ChoicesAnswerComponent