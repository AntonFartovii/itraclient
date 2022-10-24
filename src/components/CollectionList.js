import React, {useContext, useState} from 'react';
import Collection from "./Collection";
import {Button, Table} from "react-bootstrap";
import CreateCollection from "./modals/CreateCollection";

const CollectionList = ({collections, title, userId}) => {
    const [addVisible, setAddVisible] = useState(false)
    title = title || 'Collections list'


    return (
        <div>
            <h1>{title}</h1>
            <Button variant="primary" onClick={() => setAddVisible(true)}>
                Create collection
            </Button>
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