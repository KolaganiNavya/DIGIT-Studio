import React from "react";

export const ViewApplicationConfig = (response, code, cardItems) => {
    const values = response.attributes.map(attr => {
        const matchingItem = cardItems[0]?.attributes?.find(a => a.code == attr.attributeCode);
        const isSingleValueList = matchingItem?.dataType === "SingleValueList";
        return {
            key: `${code}.${attr.attributeCode}`,
            value: isSingleValueList ? `${code}.${attr.attributeCode}.${attr.value}` : attr.value
        };
    });

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
