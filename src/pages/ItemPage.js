import React, {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import {Container, Button, Form, Badge, Spinner} from "react-bootstrap";
import {fetchOneItem} from "../http/itemAPI";
import CommentsList from "../components/CommentsList";
import {Context} from "../index";
import PropsList from "../components/PropsList";
import TagsList from "../components/TagsList";
import LikeList from "../components/LikeList";

const ItemPage = () => {

    const {id} = useParams()
    const [loading, setLoading] = useState(true)
    const {user} = useContext(Context)
    const [item, setItem] = useState({})

    useEffect(() => {
       fetchOneItem(id)
           .then(data => {
                console.log( data )
                setItem(data)
            })
           .finally(() => {
                   setLoading(false)
           })
    },[])

    const createComment = (newComment) => {
        const comments = [...item.comments, newComment]
        setItem({...item, comments})
    }



    if (loading) return <Spinner animation={"grow"}/>;

    return (
        <Container>

            <LikeList
                user={user}
                itemId={id}
                item={item}
            />

            <TagsList
                user={user}
                key={'tag'+id}
                item={item}
            />

            <PropsList
                user={user}
                key={'prop'+id}
                collectionId={item.collectionId}
                itemId={id}
            />

            <CommentsList
                user={user}
                key={'comment'+id}
                userId={user.user.id}
                itemId={id}
                comments={item.comments}
                create={createComment}
            />

        </Container>
    );
};

export default ItemPage;