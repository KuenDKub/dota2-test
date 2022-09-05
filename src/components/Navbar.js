import { Layout, Menu } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

import '../styles/Navbar.scss'

const { Header } = Layout

export const Navbar = () => {
    const menu_items = [
        {
           name:'List Hero',
        link: '/' 
        },{
            name:'My favourite hero',
            link: '/my-favhero' 
        }
    ]

    return (
        <Layout className='layout'>
            <Header style={{ height: 'auto' }}>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={menu_items.map((item) => {
                        return {
                            label: <Link to={item.link}>{item.name}</Link>,
                        };
                    })}
                    style={{ fontSize:20 }}
                />
            </Header>
        </Layout>
    )
}
