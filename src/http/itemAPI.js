
import {$authHost, $host} from "./index";

export const createItem = async (item) => {
    const {data} = await $authHost.post('api/item/', item)
    return data
}

export const fetchItems = async (userId, collectionId, limit, sort = "") => {
    const {data} = await $host.get('api/item/', {params: {
            userId, collectionId, limit, sort
        }})
    // console.log( 'items: ', data )
    return data
}

export const fetchOneItem = async (id) => {
    try {
        const {data} = await $host.get('api/item/' + id)
        return data
    } catch (e) {
        console.log( e )
        return e
    }

}

export const deleteItem = async (id) => {
    const {data} = await $authHost.delete('api/item/' + id)
    return data
}
