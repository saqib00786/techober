import axios from "axios"
import { BASE_URL } from "../res/constant"

export const fetchData = async (url = '', params = {}) => {
    return await axios.get(`${BASE_URL}/${url}`, { params })
}