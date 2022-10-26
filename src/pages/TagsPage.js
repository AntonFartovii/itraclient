import React, {useContext, useEffect, useState} from 'react';
import {fetchTags} from "../http/tagAPI";
import {Context} from "../index";
import {Container, Badge, Button, Card} from "react-bootstrap";
import {FormattedMessage} from "react-intl";
import CreateTag from "../components/modals/CreateTag";
import {observer} from "mobx-react-lite";
import {TAG_ROUTE, USER_ROUTE} from "../constants/consts";
import {useNavigate} from 'react-router-dom'

const TagsPage = observer(() => {
    const [addVisible, setAddVisible] = useState(false)
    const {tag} = useContext(Context)
    const navigate = useNavigate()

    useEffect(() => {
        fetchTags(100). then(data => {
            tag.setTags( data )
            console.log( data )
        })
    }, [])

    return (
        <Container>
                <Button
                    className="mb-3"
                    variant="outline-primary"
                    onClick={() => setAddVisible(true)}
                >
                    <FormattedMessage id='button.add' />
                </Button>

                <CreateTag
                    show={addVisible}
                    onHide={ () => setAddVisible(false)}
                />
                <Card body>
                    {
                        !tag.tags.length
                            ? ''
                            : tag.tags.map( tag =>
                                <Badge
                                    onClick={() => navigate(TAG_ROUTE + '/' + tag.id)}
                                    className="mx-3"
                                    pill
                                    bg="warning"
                                    key={tag.id}
                                    text="dark"
                                >
                                    {tag.name}
                                </Badge>
                            )
                    }
                </Card>



        </Container>
    );
});

export default TagsPage;