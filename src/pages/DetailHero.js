import { Avatar, Divider, Image, Layout, Tag } from 'antd';
import { Card, Badge, Descriptions, Col, Row } from 'antd';
import { Footer } from 'antd/lib/layout/layout';

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { get_attacktype, get_img, get_listhero } from '../services/APIs';

import classes from '../styles/DetailHero.module.scss'

const { Content } = Layout

const { Meta } = Card;

export const DetailHero = () => {
    const params = useParams();
    const hero_id = params.id;

    const [listhero_detail, setListhero_detail] = useState([]);
    const [attr, setAttr] = useState('');
    const [roles, setRoles] = useState('');
    const [attr_icon, setAttr_icon] = useState('');
    const [attack_icon, setAttack_icon] = useState('');

    const get_iconattr = (attr) => {
        if (attr === 'agi') {
            setAttr('AGILITY')
            setAttr_icon('https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_agility.png')
        } else if (attr === 'int') {
            setAttr('INTELLIGENCE')
            setAttr_icon('https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_intelligence.png')
        } else {
            setAttr('STRENGTH')
            setAttr_icon('https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_strength.png')
        }
    }

    const get_iconattacktype = (type) => {
        const lower_type = type.toLowerCase()

        if (lower_type === 'melee') {
            setAttack_icon(get_attacktype + 'melee.svg')
        } else {
            setAttack_icon(get_attacktype + 'ranged.svg')
        }
    }

    useEffect(() => {
        axios.get(get_listhero)
            .then((res) => {
                for (let i = 0; i <= res.data.length; i++) {
                    if (res.data[i].id == hero_id) {
                        setListhero_detail(res.data[i])
                        get_iconattr(res.data[i].primary_attr)
                        get_iconattacktype(res.data[i].attack_type)

                        const set_role = res.data[i].roles.map((e) => {
                            return e;
                        });
                        setRoles(set_role.join(', '))
                        break;
                    }
                }
            }).catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <Layout className="layout" style={{ backgroundImage: `url("https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/backgrounds/greyfade.jpg")`, backgroundSize: 'cover' }}>
            <Content style={{ padding: '0 50px' }}>
                <div className={classes.site_layout_content}>
                    <Row gutter={[16, 16]} style={{ marginTop: 50, textAlign: 'center' }}>
                        <Col xs={{ span: 20, offset: 2 }} sm={{ span: 12 }} md={{ span: 18, offset: 3 }} lg={{ span: 11, offset: 1}} xl={{ span: 10, offset: 2 }}>
                            <Card headStyle={{ fontSize: 50 , color: 'white', backgroundColor: '#001529'}} title={listhero_detail.localized_name}>
                                <Card headStyle={{ fontSize: 20 , color: 'white', backgroundColor: '#001529'}} title="Attributes Hero">
                                    <Card.Grid hoverable={false} bordered={false} style={{ width: '25%', textAlign: 'center', color: 'white', backgroundColor: '#001529'}}>
                                        <img className={classes.grid_style__icon} src={attr_icon} />
                                    </Card.Grid>
                                    <Card.Grid hoverable={false} bordered={false} style={{ width: '75%' }}>
                                        <h1>{attr}</h1>
                                    </Card.Grid>
                                </Card>
                                <Card style={{ marginTop: 16 }} headStyle={{ fontSize: 20 , color: 'white', backgroundColor: '#001529'}} title="Attack Type">
                                    <Card.Grid hoverable={false} bordered={false} style={{ width: '25%', textAlign: 'center', color: 'white', backgroundColor: '#001529' }}>
                                        <img className={classes.grid_style__icon_attack} src={attack_icon} />
                                    </Card.Grid>
                                    <Card.Grid hoverable={false} bordered={false} style={{ width: '75%' }}>
                                        <h1>{listhero_detail.attack_type}</h1>
                                    </Card.Grid>
                                </Card>
                            </Card>
                        </Col>
                        <Col xs={{ span: 20, offset: 2 }} sm={{ span: 20 }} md={{ span: 18, offset: 3 }} lg={{ span: 10, offset: 1 }} xl={{ span: 10, offset: 0 }} >
                            <Card cover={<img className={classes.grid_style__img} src={get_img + listhero_detail.img} />}>
                                <Card headStyle={{ fontSize: 20 , color: 'white', backgroundColor: '#001529'}} title="Roles" style={{ fontSize: 20 }}>
                                    {roles}
                                </Card>
                            </Card>
                        </Col>
                    </Row>
                    
                    <Row gutter={[16, 16]} style={{ marginTop: 50, textAlign: 'center' }}>
                        <Col xs={20} md={20} lg={16} xl={14} push={2}>
                            <Descriptions bordered >
                                <Descriptions.Item label="Base Armor" labelStyle={{color: 'white', backgroundColor: '#001529'}}>{listhero_detail.base_armor}</Descriptions.Item>
                                <Descriptions.Item label="Base Attack Minimum" labelStyle={{color: 'white', backgroundColor: '#001529'}}>{listhero_detail.base_attack_min}</Descriptions.Item>
                                <Descriptions.Item label="Base Attack Maximum" labelStyle={{color: 'white', backgroundColor: '#001529'}}>{listhero_detail.base_attack_max}</Descriptions.Item>
                                <Descriptions.Item label="Start Move Speed" labelStyle={{color: 'white', backgroundColor: '#001529'}}>{listhero_detail.move_speed}</Descriptions.Item>
                                <Descriptions.Item label="Attack Range" labelStyle={{color: 'white', backgroundColor: '#001529'}}>{listhero_detail.attack_range}</Descriptions.Item>
                                <Descriptions.Item label="Pro Player Pick" labelStyle={{color: 'white', backgroundColor: '#001529'}}>{listhero_detail.pro_pick}</Descriptions.Item>
                                <Descriptions.Item label="Main Attributes" labelStyle={{color: 'white', backgroundColor: '#001529'}}>
                                    <img src='https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_strength.png' />&emsp;{listhero_detail.base_str} + {listhero_detail.str_gain} per level
                                    <br />
                                    <img src='https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_agility.png' />&emsp;{listhero_detail.base_agi} + {listhero_detail.agi_gain} per level
                                    <br />
                                    <img src='https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_intelligence.png' />&emsp;{listhero_detail.base_int} + {listhero_detail.int_gain} per level
                                    <br />
                                </Descriptions.Item>
                            </Descriptions>
                        </Col>
                        <Col xs={{ span: 20, offset: 2 }} sm={{ span: 20 }} md={{ span: 24, offset: 4 }} lg={{ span: 4, offset: 2 }} xl={{ span: 6, offset: 2 }} >
                            <Card hoverable className={classes.card_herostatus}>
                                <Avatar style={{ backgroundColor: 'white' }} shape="square" size={100} icon={<img className={classes.card_herostatus__img_heroicon} src={get_img + listhero_detail.icon} />} />
                                <Divider orientation="center" style={{ fontSize: 30 , color: 'white'}}>{listhero_detail.localized_name} status</Divider>
                                <div>
                                    <Tag color="#87d068" className={classes.card_herostatus__bar_status}>{listhero_detail.base_health}</Tag>
                                    <Tag color="#87d068" className={classes.card_herostatus__bar_reg}>+ {listhero_detail.base_health_regen}</Tag><br />
                                    <Tag color="#2db7f5" className={classes.card_herostatus__bar_status}>{listhero_detail.base_mana}</Tag>
                                    <Tag color="#2db7f5" className={classes.card_herostatus__bar_reg}>+ {listhero_detail.base_mana_regen}</Tag>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Content>
            <Footer style={{ color: 'white', backgroundColor:'#001529' , textAlign: 'center' }}>Copyright ©2022</Footer>
        </Layout>
    )
}
