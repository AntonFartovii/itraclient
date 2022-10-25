import React from 'react';
import Item from "./Item";
import {observer} from "mobx-react-lite";
import {Table, Alert} from "react-bootstrap";

const ItemList = observer(({items = [],title}) => {


    return (

            <div>
                    <h2>{title}</h2>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>CreatedAt</th>
                            <th>Name</th>
                            <th>Collection name</th>
                            <th>Author</th>
                            <th>Toolbar</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            !items.length
                                ?   <tr>
                                        <td colSpan="6">
                                            <Alert key="info" variant="info">
                                                Items not found
                                            </Alert>
                                        </td>
                                    </tr>
                                :   items.map( (item, index) =>
                                        <Item item={item} index={index + 1} key={item.id}/>
                                    )
                        }
                        </tbody>
                    </Table>
                </div>
    );
});

export default ItemList;