import PropTypes from 'prop-types'
import React from 'react'

const ChoicesAnswerComponent = ({bgColor, percentage, text}) => {

    const containerStyles = {
        display: 'flex',
        position: 'relative',
        marginBottom: 20,
        height: 40,
        backgroundColor: "#F2F2F2",
        border: '1px solid #787878'
    }

    const fillerStyles = {
        display: 'flex',
        position: 'relative',

        height: '100%',
        width: `${percentage}%`,
        backgroundColor: "#77E178",
        
        transition: 'width 1s ease-in-out',
        alignItems: 'center',
    }

    const textStyles = {
        position: 'absolute',
        paddingLeft: 8,

        fontSize: 26,
        fontWeight: 300,
        textAlign: 'left',

        zIndex: 10
    }

    const labelStyles = {
        position: 'absolute',
        padding: 5,
        right: 0,

        fontSize: 23,
        fontWeight: 300,

        zIndex: 10
    }

    return <div className='ChoiceResult' style={containerStyles}>
            <div style={textStyles}>{text}</div>
                <div style={fillerStyles}></div>
                <span style={labelStyles}>{`${percentage}%`}</span>
            </div>
}

export default ChoicesAnswerComponent