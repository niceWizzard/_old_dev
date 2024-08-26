import { Flex, Grid, useMediaQuery, Wrap } from '@chakra-ui/react';
import Header from '../shared/header/header';
import ProductPreview from '../shared/product_preview/ProductPreview';

function HomePage() {

    const [isBiggerThan1000] = useMediaQuery([
        '(min-width: 1000px)'
    ])
    let size = isBiggerThan1000 ? '18rem' : "10rem"
    return ( <>
        <Header/>
        <Grid
        gridTemplateColumns={`repeat(auto-fill, minmax(${size}, 1fr))`}
        gap="1rem 0.5rem"
        p={3}
        >
            
            <ProductPreview info={{
                coverPhoto: "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/i8yWk3WLdFLg/v1/1200x-1.jpg",
                price: 12,
                soldCount: 102122,
                title: '$12 Million',
                id: '1',
            }}/>
            <ProductPreview info={{
                coverPhoto: "https://image.cnbcfm.com/api/v1/image/106998054-1641517061268944AiroleWay-print-64.jpg?v=1641524919",
                price: 12,
                soldCount: 102122,
                title: '$12 Million',
                id: '1',
            }}/>
            
        </Grid>
        </>
     );

    
}

export default HomePage;