import React, { useState, useEffect } from 'react';
import UtilsMembers from '../../Utils/UtilsMembers';
import MemberComp from './MemberComp';

const AllMembersComp = (props) => {
    const [members, setMembers] = useState([]);
    const [membersList, setMembersList] = useState("");
    const [membersComp, setMembersComp] = useState("");

    useEffect(async () => {
        var resp = await UtilsMembers.getAllMembers();
        var obj;
        setMembers(resp.data);        
        if (props.memberName === "") {
            obj = members.map((item, index) => {
                return (
                    <div key={item._id}>
                        <MemberComp data={item} memberIsDeleted={memberIsDeleted} goToMovies={props.goToMovies}/><br />
                    </div>
                );
            });
        }
        else {
            obj = members.filter((item) => {                
                if (item.name === props.movieName) {
                    return item;   
                }                
            }); 

            obj = obj.map((item, index) => {
                return (
                    <div key={item._id}>
                        <MemberComp data={item} memberIsDeleted={memberIsDeleted} goToMovies={props.goToMovies}/><br />
                    </div>
                );
            });
        }

        setMembersList()
    }, []);

    useEffect(() => {
        var obj;
        if (props.memberName === "") {
            obj = members.map((item, index) => {                
                return (
                    <div key={item._id}>
                        <MemberComp data={item} memberIsDeleted={memberIsDeleted} goToMovies={props.goToMovies}/><br />
                    </div>
                );
            });
        }
        else {
            obj = members.filter((item) => {                
                if (item.name === props.memberName) {
                    return item;   
                }                
            }); 

            obj = obj.map((item, index) => {
                return (
                    <div key={item._id}>
                        <MemberComp data={item} memberIsDeleted={memberIsDeleted} goToMovies={props.goToMovies}/><br />
                    </div>
                );
            });
        }
        setMembersComp(obj);    
    }, [membersList, members]);

    const memberIsDeleted = async () => {
        var resp = await UtilsMembers.getAllMembers();
        setMembers(resp.data);
    }

    return (
        <div align="center">
            {membersComp}
            {membersList}
        </div>
    );
}

export default AllMembersComp;