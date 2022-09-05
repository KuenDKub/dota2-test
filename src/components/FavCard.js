import React, { lazy, useEffect, useRef, useState } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";

import { get_img } from "../services/APIs";

import { Card, Col, Row, Space, Radio, Input, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import classes from '../styles/Card.module.scss'
import { toast } from 'react-toastify';

const { Search } = Input;

export const FavCard = () => {

    const [attr_filter, setAttr_filter] = useState('clear');

    const [listhero, setListhero] = useState([]);

    const changeAttr = (e) => {
        setAttr_filter(e.target.value);
        if (e.target.value === 'clear') {
            const listhero_local = JSON.parse(localStorage.getItem('favourites_hero'))
            if (listhero_local) {
                setListhero(listhero_local)
            }
        } else {
            const listhero_main = JSON.parse(localStorage.getItem('favourites_hero'))

            let listhero_filter = []

            for (let i = 0; i <= listhero_main.length; i++) {
                if (listhero_main[i].primary_attr == e.target.value) {
                    listhero_filter.push(listhero_main[i])
                    setListhero(listhero_filter)
                }   
            }
        }
    };

    const savefav_to_localstorage = (item) => {
        localStorage.setItem('favourites_hero', JSON.stringify(item));
    }

    const remove_favourites = (hero) => {
        console.log(hero);
        console.log(listhero)
        const new_favourite_list = listhero.filter(
            (favourites_hero) => favourites_hero.id !== hero.id
        )
        console.log(new_favourite_list)
        setListhero(new_favourite_list)
        savefav_to_localstorage(new_favourite_list)
        toast.error('Remove hero to Favourites list');
    };

    const onSearch = (input) => {

        const listhero_main = JSON.parse(localStorage.getItem('favourites_hero'))

        let listhero_search = listhero_main.filter(entry => Object.values(entry).some(val => typeof val === "string" && val.includes(input)));

        setListhero(listhero_search)
    };

    const ClearSearch = (e) => {
        const listhero_local = JSON.parse(localStorage.getItem('favourites_hero'))
        if (listhero_local) {
            setListhero(listhero_local)
        }
    };

    const mapping_list = listhero?.map((hero, i) => {
        return (
            <Col xs={{ span: 20, offset: 2 }} sm={{ span: 12 }} md={{ span: 10, offset: 1 }} lg={{ span: 11, offset: 1 }} xl={{ span: 4, offset: 0 }} key={i}>
                <Card
                    title={<Link style={{ color: '#001529', fontWeight:'bold'}} to={"/" + hero.id + "/detail"}>{hero.localized_name}</Link>}
                    hoverable
                    className={classes.site_card_wrapper__card_box}
                    bordered={true}
                    cover={<img src={get_img + hero.img}/>}
                    extra={<Button style={{backgroundColor:"white"}} shape="circle" icon={<DeleteOutlined />} size='large' onClick={() => remove_favourites(hero)}/>}
                >
                </Card>
            </Col>
        )
    })


    useEffect(() => {
        const fav_listhero_main = JSON.parse(localStorage.getItem('favourites_hero'))
        setListhero(fav_listhero_main)
    }, [])

    return (
        <div className={classes.site_card_wrapper}>
            <Row style={{ marginTop:15 }}>
                <Col xl={{ span: 12, offset: 1 }} md={{ offset: 4 }} lg={{ span:8 ,offset:2}}>
                    <Space
                        className={classes.space}
                    >
                        ATTRIBUTE:
                        <Radio.Group value={attr_filter} onChange={changeAttr}>
                            <Radio.Button className={classes.site_card_wrapper__box} value="str"><img src='https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_strength.png' /></Radio.Button>
                            <Radio.Button className={classes.site_card_wrapper__box} value="agi"> <img src='https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_agility.png' /></Radio.Button>
                            <Radio.Button className={classes.site_card_wrapper__box} value="int"><img src='https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_intelligence.png' /></Radio.Button>
                            <Radio.Button className={classes.site_card_wrapper__box} value="clear"><img src='https://cdn-icons-png.flaticon.com/512/6066/6066733.png' /></Radio.Button>
                        </Radio.Group>
                    </Space>
                </Col>
                <Col xl={{ offset: 1 }} md={{ offset: 5 }} lg={{ span:8 ,offset:3}}>
                    <Space
                        className={classes.space}
                    >
                        <Search onSearch={onSearch} placeholder="Input name hero to search" enterButton="Search" size='large' />
                        <Button onClick={ClearSearch} type="ghost" size='large'>Clear</Button>
                    </Space>
                </Col>
            </Row>
            <Row style={{ marginTop: 15 }} gutter={[16, 32]}>
                {mapping_list}
            </Row>
        </div >
    )
}
