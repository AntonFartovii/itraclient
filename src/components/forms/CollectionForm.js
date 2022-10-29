import React, {useState} from 'react';
import {Form} from "react-bootstrap";
import {observer} from "mobx-react-lite";

const CollectionForm = observer(({collection, setCollection}) => {

    const [name, setName] = useState(collection.name)
    const [theme, setTheme] = useState(collection.theme)
    const [description, setDescription] = useState(collection.description)
    const [file, setFile] = useState(collection.file)

    return (
        <Form>
            <Form.Label>Enter name</Form.Label>
            <Form.Control
                value={name}
                onChange={(e) => {
                    setName(e.target.value)
                    setCollection({...collection, name})
                }}
            />

            <Form.Label>Enter theme</Form.Label>
            <Form.Control
                value={theme}
                onChange={(e) => {
                    setTheme(e.target.value)
                    setCollection({...collection, theme})
                }}
            />

            <Form.Label>Select file</Form.Label>
            <Form.Control
                onChange={(e) => {
                setFile(e.target.files[0])
                setCollection({...collection, file})
            }}
                className="mt-3"
                type="file"
            />

            <Form.Label>Enter description</Form.Label>
            <Form.Control
                as="textarea"
                value={description}
                onChange={(e) => {
                    setDescription(e.target.value)
                    setCollection({...collection, description})
                }}
            />
        </Form>
    );
});

export default CollectionForm;