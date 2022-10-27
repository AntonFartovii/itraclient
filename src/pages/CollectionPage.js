import React, {useContext, useEffect, useMemo, useState} from 'react';
import {Context} from "../index";
import {Container, Alert, Card, Button, Spinner} from "react-bootstrap";
import ItemList from "../components/ItemList";
import {useParams} from 'react-router-dom'
import {fetchOneCollection} from "../http/collectionAPI";
import {fetchItems} from "../http/itemAPI";
import ItemFilter from "../components/ItemFilter";
import {useItems} from "../components/hooks/useItems";
import {useFetching} from "../components/hooks/useFetching";
import CollectionBar from "../components/CollectionBar";
import {observer} from "mobx-react-lite";
import Markdown from "react-remarkable";
import props from "../constants/props";
import {login} from "../http/userAPI";

const CollectionPage = observer(() => {
    const {user} = useContext(Context)
    const {collection} = useContext(Context)

    const [items, setItems] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})

    const {id} = useParams()

    const [fetchData, isItemsLoading, itemError] = useFetching(async () => {
        const data = await fetchItems(null, id)
        setItems(data.rows)
    })

    useEffect(() => {
        fetchOneCollection(id).then(data => {
            collection.setCollection(data)
            console.log( data )
            collection.setRefresh(false)
        })
    }, [collection.refresh])

    useEffect( () => {
        fetchData()
    }, [filter])

    const sortedAndSearchedItems = useItems(items, filter.sort, filter.query)

    console.log( props )
    return (
        <Container>
            <ItemFilter filter={filter} setFilter={setFilter}></ItemFilter>
            <hr style={{margin: '15px 0'}}/>

            {
                user.user.id === collection.collection.userId || user.isAdmin
                && <CollectionBar
                    id={id}
                    collection={collection.collection}
                    setCollection={collection.setCollection}
                />
            }


            <Card className="mb-2 mt-2">
                <Card.Header><h3>{collection.collection.name}</h3></Card.Header>
                <Card.Body>
                    <Card.Title>Markdown to html description:</Card.Title>
                    <Markdown source={collection.collection.description} />
                </Card.Body>
            </Card>

            <Card className="mb-2">
                <Card.Header><h5>Collection properties</h5></Card.Header>
                <Card.Body>
                    <Card.Title>Вы можете создать:</Card.Title>
                    <Card.Subtitle>
                        {
                            props.forEach( prop => {
                                    console.log(prop.type)
                                    })
                        }
                        {
                            collection.collection.props && collection.collection.props.map( prop =>
                                <h4 key={prop.id}>{prop.type}</h4>
                            )
                        }

                        3 целочисленных поля,<br/>
                        3 строковый поля,<br/>
                        3 многострочных текста,<br/>
                        3 логических да/нет чекбокса,<br/>
                        3 поля даты
                    </Card.Subtitle>

                        {
                            !collection.collection.props
                                ?  'В коллекции нет созданных свойств'
                                :   collection.collection.props.map( prop =>
                                        <Button key={prop.id} className="mx-3" variant="info">{prop.name}</Button>
                                    )
                        }
                </Card.Body>
            </Card>

            {
                itemError && <h1>Произошла ошибка</h1>
            }
            {
                isItemsLoading
                ?   <Spinner animation="border" size="sm" />
                :   <ItemList key={collection.id} items={sortedAndSearchedItems}></ItemList>
            }
        </Container>
    );
});

export default CollectionPage;