import { Helmet } from "react-helmet-async";

export interface NotFoundProps {

}

const NotFound: React.FC<NotFoundProps> = () => {
    return (
        <><Helmet>
            <title>Error - Webpage Not Found</title>
            <meta name="description" content="Content not found" />
        </Helmet>
            <h1>Page not Found</h1>
        </>
    );
}

export default NotFound;