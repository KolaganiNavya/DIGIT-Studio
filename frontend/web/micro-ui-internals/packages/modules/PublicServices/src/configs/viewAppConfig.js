import React from "react";

export const ViewApplicationConfig = (response,code) => {
    const values = response.attributes.map(attr => ({
        key: `${code}.${attr.attributeCode}`,
        value: `${code}.${attr.attributeCode}.${attr.value}`
    }));

    const config = {
        cards: [
            {
                sections: [
                    {
                        type: "DATA",
                        cardHeader: { value: "View Application", inlineStyles: { marginTop: "2rem" } },
                        values: values
                    },
                ],
            },
        ],
        apiResponse: response,
        additionalDetails: {},
    };
    return config;
}

export default ViewApplicationConfig;
