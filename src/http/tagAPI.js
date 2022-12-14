
import {$authHost, $host} from "./index";

export const createTag = async ( name ) => {
    const {data} = await $authHost.post('api/tag', {name})
    return data
}

export const fetchTags = async (limit) => {
    const {data} = await $host.get('api/tag', {params: {
            limit
        }})
    return data
}

export const fetchTag = async (id) => {
    const {data} = await $host.get('api/tag/' + id)
    return data
}

export const fetchTagByName = async ( name ) => {
    const {data} = await $host.get('api/tag', { params: {name} })
    return data
}

export const deleteTag = async (id) => {
    const {data} = await $authHost.delete('api/tag/' + id)
    return data
}

