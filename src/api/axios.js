import axios from 'axios'
import { baseURL } from '../lib/global'

export default axios.create({
    baseURL,
})
