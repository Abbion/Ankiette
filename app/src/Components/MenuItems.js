import '../Css/BasicComponents.css'

export const MenuItems = [
    <button className="Button">
        <a onClick={()=> {
            window.location.href = 'app/public/index.html'
        }}>
            Your forms
        </a>
    </button>,

    <button className="Button" url='app/public/index.html'>
        Create new form
    </button>,

    <button className="Button" url='#'>
        Reports
    </button>,

    <button className="Button" url='#'>
        Account
    </button>
]