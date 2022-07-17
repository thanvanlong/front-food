import { Card, Box, Typography, TextField, Button, Backdrop, Dialog } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setInfoClient } from '../store/Module.action'
import { Link, useNavigate } from 'react-router-dom'
import OrderContainerService from '../service/OrderContainer.service'
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import jwt_decode from "jwt-decode";
import { authentication } from '../config/firebase.config'
import { configPhoneNumber } from '../config/order.config';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react'

function Login() {
    const [user, setUser] = useState({
        phonenumber: '',
        password: '',
        open: false,
        rs: {}
    });
    const toastOption = {
        position: 'top-right',
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'
    }
    const navigate = useNavigate();
    const [dialog, setDialog] = useState(false);
    const [otp, setOtp] = useState();
    const [isSign, setIsSign] = useState(false);
    const service = new OrderContainerService();
    const dispatch = useDispatch();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }
    const getCaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
            }
        }, authentication);
    }
    const sendOTP = () => {
        getCaptcha();
        let appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(authentication, configPhoneNumber(user.phonenumber) + '', appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setIsSign(true);
                // ...
            }).catch((error) => {
                console.log(error.message);
            });
    }

    const otpSubmit = (e) => {
        e.preventDefault();
        let confirmationResult = window.confirmationResult;
        confirmationResult.confirm(otp).then(async (result) => {
            await service.forgetPass({...user, phone: user.phonenumber}).then(res => res.data.err ? toast.error(res.data.err, toastOption)
                : toast.success("New password is: " + res.data.password, toastOption));
            // navigate('/login', { replace: true })
        }).catch((error) => {
            console.log(e);
            // User couldn't sign in (bad verification code?)
            // ...
        });


    }

    const handleSubmit = async (e) => {
        setUser({ ...user, open: true })
        e.preventDefault();
        const rs = await service.login(user);
        setUser({ ...user, open: false, rs: rs });
        if (rs?.data?.err) {
            setDialog(true);
            console.log(rs?.data?.err);
        } else {
            console.log(rs);
            const token = jwt_decode(rs.data?.access_token);
            const userToken = (token?.sub + '').split('-');
            console.log(token);
            dispatch(setInfoClient({
                phonenumber: userToken[0], username: userToken[1]
                , address: userToken[2], access_token: rs.data?.access_token
            }))
            localStorage.setItem("USER_KEY", rs.data?.access_token);
            navigate('/');
        }
    }
    const [forget, setForget] = useState(false);
    const handleForget = (e) => {
        e.preventDefault();
        sendOTP()
    }

    useEffect(() =>{
        if(localStorage.getItem("USER_KEY")){
            navigate('/');
        }
    },[])
    return (
        <Box sx={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundImage: `url('https://phanexpress.com/WebLauPhan/order/bg-order.png')`,
            backgroundRepeat: 'no-repeat',
        }}>
            <form onSubmit={handleSubmit}>
                <Card sx={{
                    width: 400,
                    height: 500,
                    padding: 5,
                }}>
                    <Typography fontSize={20} fontFamily={'Roboto Slab'} fontWeight={900} paddingBottom={3}>
                        LOGIN
                    </Typography>
                    <Typography fontSize={15} fontFamily={'Roboto Slab'} paddingBottom={1}>
                        Phonenumber
                    </Typography>
                    <TextField
                        fullWidth
                        name='phonenumber'
                        id='phonenumber'
                        required
                        onChange={handleChange}
                        size='small' sx={{
                            marginBottom: 2
                        }} />
                    <Typography fontSize={15} fontFamily={'Roboto Slab'} paddingBottom={1}>
                        Password
                    </Typography>
                    <TextField
                        fullWidth
                        name='password'
                        id='password'
                        required
                        type={'password'}
                        onChange={handleChange}
                        size='small'
                        sx={{
                            marginBottom: 1
                        }} />
                    <Typography
                        onClick={() => { setForget(true) }}
                        sx={{ cursor: 'pointer' }}
                        fontSize={15}
                        fontFamily={'Roboto Slab'}
                        color={'blue'}
                        paddingBottom={7}>
                        Bạn quên mật khẩu ?
                    </Typography>
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Button
                            type='submit'
                            sx={{
                                width: 200,
                                height: 50,
                                border: 1,
                                backgroundColor: 'rgb(22,41,56)',
                                borderColor: 'white',
                                borderRadius: 6,
                                color: 'white',
                                marginBottom: 1
                            }}>
                            Đăng nhập
                        </Button>
                    </Box>
                    <Typography
                        fontSize={15}
                        fontFamily={'Roboto Slab'}
                        textAlign={'center'}
                        paddingTop={7}
                        paddingBottom={1}>
                        Bạn chưa có tài khoản? Đăng kí&nbsp;
                        <Link to={'/signup'}>tại đây</Link>
                    </Typography>
                </Card>
            </form>
            <ToastContainer />
            <Dialog
                open={dialog}
                onClose={() => {
                    setDialog(false);
                }} >
                <Box sx={{
                    width: 500,

                    backgroundColor: 'white',
                    padding: 5
                }}>
                    <Typography
                        fontFamily={'Roboto Slab'}
                        fontSize={20}
                        textAlign={'center'}
                        textTransform={'uppercase'}
                        paddingBottom={5}
                        paragraph>
                        {user.rs.data?.err}
                    </Typography>
                    <Typography textAlign={'center'}>
                        {!(user.rs?.data?.err) ?
                            <CheckCircleOutlineIcon sx={{
                                color: 'rgb(35,188,35)',
                                fontSize: 200
                            }} /> :
                            <SentimentVeryDissatisfiedIcon sx={{
                                color: 'red',
                                fontSize: 200
                            }} />}
                    </Typography>
                </Box>
            </Dialog>
            <Dialog
                open={forget}
                onClose={() => {
                    setForget(false);
                }} >
                <form onSubmit={otpSubmit} style={{ display: isSign ? "" : "none" }}>
                    <Card sx={{
                        width: 400,
                        padding: 5,
                    }}>
                        <Typography fontSize={20} fontFamily={'Roboto Slab'} fontWeight={900} paddingBottom={3}>
                            VERIFY OTP
                        </Typography>
                        <Typography fontSize={15} fontFamily={'Roboto Slab'} paddingBottom={1}>
                            OTP CODE
                        </Typography>
                        <TextField
                            fullWidth
                            name='password'
                            id='password'
                            value={otp}
                            required
                            type={'number'}
                            onChange={(e) => { setOtp(e.target.value) }}
                            size='small'
                            sx={{
                                marginBottom: 1
                            }} />
                        <Box sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Button
                                type='submit'
                                sx={{
                                    width: 200,
                                    height: 50,
                                    border: 1,
                                    backgroundColor: 'rgb(22,41,56)',
                                    borderColor: 'white',
                                    borderRadius: 6,
                                    color: 'white',
                                    marginTop: 3
                                }}>
                                Xác thực
                            </Button>
                        </Box>

                    </Card>
                </form>
                <form onSubmit={handleForget} style={{ display: !isSign ? "" : "none" }}>
                    <Box sx={{
                        width: 500,
                        backgroundColor: 'white',
                        padding: 5
                    }}>
                        <Typography
                            fontFamily={'Roboto Slab'}
                            fontWeight={900}
                            textAlign={'center'}
                            paddingBottom={5}
                            fontSize={'20px'}>Vui nhập SDT của bạn</Typography>
                        <div style={{ width: '100%' }}>
                            <Typography
                                fontFamily={'Roboto Slab'}
                                fontWeight={900}
                                fontSize={'16px'}
                                marginBottom={'5px'} >SDT</Typography>
                            <TextField
                                fullWidth
                                variant="standard"
                                required
                                name='phonenumber'
                                id='phonenumber'
                                onChange={handleChange}
                                placeholder='Nhập SDT'
                                sx={{ padding: '5px' }}
                            />
                        </div>

                        <Button
                            sx={{ marginTop: 5 }}
                            variant='contained'
                            color='primary'
                            type='submit'
                        >Submit</Button>
                    </Box>
                </form>
            </Dialog>
            <Backdrop
                sx={{ color: '#fff', zIndex: 100 }}
                open={user.open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div id='sign-in-button'></div>
        </Box>
    )
}

export default Login