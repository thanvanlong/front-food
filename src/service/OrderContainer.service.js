import axios from "axios";
import React from "react";
import jwt_decode from 'jwt-decode'
import { setInfoClient } from "../store/Module.action";
axios.defaults.withCredentials = true;
class OrderContainerService extends React.Component {
    constructor(props) {
        super(props);
        // const url = 'https://web-foods.herokuapp.com/api';
        const url = 'http://localhost:8080/api'
        this.apiUrl = url;
        this.axiosJwt = axios.create();
        this.axiosJwt.interceptors.request.use(
            async (config) => {
                let date = new Date();
                const decodedToken = jwt_decode(localStorage.getItem("USER_KEY"));
                if (decodedToken.exp < date.getTime() / 1000) {
                    const data = await this.refreshToken();
                    this.state = {
                        token: data.data.access_token,
                    }
                    config.headers['Authorization'] = 'Bearer ' + data?.data?.access_token
                } else {
                    config.headers['Authorization'] = 'Bearer ' + localStorage.getItem("USER_KEY");
                    console.log('Bearer ' + localStorage.getItem("USER_KEY"));
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        )
    }

    componentDidMount() {

    }

    async getAllProduct() {
        const data = await axios.get(this.apiUrl + '/product')
        return data;
    }

    async refreshToken() {
        const data = axios.get(this.apiUrl + '/refresh');
        return data;
    }

    async getAllCategory() {
        const data = await this.axiosJwt.get(this.apiUrl + '/product/category')
        return data;
    }

    async activeUser(phonenumber) {
        const data = await axios.put(this.apiUrl + "/user/active/" + phonenumber);
        return data;
    }

    async updateUser(user) {
        try {
            const data = await this.axiosJwt.put(this.apiUrl + "/user/update", user);
            return data;
        } catch (error) {
            console.log(error.response);
        }

    }

    async getAllDistrict() {
        // const data = await axios.get('https://vapi.vnappmob.com/api/province/district/01')
        return { data: [] };
    }
    async orderFood(data) {
        try {
            const dt = await
                this.axiosJwt
                    .post(this.apiUrl + '/product/order', data);
            return dt;
        } catch (error) {
            console.log(error);
        }
        // return dt;
    }
    async booking(data) {
        try {
            const dt = await
                this.axiosJwt
                    .post(this.apiUrl + '/table',
                        data);
            return dt;
        } catch (error) {
            return error.response;
            console.log(error.response);
        }
    }
    async login(data) {
        const dt = await
            axios
                .post(this.apiUrl + '/login',
                    new URLSearchParams({
                        phonenumber: data?.phonenumber,
                        password: data?.password
                    }), {
                    withCredentials: true
                })

        return dt;
    }
    async signup(data) {
        const dt = await
            axios
                .post(this.apiUrl + '/user/signup',
                    data)

        return dt;
    }
    async getUserById(data) {
        const dt = await axios.get(this.apiUrl + '/user/' + data);
        return dt;
    }

    async getOrder() {
        try {
            const dt = await this.axiosJwt.get(this.apiUrl + '/product/bill');
            return dt;
        } catch (error) {
            return error.response;
        }
    }

    async getBook() {
        try {
            const dt = await this.axiosJwt.get(this.apiUrl + '/table/book');
            return dt;
        } catch (error) {
            return error.response;
        }
    }

    async forgetPass(password) {
        try {
            const dt = await axios.put(this.apiUrl + '/user/forgot', password);
            console.log(dt);
            return dt;  
        } catch (error) {
            return error.response;
        }
    }

    storeToRedux(data) {
        const dispatch = this.props;
        const dd = this.props;
        dispatch(setInfoClient({ ...dd, access_token: data }));
    }

}

export default OrderContainerService

