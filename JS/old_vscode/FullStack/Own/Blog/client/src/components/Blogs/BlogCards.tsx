import { BlogType } from '../Main/Home'
// import BlogCard from './BlogCard';

import React, { useEffect, lazy, Suspense } from 'react';

const BlogCard = lazy(() => (import('./BlogCard')))

export interface BlogCardsProps {
    blogs: BlogType[]
}

const BlogCards: React.FC<BlogCardsProps> = ({ blogs }) => {

    return (
        <>
            {
                blogs.map((blog: BlogType, index: number) => {
                    return (
                        <Suspense fallback={<div>Loading...</div>} key={index}>
                            <BlogCard Blog={blog} key={index} />
                        </Suspense>

                    )
                })
            }
        </>
    );
}

export default React.memo(BlogCards);