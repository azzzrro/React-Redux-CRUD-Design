import axios from 'axios'
import { apiURLUser } from '../../utils/constants'


const instance = axios.create({
    baseURL:apiURLUser,
    withCredentials:true
})

export default instance