import { Flex, Icon, IconProps } from '@chakra-ui/react';
import {ImStarFull, ImStarHalf, ImStarEmpty} from 'react-icons/im'
import {round} from 'mathjs'
import { useEffect, useMemo } from 'react';
import { parse } from 'node:path/win32';

interface Props extends IconProps {
    maxRating: number;
    rating: number;

}

function StarRating({maxRating, rating, ...rest}: Props) {

    const arr = useMemo(() => {
        return Array(maxRating).fill(1).map((v, i) => {
            const [integerRating, decimalRating] = round(rating, 1).toString().split('.');
            const index = (i).toString();
            if(index == integerRating) {
                return decimalRating != undefined ? 0 : 1;
            } else{
                return parseInt(index) < rating ? 1 : -1;
            }
        })
    }, [rating]);
    return (  
        <Flex
        alignItems="center"
        >
            {
                arr.map((v, i) => {
                    const iconToUse = v == -1 ? <ImStarEmpty/> : (
                        v == 0 ? <ImStarHalf/> : <ImStarFull/>
                    );
                    return <Icon
                        key={i}
                        {...rest}
                    >
                        {iconToUse}
                    </Icon>;
                })
            }
        </Flex>
    );
}

export default StarRating;