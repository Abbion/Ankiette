import PropTypes from 'prop-types'

const ChoicesAnswerComponent = ({bgColor, color, text}) => {

    return <div className='ChoiceResult' style={{backgroundColor: bgColor, color: color}}>
                {text}
            </div>
}

ChoicesAnswerComponent.defaultProps = {
    bgColor: 'White',
    color: 'Black',
    text: 'Answer',
}

ChoicesAnswerComponent.propTypes = {
    bgColor: PropTypes.string,
    color: PropTypes.string,
    text: PropTypes.string,
}

export default ChoicesAnswerComponent