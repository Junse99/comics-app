import React from 'react'
import {Layout, Button, Breadcrumb} from 'antd'
import ComicCard from '../ComicCard/ComicCard'
import './ColumnCard.css'

const {Header, Footer, Content} = Layout;

const ColumnCard = ({
    title= 'Title', 
    comics = [],
    onSelect
}) => {

    return (
        <Layout className="column-card-container">
            <Header className="header-column">{title}</Header>
            <Content>
                {
                    comics.map((comic) => {

                        return <ComicCard
                            comic = {comic}
                            onSelect={onSelect}
                            key={comic.id}
                            >
                        </ComicCard>
                    }
                    ) 
                }
            </Content>
        </Layout>
    );
}

export default ColumnCard;