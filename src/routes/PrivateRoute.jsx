import React, { lazy, Suspense, useEffect } from "react";
import { Routes as Switch, Route } from "react-router-dom";
import Router from "./route";
import Dashboard from "../user_portals/redirect_portal/Dashboard";
import Layout from "../user_portals/redirect_portal/Layout";
import NoPage from "../pages/NoPage";
import { useState } from "react";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import XmlCdr from "../user_portals/redirect_portal/XmlCdr";
import CallActive from "../user_portals/redirect_portal/CallActive";
import CallBlock from "../user_portals/redirect_portal/CallBlock";
import Campaigns from "../user_portals/redirect_portal/Campaigns";
import BuyerView from "../user_portals/redirect_portal/BuyerView";
import Destination from "../user_portals/redirect_portal/Destination";
import AdminDashboard from "../components/admin/AdminDashboard";
import User from "../components/admin/User";
import Manage_Campaign from "../components/admin/ManageCampaign";
import DidTfnNumber from "../components/admin/DidTfnNumber";
import ManageAddBuyer from "../components/admin/ManageAddBuyer";
import AdminReport from "../components/admin/AdminReport";
import AdminExtension from "../components/admin/AdminExtension";
import AdminCallActive from "../components/admin/AdminCallActive";
import AdminLayout from "../components/admin/AdminLayout";
import ServerStats from "../components/admin/Serverstats";
import AdminQueue from "../components/admin/AdminQueue";
import AdminMinutes from "../components/admin/AdminMinutes";
import AdminCarrier from "../components/admin/AdminCarrier";
import AdminView from "../components/admin/AdminView";
import AdminQueueMember from "../components/admin/AdminQueueMember";
import AdminLiveExtension from "../components/admin/AdminLiveExtension";
import AdminHistory from "../components/admin/AdminHistory";
import AdminAuditLog from "../components/admin/AdminAuditLogs";
import AdminivrUploads from "../components/admin/AdminivrUploads";
import AdminMOH from "../components/admin/AdminMOH";
import AdminPermission from "../components/admin/AdminPermission";
import AdminACL from "../components/admin/AdminACL";
import AdminAssistant from "../components/admin/AdminAssistant";
import AdminQueueCalls from "../components/admin/AdminQueueCalls";
import AdminCallBlock from "../components/admin/AdminCallBlock";
import AdminMDR from "../components/admin/AdminMDR";
import AdminBillingMinut from "../components/admin/AdminBillingMinut";
import ResellerLayout from "../components/reseller/ResellerLayout";
import ResellerDashboard from "../components/reseller/ResellerDashboard";
import ResellerUser from "../components/reseller/ResellerUser";
import ResellerManageCampaign from "../components/reseller/ResellerManageCampaign";
import ResellerManageAddBuyer from "../components/reseller/ResellerManageAddBuyer";
import ResellerReport from "../components/reseller/ResellerReport";
import ResellerExtension from "../components/reseller/ResellerExtension";
import ResellerCallActive from "../components/reseller/ResellerCallActive";
import ResellerQueueCalls from "../components/reseller/ResellerQueueCalls";
import ResellerCallBlock from "../components/reseller/ResellerCallBlock";
import ResellerServerStats from "../components/reseller/ResellerServerstats";
import ResellerQueue from "../components/reseller/ResellerQueue";
import ResellerBillingMinut from "../components/reseller/ResellerBillingMinut";
import ResellerQueueMember from "../components/reseller/ResellerQueueMember";
import ResellerMinutes from "../components/reseller/ResellerMinutes";
import ResellerAuditLogs from "../components/reseller/ResellerAuditLogs";
import ResellerivrUploads from "../components/reseller/ResellerivrUploads";
import ResellerMOH from "../components/reseller/ResellerMOH";
import ResellerCarrier from "../components/reseller/ResellerCarrier";
import ResellerView from "../components/reseller/ResellerView";
import ResellerLiveExtension from "../components/reseller/ResellerLiveExtension";
import ResellerHistory from "../components/reseller/ResellerHistory";
import ResellerPermission from "../components/reseller/ResellerPermission";
import ResellerACL from "../components/reseller/ResellerACL";
import ResellerAssistant from "../components/reseller/ResellerAssistant";
import ResellerDidTfnNumber from "../components/reseller/ResellerDidTfnNumber";
import SessionExpired from "../pages/SessionExpired";
import AdminAclHistory from "../components/admin/AdminAclHistory";
import AdminProduct from "../components/admin/AdminProduct";
import AdminInvoice from "../components/admin/AdminInvoice";
import AdminPromotional from "../components/admin/AdminPromotional";
import ErrorBoundary from "../pages/ErrorBoundaries";
import AdminCMU from "../components/admin/AdminCMU";
import { CircularProgress } from "@mui/material";

