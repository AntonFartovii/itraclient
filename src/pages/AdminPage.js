import React, {useContext, useEffect, useState} from 'react';
import UserList from "../components/UserList";
import {fetchUsers} from "../http/userAPI";
import {Context} from "../index";
import {Container} from "react-bootstrap";
import {observer} from "mobx-react-lite";

const AdminPage = observer (() => {
    const [users, setUsers] = useState([])
    const {user} = useContext(Context)

    useEffect(() => {
        fetchUsers().then( data => {
            setUsers(data)
        })

    }, [users])

    return (<div>
                {
                    (!user.isAdmin || user.isBan)
                        ?   (<h1>У вас нет прав администратора</h1>)
                        :   (<div>
                            <UserList
                                users={users}
                                title={'Users list'}
                            />
                        </div>)
                }
            </div>)
});

export default AdminPage;