import React from "react";
import { Card, TextBlock, Button, Loader } from "@egovernments/digit-ui-components";
import { transformViewApplication } from "../utils/createUtils";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const CheckListCard = (props) => {
    const [filled, setFilled] = useState(false);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const style = {
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        margin: "20px"
    };

    const request = {
        url: "/health-service-request/service/v1/_search",
        params: {},
        body: {},
        method: "POST",
        headers: {},
        config: {
            enable: false,
        },
    }
    const mutation = Digit.Hooks.useCustomAPIMutationHook(request);

    const isFilled = async (id, accid) => {

        await mutation.mutate(
            {
                url: '/health-service-request/service/v1/_search',
                method: "POST",
                body: transformViewApplication(id, accid),
                config: {
                    enable: false,
                },
            },
            {
                onSuccess: (res) => {
                    let field = res.Services.filter(items => items.serviceDefId == id);
                    if (field && field.length > 0) {
                        setFilled(true);
                    }
                    setLoading(true);
                },
                onError: () => {
                    console.log("Error checking filled status");
                    setLoading(true);
                },
            }
        )
    }

    useEffect(() => {
        isFilled(props.item.id, props.accid)
    }, [props.item.id, props.accid]);

    return (
        <div>
            {loading ? (
                <Card type="primary" style={style}>
                    <TextBlock body={props.item.code} />
                    {filled ? (
                        <Button label="View Response" onClick={() => history.push({ pathname: `/${window.contextPath}/employee/publicservices/viewresponse/${props.accid}/${props.item.id}/${props.item.code}` })} />
                    ) : (
                        <Button label="Fill Checklist" onClick={() => history.push({ pathname: `/${window.contextPath}/employee/publicservices/checklist/${props.accid}/${props.item.id}/${props.item.code}` })} />
                    )}
                </Card>
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default CheckListCard;