import React from "react";
import { renderToString } from "react-dom/server";

import { Helmet } from "react-helmet";


const Seo = ({ title, description }) => {
    return (
        <Helmet
            title={title}
            meta={[
                {
                    property: "og:title",
                    content: title
                },
                {
                    name: "description",
                    content: description || ""
                },
                {
                    property: "og:description",
                    content: description || ""
                },
            ]}
        />

    );
};

export const SeoRenderer = (props) => renderToString(<Seo {...props} />);

export default Seo;
