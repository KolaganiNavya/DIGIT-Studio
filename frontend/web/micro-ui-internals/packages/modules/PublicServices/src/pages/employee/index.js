import { AppContainer, PrivateRoute } from "@egovernments/digit-ui-react-components";
import { BreadCrumb } from "@egovernments/digit-ui-components";
import React from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "react-router-dom";
// import Inbox from "./SampleInbox";
import DigitDemoComponent from "./DigitDemo/digitDemoComponent";
import ViewCheckListCards from "./DigitDemo/viewCheckListCards";
import CheckList from "./DigitDemo/checkList";
import ViewApplication from "./DigitDemo/viewApplication";

const SampleBreadCrumbs = ({ location }) => {
  const { t } = useTranslation();
  const crumbs = [
    {
      internalLink: `/${window?.contextPath}/employee`,
      content: t("HOME"),
      show: true,
    },
    {
      content: t(location.pathname.split("/").pop()),
      show: true,
    },
  ];
  return <BreadCrumb crumbs={crumbs} />;
};

const App = ({ path, stateCode, userType, tenants }) => {
  return (
    <Switch>
      <AppContainer className="ground-container">
        <React.Fragment>
          <SampleBreadCrumbs location={location} />
        </React.Fragment>
        <PrivateRoute path={`${path}/:module/Apply`} component={() => <DigitDemoComponent />} />
        <PrivateRoute path={`${path}/viewapp`} component={() => <ViewCheckListCards />} />
        <PrivateRoute path={`${path}/checklist/:accid/:id/:code`} component={() => <CheckList />} />
        <PrivateRoute path={`${path}/viewresponse/:accid/:id/:code`} component={() => <ViewApplication />} />
      </AppContainer>
    </Switch>
  );
};

export default App;
