import React from 'react'
import { Card, Typography, CardMedia, Divider, CardContent, Link, Box, Container } from '@mui/material'
import styled from 'styled-components'
import { configPrice } from '../config/order.config';
function Bill(props) {
    const {data} = props;
    const {info, total } = data;
    const listFood = data?.orderFood;
    const BillCard = (dt) => {
        const data = dt?.data;
        return (
            <Card sx={{
                height: 95,
                display: 'flex',
                justifyContent: 'flex-start',
                borderRadius: 1,
                marginTop: 3,
                marginBottom: 1,
                marginLeft: 3,
                padding: 1,
                boxShadow: 'none'
            }}>
                <CardMedia
                    sx={{ width: '68px', height: 68 }}
                    component={'img'}
                    image={data?.image}
                />
                <CardContent sx={{ paddingTop: 0 }}>
                    <Typography fontFamily={'Roboto Slab'} fontWeight={900}>
                        {data?.name}
                    </Typography>
                    <Typography
                        variant='subtitle2'
                        fontSize={10}
                        color={'#727272'}
                        fontFamily={'Roboto Slab'}
                    >{data?.description}</Typography>
                </CardContent>
                <CardContent sx={{ paddingTop: 0 }}>
                    <Box sx={{
                        width: 300,
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        marginLeft: 15
                    }}>
                        <Typography fontFamily={'Roboto Slab'} fontWeight={700}>
                            {data?.quanityOrdered}
                        </Typography>
                        <Typography fontFamily={'Roboto Slab'} fontWeight={700} color={'rgb(255,114,22)'}>
                            {configPrice(data?.price)}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        )
    }
    return (
        <Box sx={{
            padding: 6,
            display: 'flex',
            justifyContent: 'space-around'
        }}>
            <Card sx={{
                width: '370px',
                height: '700px',
                borderRadius: '25px',
                paddingTop: '20px'
            }}>
                <Typography
                    textTransform={'uppercase'}
                    fontFamily={'Roboto Slab'}
                    fontWeight={900}
                    textAlign={'center'}
                    marginBottom={'50px'}
                    variant={'h5'}
                >Th??ng tin ?????t h??ng
                </Typography>
                <Bos id='name'>
                    <div style={{ width: '100%' }}>
                        <Typography
                            fontFamily={'Roboto Slab'}
                            fontWeight={500}
                            fontSize={'16px'}
                            marginBottom={'10px'} >
                            H??? t??n
                        </Typography>
                        <Typography
                            fontFamily={'Roboto Slab'}
                            fontWeight={900}
                            fontSize={'16px'}
                            marginBottom={'5px'} >
                            {info.name}
                        </Typography>

                    </div>
                </Bos>
                <Bos id='address'>
                    <div style={{ width: '100%' }}>
                        <Typography
                            fontFamily={'Roboto Slab'}
                            fontWeight={500}
                            fontSize={'16px'}
                            marginBottom={'10px'} >
                            ?????a ch??? ?????t h??ng
                        </Typography>
                        <Typography
                            fontFamily={'Roboto Slab'}
                            fontWeight={900}
                            fontSize={'16px'}
                            marginBottom={'5px'} >
                            {info.address}
                        </Typography>
                    </div>
                </Bos>
                <Bos id='province'>
                    <div style={{ width: '40%' }}>
                        <Typography
                            fontFamily={'Roboto Slab'}
                            fontWeight={500}
                            fontSize={'16px'}
                            marginBottom={'10px'} >
                            Th??nh ph???
                        </Typography>
                        <Typography
                            fontFamily={'Roboto Slab'}
                            fontWeight={900}
                            fontSize={'16px'}
                            marginBottom={'5px'} >
                            H?? N???i
                        </Typography>
                    </div>
                    <div style={{ width: '40%' }}>
                        <Typography
                            fontFamily={'Roboto Slab'}
                            fontWeight={500}
                            fontSize={'16px'}
                            marginBottom={'10px'} >
                            Qu???n
                        </Typography>
                        <Typography
                            fontFamily={'Roboto Slab'}
                            fontWeight={900}
                            fontSize={'16px'}
                            marginBottom={'5px'} >
                            {info.province}
                        </Typography>
                    </div>
                </Bos>
                <Bos id='phonenumber'>
                    <div style={{ width: '100%' }}>
                        <Typography
                            fontFamily={'Roboto Slab'}
                            fontWeight={500}
                            fontSize={'16px'}
                            marginBottom={'10px'} >
                            S??? ??i???n tho???i
                        </Typography>
                        <Typography
                            fontFamily={'Roboto Slab'}
                            fontWeight={900}
                            fontSize={'16px'}
                            marginBottom={'5px'} >
                            {info.phone}
                        </Typography>
                    </div>
                </Bos>
                <Bos>
                    <div style={{ width: '50%' }}>
                        <Typography
                            fontFamily={'Roboto Slab'}
                            fontWeight={500}
                            fontSize={'16px'}
                            marginBottom={'10px'} >
                            Ng??y giao
                        </Typography>
                        <Typography
                            fontFamily={'Roboto Slab'}
                            fontWeight={900}
                            fontSize={'16px'}
                            marginBottom={'5px'} >
                            {info.date}
                        </Typography>
                    </div>
                    <div style={{ width: '40%' }}>
                        <Typography
                            fontFamily={'Roboto Slab'}
                            fontWeight={500}
                            fontSize={'16px'}
                            marginBottom={'10px'} >
                            Gi??? giao
                        </Typography>
                        <Typography
                            fontFamily={'Roboto Slab'}
                            fontWeight={900}
                            fontSize={'16px'}
                            marginBottom={'5px'} >
                            {info.time}
                        </Typography>
                    </div>
                </Bos>
                <Bos id='note'>
                    <div style={{ width: '100%' }}>
                        <Typography
                            fontFamily={'Roboto Slab'}
                            fontWeight={500}
                            fontSize={'16px'}
                            marginBottom={'10px'} >
                            Ghi ch??
                        </Typography>
                        <Typography
                            fontFamily={'Roboto Slab'}
                            fontWeight={900}
                            fontSize={'16px'}
                            marginBottom={'5px'} >
                            {info.note}
                        </Typography>
                    </div>
                </Bos>
            </Card>
            <Card sx={{
                width: 800,
                padding: 5,
                borderRadius: '25px',
            }}>
                <Typography
                    textAlign={'center'}
                    textTransform={'uppercase'}
                    fontFamily={'Roboto Slab'}
                    paddingBottom={3}
                    fontWeight={700}
                    color={'rgb(255,114,22)'}>
                    ?????t h??ng th??nh c??ng
                </Typography>
                <Typography
                    textAlign={'center'}
                    fontFamily={'Roboto Slab'}
                    paddingBottom={3}
                    fontWeight={700}
                >
                    StupidMonkey s??? g???i li??n h??? b???n sau ??t ph??t ????? x??c nh???n ????n h??ng
                </Typography>
                <Typography
                    textAlign={'center'}
                    textTransform={'uppercase'}
                    fontFamily={'Roboto Slab'}
                    paddingBottom={3}
                    fontWeight={700}>
                    Xin c???m ??n
                </Typography>
                <Box sx={{
                    width: 300,
                    display: 'flex',
                    justifyContent: 'space-around',
                    position: 'relative',
                    left: 375
                }}>
                    <Typography
                        textAlign={'center'}
                        fontFamily={'Roboto Slab'}
                        paddingBottom={3}
                        fontWeight={700}
                    >
                        S??? l?????ng
                    </Typography>
                    <Typography
                        textAlign={'center'}
                        fontFamily={'Roboto Slab'}
                        paddingBottom={3}
                        fontWeight={700}
                    >
                        Th??nh ti???n
                    </Typography>
                </Box>
                <Box sx={{
                    width: '100%',
                    marginBottom: 5
                }}>
                    {listFood ? listFood.map((item, index) => (
                        <BillCard data={item} key={index} />
                    )) : <Card></Card>}
                </Box>
                <Divider />
                <Box>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        paddingTop: 2,
                    }}>
                        <Typography
                            padding={0}
                            fontFamily={'Roboto Slab'}
                            fontWeight={900}>T???ng h??a ????n</Typography>
                        <Typography
                            fontFamily={'Roboto Slab'}
                            fontWeight={900}>{configPrice(total)}</Typography>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        paddingTop: 2,
                    }}>
                        <Typography
                            padding={0}
                            fontFamily={'Roboto Slab'}
                            fontWeight={900}>Gi???m gi?? khuy???n m???i</Typography>
                        <Typography fontFamily={'Roboto Slab'}
                            fontWeight={900}>{configPrice(0)}</Typography>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        paddingTop: 2,
                    }}>
                        <Typography
                            padding={0}
                            fontFamily={'Roboto Slab'}
                            fontWeight={900}>VAT</Typography>
                        <Typography
                            fontFamily={'Roboto Slab'}
                            fontWeight={900}>{configPrice(Math.round(total*0.03))}</Typography>
                    </Box>
                    <Typography
                        fontFamily={'Roboto Slab'}
                        fontWeight={900}
                        fontSize={20}
                        textAlign={'center'}
                        textTransform={'uppercase'}
                        paddingTop={2}
                    >
                        s??? ti???n c???n thanh to??n
                    </Typography>
                    <Typography
                        fontFamily={'Roboto Slab'}
                        fontWeight={900}
                        fontSize={20}
                        textAlign={'center'}
                        textTransform={'uppercase'}
                        paddingTop={1}
                        color={'rgb(255,114,22)'}
                    >
                        {configPrice(total*1.03)}
                    </Typography>
                </Box>
                <Typography
                    padding={0}
                    fontFamily={'Roboto Slab'}
                    fontWeight={500}
                    textAlign={'center'}>(Gi?? tr??n ch??a bao g???m ph?? v???n chuy????n)</Typography>
            </Card>
        </Box>
    )
}
const Bos = styled.div`
    width: 100%;
    padding: 0 25px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
`
export default Bill