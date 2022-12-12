import { decode } from "html-entities"
import moment from "moment/moment"
import { AFTERNOON, EVENING, MORNING, NIGHT } from "../res/constant"

export const DecodeTitle = (text = null) => {
    if (!text) return
    return decode(text, { level: 'html5' })
}

export const DateConverter = (date = null) => {
    if (!date) return
    return moment(date).fromNow()
}

export const dateFormat = (date = null) => {
    if (!date) return
    let mDate = new Date(date).getDate()
    let mMonth = new Date(date).getMonth()
    let mYear = new Date(date).getFullYear()

    return `${mDate}/${mMonth}/${mYear}`
}


export const destructuredPostData = (data = null) => {
    if (!data) return
    let { jetpack_featured_media_url, title, content, date, yoast_head_json, id } = data
    let { schema, author } = yoast_head_json
    let { '@graph': graph } = schema
    let [item] = graph
    let { keywords, articleSection } = item
    let [category] = articleSection
    let { rendered } = content
    return { jetpack_featured_media_url, title, date, keywords, category, rendered, author, id }
}

export const homeHeaderMessage = () => {
    let currTime = new Date().getHours()
    console.log("🚀 ~ file: util.js ~ line 39 ~ homeHeaderMessage ~ currTime", currTime)

    if (currTime >= 1 && currTime <= 10) return MORNING
    else if (currTime >= 11 && currTime <= 16) return AFTERNOON
    else if (currTime >= 17 && currTime <= 20) return EVENING
    else if (currTime >= 21 && currTime <= 24) return NIGHT

}