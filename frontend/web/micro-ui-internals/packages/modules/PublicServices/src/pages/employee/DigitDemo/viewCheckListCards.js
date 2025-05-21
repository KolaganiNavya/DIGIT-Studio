import React from "react";
import { Card, TextBlock, Button } from "@egovernments/digit-ui-components";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import transformViewCheckList from "../../../utils/createUtils.js"
import CheckListCard from "../../../components/CheckListCard.js";

const ViewCheckListCards = () => {

    const code = [
        // "SMC BHAVYA.TRAINING_SUPERVISION.TEAM_SUPERVISOR",
        // "LLIN-mz_april_2025.TRAINING_SUPERVISION.PROVINCIAL_SUPERVISOR",
        // "apr14.TRAINING_SUPERVISION.PROVINCIAL_SUPERVISOR",
        // "SMC BHAVYA.T
        // RAINING_SUPERVISION.DISTRICT_SUPERVISOR",
        // "SMC Dev.TEAM_FORMATION.DISTRIBUTOR"
    ];
    const accountID = "873c8ebc-487b-4e0a-a9cf-ec98d57fd5ff";
    const [cardItems, setCardItems] = useState([]);

    const request = {
        url: "/health-service-request/service/definition/v1/_search",
        params: {},
        body: {},
        method: "POST",
        headers: {},
        config: {
            enable: false,
        },
    }
    const mutation = Digit.Hooks.useCustomAPIMutationHook(request);

    const getcarditems = async (code) => {
        await mutation.mutate(
            {
                url: "/health-service-request/service/definition/v1/_search",
                method: "POST",
                body: transformViewCheckList(code),
                config: {
                    enable: false,
                },
            },
            {
                onSuccess: (res) => {
                    setCardItems(res?.ServiceDefinitions);
                },
                onError: () => {
                    console.log("Error occured");
                },
            }
        )
    }

    useEffect(() => {
        getcarditems(code);
    }, []);

    return (
        <React.Fragment>
            {
                cardItems.map((item, index) => (
                    <CheckListCard item={item} accid={accountID} />
                ))
            }
        </React.Fragment>
    );
};

export default ViewCheckListCards;