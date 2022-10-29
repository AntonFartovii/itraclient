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

const CollectionPage = observer(() => {
    const {user} = useContext(Context)

    const [collection, setCollection] = useState({})

    const [items, setItems] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})

    const {id} = useParams()

    useEffect(() => {
        fetchOneCollection(id).then(data => {
            setCollection(data)
        })
    }, [])

    const [fetchData, isItemsLoading, itemError] = useFetching(async () => {
        const data = await fetchItems(null, id)
        setItems(data.rows)
    })



    useEffect( () => {
        fetchData()
    }, [filter])

    const sortedAndSearchedItems = useItems(items, filter.sort, filter.query)

    let obj = {}
    collection.props && collection.props.forEach( prop => {
        obj[prop.type] = obj[prop.type] ? obj[prop.type] + 1 : 1
    })

    return (
        <Container>
            <ItemFilter filter={filter} setFilter={setFilter}></ItemFilter>
            <hr style={{margin: '15px 0'}}/>

            {
                (user.user.id === collection.userId || user.isAdmin)
                && <CollectionBar
                    id={id}
                    collection={collection}
                    setCollection={setCollection}
                />
            }


            <Card className="mb-2 mt-2">
                <Card.Header><h3>{collection.name}</h3></Card.Header>
                <Card.Body>
                    <Card.Title>Markdown to html description:</Card.Title>
                    <Markdown source={collection.description} />
                </Card.Body>
            </Card>

            <Card className="mb-2">
                <Card.Header>
                    <Card.Title>
                        Collection properties
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    <Card.Title>
                        Вы можете создать:
                    </Card.Title>
                        {
                            props &&
                                props.map( prop =>
                                <h5 key={prop.id}>{prop.type} {prop.limit - (obj[prop.type] || 0)}/{prop.limit}</h5>
                                )
                        }
                </Card.Body>
                <Card.Footer>
                    <Card.Title>Добавленные свойства:</Card.Title>
                    {
                        !collection.props
                            ?  <Card.Subtitle>В коллекции нет созданных свойств</Card.Subtitle>
                            :   collection.props.map( prop =>
                                <Button key={prop.id} className="mx-3" variant="info">{prop.name} ({prop.type})</Button>
                            )
                    }
                </Card.Footer>
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