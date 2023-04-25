var membersSchema = require('../schema/MembersSchema');

const getAllMembers = () => {
    return new Promise((resolve, reject) => {
        membersSchema.find({}, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}

const getMemberById = (id) => {
    return new Promise((resolve, reject) => {
        membersSchema.findById(id, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                if (data !== null) {
                    resolve(data);
                }
                else {
                    resolve("the Member is not found");
                }
            }
        });
    });
}

const createAPIMember = (newMember) => {
    return new Promise((resolve, reject) => {
        var memberToAdd = new membersSchema({
            name: newMember.name,
            email: newMember.email,
            city: newMember.address.city
        });

        membersSchema.find({}, (err, data) => {
            if (err) {
                reject(err);
            }
            else {                
                if (data.length === 0) {
                    memberToAdd.save((err) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(memberToAdd);
                        }
                    });
                }
            }
        });
    });
}

const createMember = (newMember) => {
    return new Promise((resolve, reject) => {
        var memberToAdd = new membersSchema({
            name: newMember.name,
            email: newMember.email,
            city: newMember.city
        });

        memberToAdd.save((err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(memberToAdd);
            }
        })
    })
}

const updateMember = (id, member) => {
    return new Promise((resolve, reject) => {
        var memberToUpdate = {
            name: member.name,
            email: member.email,
            city: member.city
        };

        membersSchema.findByIdAndUpdate(id, memberToUpdate, (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve("Member was updated!");
            }
        });
    });
}

const deleteMember = (id) => {
    return new Promise((resolve, reject) => {
        membersSchema.findByIdAndDelete(id, (err) => {
            if (err) {
                reject(err)
            }
            else {
                resolve("Member was deleted!!!")
            }
        })
    })
}


module.exports = { getAllMembers, getMemberById, createAPIMember, createMember, updateMember, deleteMember }