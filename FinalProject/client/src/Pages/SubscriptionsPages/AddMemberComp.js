import React, { useState } from 'react';
import UtilsMembers from '../../Utils/UtilsMembers';

const AddMemberComp = (props) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");

    const cancel = () => {
        props.goBack();
    }

    const addMember = async () => {
        var newMember = {
            name: name,
            email: email,
            city: city
        }

        if (name !== "" && email !== "" && city !== "") {
            await UtilsMembers.addMember(newMember);
            props.goBack();
        }
        else {
            alert("Can't add member\nPlease add all data needed");
        }
    }

    const getName = (e) => {
        setName(e.target.value);
    }

    const getEmail = (e) => {
        setEmail(e.target.value);
    }

    const getCity = (e) => {
        setCity(e.target.value);
    }

    return (
        <div align="center">
            <table className="tableBorderMembers">
                <tbody>
                    <tr>
                        <td>Name: <span>&nbsp;&nbsp;&nbsp;</span></td>
                        <td><input type="text" onChange={getName} /></td>
                    </tr>
                    <tr>
                        <td>Email: </td>
                        <td><input type="text" onChange={getEmail} /></td>
                    </tr>
                    <tr>
                        <td>City: </td>
                        <td><input type="text" onChange={getCity} /></td>
                    </tr>
                </tbody>
            </table>
            <input type="button" value="save" onClick={addMember} />
            <input type="button" value="cancel" onClick={cancel} />
        </div>
    );
}

export default AddMemberComp;