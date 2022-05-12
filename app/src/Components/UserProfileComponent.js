import '../Css/UserProfileComponent.css';
import DefaultProfilePicture from '../Graphics/Icons/default_picture.png'

const UserProfileComponent = () => {
    return (
        <div className="ProfilePanel">
            <div className="AccountInfoPanel">
                <h1 className="SectionName">Account info</h1>
                <img src={DefaultProfilePicture} className="ProfilePicture"></img>
                <h1 className="AccountDetailText">Name: </h1>
                <h1 className="AccountDetailText">Surname: </h1>
                <h1 className="AccountDetailText">Email: </h1>
                <h1 className="AccountDetailText">Forms created: </h1>
                <h1 className="AccountDetailText">Forms taken: </h1>
            </div>
            <div className="ChangeDetailsPanel">
                <h1 className="SectionName">Change details</h1>
                <label className="InputLabel">Name</label>
                <input className="Input"></input>
                <label className="InputLabel">Surname</label>
                <input className="Input"></input>
                <label className="InputLabel">New password</label>
                <input className="Input"></input>
                <label className="InputLabel">Repeat new password</label>
                <input className="Input"></input>
                <h1 className="ApplyChangesInfoText">To apply changes, type the old password or the account recovery code</h1>
                <label className="InputLabel">Old password / account recovery code</label>
                <input className="Input"></input>
                <button className="Button">Confirm changes</button>
            </div>
            <div className="LogoutPanel">
                <h1 className="SectionName">Logout</h1>
                <button className="Logout">Logout</button>
            </div>
        </div>
    )
}

export default UserProfileComponent;