Chart.register(CategoryScale);
function PrivateRoute() {
  const MinutesLog = lazy(() => import("../../src/user_portals/redirect_portal/MinutesLog")); // Adjust the path if needed
  const user = JSON.parse(localStorage.getItem("admin"));
  const reseller = JSON.parse(localStorage.getItem("reseller"));
  const current_user = localStorage.getItem("current_user");
  const [open, setOpen] = useState(false);

  // toggle 
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const yValues = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // -------------

  //state
  const color = localStorage.getItem("theme-color");
  const usercolor = localStorage.getItem("user-color");

  const [colorThem, setColorTheme] = useState(color);
  const [userThem, setUserThem] = useState(usercolor);

  //effect
  useEffect(() => {
    //check for selected the ///localstorage value
    const currentThemeColor = localStorage.getItem("them-color");
    //if found set selected theme value in state
    if (currentThemeColor) {
      setColorTheme(currentThemeColor);
    }

    //check for selected the ///localstorage value
    const currentUserThemeColor = localStorage.getItem("user-color");
    //if found set selected theme value in state
    if (currentUserThemeColor) {
      setUserThem(currentUserThemeColor);
    }
  }, []);

  const handleClick = (theme) => {
    setColorTheme(theme);
    localStorage.setItem("theme-color", theme);
  };
  // -------------
  const handleClickUser = (usertheme) => {
    setUserThem(usertheme);
    localStorage.setItem("user-color", usertheme);
  };

  const [chartData, setChartData] = useState({
    type: "line",
    labels: yValues,
    datasets: [
      {
        data: [1000, 2000, 3000, 3100],
        borderColor: "red",
        backgroundColor: "red",
        fill: false,
      },
      {
        data: [300, 400, 600, 332],
        borderColor: "green",
        backgroundColor: "green",
        fill: false,
      },
      {
        data: [1000, 2000, 2500, 2768],
        borderColor: "blue",
        backgroundColor: "blue",
        fill: false,
      },
      {
        data: [1500, 2000, 4000, 400],
        borderColor: "yellow",
        backgroundColor: "yellow",
        fill: false,
      },
    ],
  });

  return (
    <>
      {/* <Sidebar/> */}
      <Switch>
        {user !== null ? (
          <>
            <Route
              path={Router.ADMIN_DASHBOARD}
              element={
                <AdminLayout colorThem={colorThem} handleClick={handleClick} />
              }
            >
              <Route
                path={Router.ADMIN_DASHBOARD}
                element={<AdminDashboard colorThem={colorThem} />}
              />
              <Route
                path={Router.ADMIN_USER}
                element={<User colorThem={colorThem} />}
              />
              <Route
                path={Router.ADMIN_MANAGE_CAMPAIGN}
                element={<ErrorBoundary><Manage_Campaign colorThem={colorThem} /></ErrorBoundary>}
              />
              <Route
                path={Router.ADMIN_BUYER}
                element={<ManageAddBuyer colorThem={colorThem} />}
              />
              <Route
                path={Router.ADMIN_DID_TFN_NUMBER}
                element={<DidTfnNumber colorThem={colorThem} />}
              />
              <Route
                path={Router.ADMIN_REPORT}
                element={<AdminReport colorThem={colorThem} />}
              />
              <Route
                path={Router.ADMIN_EXTENSION}
                element={<AdminExtension colorThem={colorThem} />}
              />

              <Route
                path={Router.ADMIN_CALL_ACTIVE}
                element={<AdminCallActive colorThem={colorThem} />}
              />

              <Route
                path={Router.ADMIN_QUEUE_CALLS}
                element={<AdminQueueCalls colorThem={colorThem} />}
              />
              <Route
                path={Router.ADMIN_CALL_BLOCK}
                element={<AdminCallBlock colorThem={colorThem} />}
              />

              <Route
                path={Router.ADMIN_SERVER_STATS}
                element={<ServerStats colorThem={colorThem} />}
              />
              <Route
                path={Router.ADMIN_QUEUE}
                element={<AdminQueue colorThem={colorThem} />}
              />
              <Route
                path={Router.ADMIN_BILLING_MINUTES}
                element={<AdminBillingMinut colorThem={colorThem} />}
              />
              <Route
                path={Router.ADMIN_QUEUE_MEMBER}
                element={<AdminQueueMember colorThem={colorThem} />}
              />
              <Route
                path={Router.ADMIN_MINUTES}
                element={<AdminMinutes colorThem={colorThem} />}
              />
              <Route
                path={Router.ADMIN_MDR}
                element={<AdminMDR colorThem={colorThem} />}
              />
              <Route
                path={Router.ADMIN_PRODUCT}
                element={<AdminProduct colorThem={colorThem} />}
              />
              <Route
                path={Router.ADMIN_INVOICE}
                element={<AdminInvoice colorThem={colorThem} />}
              />

              <Route
                path={Router.ADMIN_AUDIT_LOGS}
                element={<AdminAuditLog colorThem={colorThem} />}
              />
              <Route
                path={Router.ADMIN_IVR_UPLOADS}
                element={<AdminivrUploads colorThem={colorThem} />}
              />

              <Route
                path={Router.AdminMOH}
                element={<AdminMOH colorThem={colorThem} />}
              />
              <Route
                path={Router.ADMIN_CARRIER}
                element={<AdminCarrier colorThem={colorThem} />}
              />
              <Route
                path={Router.ADMIN_VIEW}
                element={<AdminView colorThem={colorThem} />}
              />
              <Route
                path={Router.ADMIN_LIVE_EXTENSION}
                element={<AdminLiveExtension colorThem={colorThem} />}
              />
              <Route
                path={Router.ADMIN_HISTORY}
                element={<AdminHistory colorThem={colorThem} />}
              />
              <Route
                path={Router.ADMIN_PERMISSIONS_ACCESS}
                element={<AdminPermission colorThem={colorThem} />}
              />
              <Route
                path={Router.ADMIN_ACL}
                element={<AdminACL colorThem={colorThem} />}
              />
              <Route
                path={Router.ADMIN_ACL_HISTORY}
                element={<AdminAclHistory colorThem={colorThem} />}
              />
              <Route
                path={Router.ADMIN_TFN_ASSISTANT}
                element={<AdminAssistant colorThem={colorThem} />}
              />
              <Route
                path={Router.ADMIN_PROMOTION}
                element={<ErrorBoundary><AdminPromotional colorThem={colorThem} /></ErrorBoundary>}
              />
              <Route
                path={Router.ADMIN_CMU}
                element={<ErrorBoundary><AdminCMU colorThem={colorThem} /></ErrorBoundary>}
              />
            </Route>
          </>
        ) : (
          <>
            <Route path="*" element={<SessionExpired />} />
          </>
        )}

        {reseller !== null ? (
          <>
            <Route
              path={Router.RESELLER_DASHBOARD}
              element={
                <ResellerLayout
                  colorThem={colorThem}
                  handleClick={handleClick}
                />
              }
            >
              <Route
                path={Router.RESELLER_DASHBOARD}
                element={<ResellerDashboard colorThem={colorThem} />}
              />
              <Route
                path={Router.RESELLER_USER}
                element={<ResellerUser colorThem={colorThem} />}
              />
              <Route
                path={Router.RESELLER_MANAGE_CAMPAIGN}
                element={<ResellerManageCampaign colorThem={colorThem} />}
              />
              <Route
                path="/reseller_portal/viewbuyer"
                element={<ResellerManageAddBuyer colorThem={colorThem} />}
              />
              <Route
                path={Router.RESELLER_DID_TFN_NUMBER}
                element={<ResellerDidTfnNumber colorThem={colorThem} />}
              />
              <Route
                path={Router.RESELLER_REPORT}
                element={<ResellerReport colorThem={colorThem} />}
              />
              <Route
                path={Router.RESELLER_EXTENSION}
                element={<ResellerExtension colorThem={colorThem} />}
              />

              <Route
                path={Router.RESELLER_CALL_ACTIVE}
                element={<ResellerCallActive colorThem={colorThem} />}
              />

              <Route
                path={Router.RESELLER_QUEUE_CALLS}
                element={<ResellerQueueCalls colorThem={colorThem} />}
              />
              <Route
                path={Router.RESELLER_CALL_BLOCK}
                element={<ResellerCallBlock colorThem={colorThem} />}
              />

              <Route
                path={Router.RESELLER_SERVER_STATS}
                element={<ResellerServerStats colorThem={colorThem} />}
              />
              <Route
                path={Router.RESELLER_QUEUE}
                element={<ResellerQueue colorThem={colorThem} />}
              />
              <Route
                path={Router.RESELLER_BILLING_MINUTES}
                element={<ResellerBillingMinut colorThem={colorThem} />}
              />
              <Route
                path={Router.RESELLER_QUEUE_MEMBER}
                element={<ResellerQueueMember colorThem={colorThem} />}
              />
              <Route
                path={Router.RESELLER_MINUTES}
                element={<ResellerMinutes colorThem={colorThem} />}
              />

              <Route
                path={Router.RESELLER_AUDIT_LOGS}
                element={<ResellerAuditLogs colorThem={colorThem} />}
              />
              <Route
                path={Router.RESELLER_IVR_UPLOADS}
                element={<ResellerivrUploads colorThem={colorThem} />}
              />

              <Route
                path={Router.RESELLER_MOH}
                element={<ResellerMOH colorThem={colorThem} />}
              />

              <Route
                path={Router.RESELLER_CARRIER}
                element={<ResellerCarrier colorThem={colorThem} />}
              />
              <Route
                path={Router.RESELLER_VIEW}
                element={<ResellerView colorThem={colorThem} />}
              />
              <Route
                path={Router.RESELLER_LIVE_EXTENSION}
                element={<ResellerLiveExtension colorThem={colorThem} />}
              />
              <Route
                path={Router.RESELLER_HISTORY}
                element={<ResellerHistory colorThem={colorThem} />}
              />
              <Route
                path={Router.RESELLER_PERMISSIONS_ACCESS}
                element={<ResellerPermission colorThem={colorThem} />}
              />
              <Route
                path={Router.RESELLER_ACL}
                element={<ResellerACL colorThem={colorThem} />}
              />
              <Route
                path={Router.RESELLER_TFN_ASSISTANT}
                element={<ResellerAssistant colorThem={colorThem} />}
              />
            </Route>
          </>
        ) : (
          <>
            <Route path="*" element={<SessionExpired />} />
          </>
        )}
        {current_user !== null ? (
          <>
            <Route
              path={Router.REDIRECT_DASHBOARD}
              element={
                <Layout userThem={userThem} handleClickUser={handleClickUser} toggleDrawer={toggleDrawer} open={open} setOpen={setOpen}/>
              }
            >
              <Route
                index
                element={
                  <Dashboard chartData={chartData} userThem={userThem} />
                }
              />
              <Route
                path={Router.REDIRECT_CAMPAIGNS}
                element={<Campaigns userThem={userThem} />}
              />
              <Route
                path={Router.REDIRECT_DESTINATION}
                element={<Destination userThem={userThem} />}
              />
              <Route
                path={Router.REDIRECT_CALL_ACTIVE}
                element={<CallActive userThem={userThem} />}
              />
              <Route
                path={Router.REDIRECT_XML_CDR}
                element={<XmlCdr userThem={userThem} />}
              />
              <Route
                path={Router.REDIRECT_CALL_BLOCK}
                element={<CallBlock userThem={userThem} />}
              />
              <Route
  path={Router.REDIRECT_MINUTES_LOG}
  element={
    <Suspense
      // fallback={
      //   <div style={{ textAlign: "center", marginTop: "100px" }}>
      //     <CircularProgress />
      //   </div>
      // }
    >
      <MinutesLog userThem={userThem} />
    </Suspense>
  }
/>

              <Route
                path={Router.REDIRECT_BUYER_VIEW}
                element={<BuyerView userThem={userThem} />}
              />
              <Route path="*" element={<NoPage />} />
            </Route>
          </>
        ) : (
          <>
            <Route path="*" element={<SessionExpired />} />
          </>
        )}
      </Switch>
    </>
  );
}

export default PrivateRoute;
