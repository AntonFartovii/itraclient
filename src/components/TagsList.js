import React, {useState} from 'react';
import {itemAddTag} from "../http/itemAPI";
import Card from "react-bootstrap/Card";
import {Button, Form} from "react-bootstrap";
import TagList from "./TagList";

const TagsList = ({item, user}) => {

    const [tag, setTag] = useState('')

    const addTag = () => {
        if (tag) {
            itemAddTag({name: tag}).then(data => {
                console.log(data);
            })
        }
    }

    return (
        <Card className="mb-3">
            <Card.Header>
                <Form>
                    <Form.Label>Tags</Form.Label>
                    <Form.Control
                        value={tag}
                        onChange={e => setTag(e.target.value)}
                        placeholder={"Enter tag"}
                    />
                    {
                        user.isAuth &&
                        <Button
                            className="mt-2"
                            onClick={addTag}
                            variant="primary"
                        >
                            Add tag
                        </Button>
                    }

                </Form>
            </Card.Header>
            <Card.Body>
                <TagList tags={item.tags}/>
            </Card.Body>
        </Card>
    );
};

export default TagsList;