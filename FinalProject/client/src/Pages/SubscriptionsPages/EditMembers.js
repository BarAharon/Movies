import React, { useState, useEffect } from 'react';
import UtilsMembers from '../../Utils/UtilsMembers';
import { useParams, useNavigate } from 'react-router-dom';
import '../../Css/SubscriptionsComp.css'

const EditMembers = () => {
    const [member, setMember] = useState({});
    const params = useParams();
    const navigate = useNavigate();

    useEffect(async () => {
        var resp = await UtilsMembers.getMemberById(params.memberToEdit);

        var objMember = {
            name: resp.data.name,
            email: resp.data.email,
            city: resp.data.city
        }

        setMember(objMember);
    }, []);

    const updateMember = async () => {
        await UtilsMembers.updateMember(params.memberToEdit, member);
        navigate('/mainPage/' + params.userName);
    }

    const cancel = () => {
        navigate('/mainPage/' + params.userName);
    }

    const getName = (e) => {
        member.name = e.target.value;       
    }

    const getEmail = (e) => {       
        member.email =  e.target.value;        
    }

    const getCity = (e) => {
        member.city = e.target.value;        
    }

    return (
        <div align="center">
            <h2>members</h2>
            <h3>Edit Member: {member.name}</h3>
            <table className="tableBorderMembers">
                <tbody>
                    <tr>
                        <td>Name: <span>&nbsp;&nbsp;&nbsp;</span></td>
                        <td><input type="text" defaultValue={member.name} onChange={getName}/></td>
                    </tr>
                    <tr>
                        <td>Email: </td>
                        <td><input type="text" defaultValue={member.email} onChange={getEmail}/></td>
                    </tr>
                    <tr>
                        <td>City: </td>
                        <td><input type="text" defaultValue={member.city} onChange={getCity}/></td>
                    </tr>
                </tbody>
            </table>
            <input type="button" value="update" onClick={updateMember}/>
            <input type="button" value="cancel" onClick={cancel}/>
        </div>
    );
}

export default EditMembers;