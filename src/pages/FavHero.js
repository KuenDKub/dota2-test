import { Layout } from 'antd'
import { Content, Footer } from 'antd/lib/layout/layout'
import React from 'react'
import { FavCard } from '../components/FavCard'

import classes from '../styles/Card.module.scss'

export const FavHero = () => {
    return (
        <Layout className="layout" style={{ backgroundSize: 'cover', backgroundImage: `url("https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/backgrounds/greyfade.jpg")` }}>
            <Content style={{ padding: '0 50px' }}>
                <div className={classes.site_layout_content}>
                    <h1>My Favourites Hero List</h1>
                    <hr width="60%"></hr>
                    <FavCard />
                </div>
            </Content>
            <Footer style={{ color: 'white', backgroundColor:'#001529' , textAlign: 'center', height:150 }}>Copyright ©2022</Footer>
        </Layout>
    )
}
