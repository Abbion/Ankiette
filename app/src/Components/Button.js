import PropTypes from 'prop-types'


const Button = ({bgColor, color, text, onClick}) => {

    return <button  className='C_button' 
                    style={{backgroundColor: bgColor, color: color}}
                    onClick={onClick}
                    >
                    {text}
            </button>
}

Button.defaultProps = {
    bgColor: 'White',
    color: 'Black',
    text: 'New Button',
}

Button.propTypes = {
    bgColor: PropTypes.string,
    color: PropTypes.string,
    text: PropTypes.string,
    onClick: PropTypes.func.isRequired
}

export default Button