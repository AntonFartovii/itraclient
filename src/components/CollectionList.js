import React, {useContext, useState} from 'react';
import Collection from "./Collection";
import {Button, Table} from "react-bootstrap";
import CreateCollection from "./modals/CreateCollection";
import {Context} from "../index";

const CollectionList = ({collections, title = 'Collections list', userId}) => {
    const [addVisible, setAddVisible] = useState(false)
    const {user} = useContext(Context)


    return (
        <div>
            <h2>{title}</h2>
            {
                user.isAuth &&
                    <Button
                        className="mb-2"
                        variant="primary"
                        onClick={() => setAddVisible(true)}
                    >
                        Create collection
                    </Button>
            }

            <CreateCollection
                userId={userId}
                show={addVisible}
                onHide={() => setAddVisible(false)}
            />

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Author id</th>
                    <th>Items Count</th>
                    <th>Tool bar</th>
                </tr>
                </thead>
                <tbody>
                    {
                        collections.map( (collection, index) =>
                            <Collection
                                index={index + 1}
                                collection={collection}
                                key={collection.id}
                                id={collection.id}
                            />
                        )
                    }
                </tbody>
            </Table>

        </div>
    );
};

export default CollectionList;