import { Layout } from 'antd'
import { Footer } from 'antd/lib/layout/layout'
import React from 'react'
import { HeroCard } from '../components/HeroCard'

import classes from '../styles/Card.module.scss'

const { Content } = Layout

export const ListHero = () => {
    return (
        <Layout className="layout" style={{ backgroundImage: `url("https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/backgrounds/greyfade.jpg")`, backgroundSize: 'cover', backgroundRepeat: 'repeat' }}>
            <Content style={{ padding: '0 50px'}}>
                <div className={classes.site_layout_content}>
                    <h1>CHOOSE YOUR HERO</h1>
                    <h2>From magical tacticians to fierce brutes and cunning rogues, Dota 2's hero pool is massive and limitlessly diverse. Unleash incredible abilities and devastating ultimates on your way to victory.</h2>
                    <hr width="60%"></hr>
                    <HeroCard />
                </div>
            </Content>
            <Footer style={{ color: 'white', backgroundColor:'#001529' , textAlign: 'center' }}>Copyright ©2022</Footer>
        </Layout>
    )
}
