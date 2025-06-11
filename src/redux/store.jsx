import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userReducer,
  allUserReducers,
  updateUserReducer,
  deleteUserReducer,
  createUserReducer,
  userRoleReducers,
  updateUserStatusReducer,
} from "./reducers/userReducer";
import { blockReportReducers, reportReducers } from "./reducers/reportReducer";
import {
  allDidReducers,
  createDestinationReducer,
  getRedirectGroupReducers,
  suspendDestinationReducer,
  updateDestinationReducer,
} from "./reducers/destinationReducer";
import {
  allExtensionReducers,
  createExtensionReducer,
  deleteAdminExtensionReducer,
  updateExtensionReducer,
} from "./reducers/extensionReducer";
import {
  allManageDidReducers,
  updateManageDestinationReducer,
} from "./reducers/managePortal_destinationReducers";
import {
  allManageExtensionReducers,
  createManageExtensionReducer,
  deleteManageExtensionReducer,
  getManageProfileExtensionReducers,
  updateManageExtensionReducer,
} from "./reducers/managePortal_extensionReducer";
import { allManageReportReducers } from "./reducers/managePortal_reportReducer";
import {
  allDashboardChartReducers,
  allDashboardBillingChartReducers,
  allDashboardLineChartReducers,
} from "./reducers/adminPortal_dashboardReducer";
import { getAdminCallActiveReducers } from "./reducers/adminPortal_callActiveReducer";
import {
  createAdminMinutesReducer,
  getAdminBillingMinutesReducers,
  getAdminMinutesReducers,
  getAdminTotalMinutesReducers,
  updateAdminMinutesReducer,
} from "./reducers/adminPortal_minutesReducer";
import {
  createAdminQueueMemberReducer,
  createAdminQueueReducer,
  deleteAdminQueueMemberReducer,
  getAdminQueueMemberReducers,
  getAdminQueueReducers,
  updateAdminQueueReducer,
} from "./reducers/adminPortal_queueReducer";
import {
  createManageCallBlockReducer,
  deleteManageCallBlockReducer,
  getManageCallBlockReducers,
  updateManageCallBlockReducer,
} from "./reducers/managePortal_callBlockReducer";
import { getManageBillingReducers } from "./reducers/managePortal_billingReducer";
import {
  createAdminCarrierReducer,
  deleteAdminCarrierReducer,
  getAdminCarrierReducers,
  updateAdminCarrierReducer,
} from "./reducers/adminPortal_carrierReducer";
import { getAdminAuditLogsReducers } from "./reducers/adminPortal_auditLogsReducer";
import {
  createAdminRecordingReducers,
  getAdminRecordingReducers,
  updateAdminRecordingReducers,
} from "./reducers/adminPortal_recordingReducer";
import {
  createAdminMohReducer,
  getAdminMohReducers,
  updateAdminMohReducer,
} from "./reducers/adminPortal_mohReducer";
import {
  allPermissionsReducer,
  updatePermissionReducer,
} from "./reducers/adminPortal_permissionsReducer";
import {
  getAdminAddMinuteReducers,
  getAdminHistoryReducers,
  postAdminAddMinuteReducers,
} from "./reducers/adminPortal_historyReducer";
import {
  createAdminAclReducer,
  deleteAdminAclReducer,
  getAdminAclReducers,
  updateAdminAclReducer,
} from "./reducers/adminPortal_aclReducer";
import { getAdminAssistantReducers } from "./reducers/adminPortal_assistantReducer";
import {
  createManageRecordingReducers,
  getManageRecordingReducers,
  updateManageRecordingReducers,
} from "./reducers/managePortal_recordingReducer";
import {
  createManageMohReducer,
  getManageMohReducers,
  updateManageMohReducer,
} from "./reducers/managePortal_mohReducer";
import {
  createManageQueueMemberReducer,
  createManageQueueReducer,
  deleteManageQueueMemberReducer,
  getManageQueueMemberReducers,
  getManageQueueReducers,
  updateManageQueueReducer,
} from "./reducers/managePortal_queueReducer";
import {
  createAdminCallBlockReducer,
  deleteAdminCallBlockReducer,
  getAdminCallBlockReducers,
  updateAdminCallBlockReducer,
} from "./reducers/adminPortal_callBlockReducer";
import {
  resellerDashboardBillingChartReducers,
  resellerDashboardChartReducers,
  resellerDashboardLineChartReducers,
} from "./reducers/resellerPortal/resellerPortal_dashboardReducer";
import {
  getAdminResellersListReducers,
  getAdminUsersListReducers,
  getResellerRemainingMinutesReducers,
  getResellerUsersListReducers,
} from "./reducers/adminPortal_listReducer";
import {
  createAdminProductsReducer,
  getAdminProductsReducers,
} from "./reducers/adminPortal_productsReducer";
import {
  createAdminInvoiceReducer,
  getAdminInvoiceReducers,
  updateAdminInvoiceReducer,
} from "./reducers/adminPortal_invoiceReducer";
import {
  allUserResellerReducers,
  createUserResellerReducer,
  deleteUserResellerReducer,
  updateUserResellerReducer,
  userResellerReducer,
  userRoleResellerReducers,
} from "./reducers/resellerPortal/resellerPortal_usersReducer";
import {
  allDidResellerReducers,
  createDestinationResellerReducer,
  updateDestinationResellerReducer,
} from "./reducers/resellerPortal/resellerPortal_destinationReducer";
import {
  createAdminManageCampaignReducer,
  deleteAdminManageCampaignReducer,
  getAdminManageCampaignReducers,
  updateAdminManageCampaignReducer,
} from "./reducers/adminPortal/adminPortal_manageCampaignReducer";
import {
  createAdminAddBuyerReducer,
  deleteAdminAddBuyerReducer,
  getAdminAddBuyerReducers,
  updateAdminAddBuyerReducer,
} from "./reducers/adminPortal/adminPortal_addBuyerReducer";
import { blockUserReportReducers, getRedirectReportReducers } from "./reducers/redirectPortal/redirectPortal_reportReducer";
import { createRedirectCampaignReducer, deleteRedirectCampaignReducer, getRedirectCampaignReducer, updateRedirectCampaignReducer } from "./reducers/redirectPortal/redirectPortal_campaignReducer";
import { createRedirectBuyerReducer, deleteRedirectBuyerReducer, getRedirectBuyerReducer, updateRedirectBuyerReducer } from "./reducers/redirectPortal/redirectPortal_buyerReducer";
import { getRedirectDestinationReducer, getRedirectGroupsReducer, updateRedirectDestinationReducer } from "./reducers/redirectPortal/redirectPortal_destinationReducer";
import { getRedirectBillingHistoryReducer } from "./reducers/redirectPortal/redirectPortal_billingHistoryReducer";
import { createRedirectCallBlockReducer, deleteRedirectCallBlockReducer, getRedirectCallBlockReducer, updateRedirectCallBlockReducer } from "./reducers/redirectPortal/redirectPortal_callBlockReducer";
import { createAdminPromotionReducer, getAdminPromotionReducers } from "./reducers/adminPortal/adminPortal_promotionReducer";

const reducer = combineReducers({
  user: userReducer,
  report: reportReducers,
  roles: userRoleReducers,
  userReseller: userResellerReducer, //11-07-2024
  userRoleReseller: userRoleResellerReducers, //11-07-2024
  // GET
  allUsers: allUserReducers,
  allUserReseller: allUserResellerReducers, //11-07-2024
  allDid: allDidReducers,
  getAdminCallActive: getAdminCallActiveReducers,
  getAdminMinutes: getAdminMinutesReducers,
  getAdminQueue: getAdminQueueReducers,
  getAdminQueueMember: getAdminQueueMemberReducers,
  allDashboardChart: allDashboardChartReducers,
  allDashboardBillingChart: allDashboardBillingChartReducers,
  allExtension: allExtensionReducers,
  allManageDid: allManageDidReducers,
  allManageExtension: allManageExtensionReducers,
  allManageReport: allManageReportReducers,
  getManageCallBlock: getManageCallBlockReducers,
  getManageBilling: getManageBillingReducers,
  getAdminCarrier: getAdminCarrierReducers,
  getAdminAuditLogs: getAdminAuditLogsReducers,
  getAdminRecording: getAdminRecordingReducers,
  getAdminMoh: getAdminMohReducers,
  allPermissions: allPermissionsReducer,
  getAdminHistory: getAdminHistoryReducers,
  getAdminAcl: getAdminAclReducers,
  getAdminAssistant: getAdminAssistantReducers,
  getManageRecording: getManageRecordingReducers,
  getManageMoh: getManageMohReducers,
  getManageQueue: getManageQueueReducers,
  getManageQueueMember: getManageQueueMemberReducers,
  getAdminCallBlock: getAdminCallBlockReducers,
  allDashboardLineChart: allDashboardLineChartReducers,
  getAdminBillingMinutes: getAdminBillingMinutesReducers,
  getAdminTotalMinutes: getAdminTotalMinutesReducers,
  resellerDashboardChart: resellerDashboardChartReducers,
  resellerDashboardBillingChart: resellerDashboardBillingChartReducers,
  resellerDashboardLineChart: resellerDashboardLineChartReducers,
  getAdminAddMinute: getAdminAddMinuteReducers,
  getAdminUsersList: getAdminUsersListReducers,
  getAdminResellersList: getAdminResellersListReducers,
  getResellerUsersList: getResellerUsersListReducers,
  getResellerRemainingMinutes: getResellerRemainingMinutesReducers,
  getAdminProducts: getAdminProductsReducers,
  getManageProfileExtension: getManageProfileExtensionReducers,
  getAdminInvoice: getAdminInvoiceReducers, //05-07-2024
  allDidReseller: allDidResellerReducers, //11-07-2024
  getAdminManageCampaign: getAdminManageCampaignReducers, //16-08-2024
  getAdminAddBuyer: getAdminAddBuyerReducers, //17-08-2024
  getRedirectGroup: getRedirectGroupReducers, //30-08-2024
  getRedirectReport: getRedirectReportReducers, //04-09-2024
  getRedirectCampaign: getRedirectCampaignReducer, //11-09-2024
  getRedirectBuyer: getRedirectBuyerReducer, //13-09-2024
  getRedirectDestination: getRedirectDestinationReducer, //13-09-2024
  getRedirectBillingHistory: getRedirectBillingHistoryReducer, //16-09-2024
  getRedirectCallBlock: getRedirectCallBlockReducer, //16-09-2024
  getUserRedirectGroups:getRedirectGroupsReducer, //16-10-2024
  getAdminPromotion: getAdminPromotionReducers, //18-02-2025
  //CREATE
  createUser: createUserReducer,
  createUserReseller: createUserResellerReducer, //11-07-2024
  createAdminMinutes: createAdminMinutesReducer,
  createAdminQueue: createAdminQueueReducer,
  createAdminQueueMember: createAdminQueueMemberReducer,
  createDestination: createDestinationReducer,
  createExtension: createExtensionReducer,
  createManageExtension: createManageExtensionReducer,
  createManageCallBlock: createManageCallBlockReducer,
  createAdminCarrier: createAdminCarrierReducer,
  createAdminRecording: createAdminRecordingReducers,
  createAdminMoh: createAdminMohReducer,
  createAdminAcl: createAdminAclReducer,
  createManageRecording: createManageRecordingReducers,
  createManageMoh: createManageMohReducer,
  createManageQueue: createManageQueueReducer,
  createManageQueueMember: createManageQueueMemberReducer,
  createAdminCallBlock: createAdminCallBlockReducer,
  postAdminAddMinute: postAdminAddMinuteReducers,
  createAdminProducts: createAdminProductsReducer,
  createAdminInvoice: createAdminInvoiceReducer, //05-07-2024
  createDestinationReseller: createDestinationResellerReducer, //11-07-2024
  createBlockReport: blockReportReducers, //24-07-2024
  createAdminManageCampaign: createAdminManageCampaignReducer, //16-08-2024
  createAdminAddBuyer: createAdminAddBuyerReducer, //17-08-2024
  createRedirectCampaign:createRedirectCampaignReducer, //11-09-2024
  createRedirectCallBlock: createRedirectCallBlockReducer, //16-09-2024
  createRedirectBuyer: createRedirectBuyerReducer, //26-09-2024
  createAdminPromotion: createAdminPromotionReducer, //18-02-2025
  blockUserReport: blockUserReportReducers, //02-05-2025
  //UPDATE
  updateUser: updateUserReducer,
  updateUserReseller: updateUserResellerReducer, //11-07-2024
  updateAdminMinutes: updateAdminMinutesReducer,
  updateAdminQueue: updateAdminQueueReducer,
  updateDestination: updateDestinationReducer,
  updateManageDestination: updateManageDestinationReducer,
  updateExtension: updateExtensionReducer,
  updateAdminCarrier: updateAdminCarrierReducer,
  updateManageExtension: updateManageExtensionReducer,
  updateManageCallBlock: updateManageCallBlockReducer,
  updateAdminRecording: updateAdminRecordingReducers,
  updateAdminMoh: updateAdminMohReducer,
  updateAdminAcl: updateAdminAclReducer,
  updateManageRecording: updateManageRecordingReducers,
  updateManageQueue: updateManageQueueReducer,
  updateManageMoh: updateManageMohReducer,
  updatePermission: updatePermissionReducer,
  updateAdminCallBlock: updateAdminCallBlockReducer,
  updateAdminInvoice: updateAdminInvoiceReducer, //05-07-2024
  updateDestinationReseller: updateDestinationResellerReducer, //11-07-2024
  updateAdminManageCampaign: updateAdminManageCampaignReducer, //17-08-2024
  updateAdminAddBuyer: updateAdminAddBuyerReducer, //17-08-2024
  updateRedirectCampaign: updateRedirectCampaignReducer, //11-09-2024
  updateRedirectDestination: updateRedirectDestinationReducer, //16-09-2024
  updateRedirectCallBlock: updateRedirectCallBlockReducer, //16-09-2024
  updateRedirectBuyer:updateRedirectBuyerReducer, //26-09-2024
  suspendDestination: suspendDestinationReducer, //30-04-2025
  updateUserStatus: updateUserStatusReducer, //07-05-2025
  //DELETE
  deleteUser: deleteUserReducer,
  deleteUserReseller: deleteUserResellerReducer, //11-07-2024
  deleteAdminQueueMember: deleteAdminQueueMemberReducer,
  deleteAdminCarrier: deleteAdminCarrierReducer,
  deleteManageCallBlock: deleteManageCallBlockReducer,
  deleteAdminAcl: deleteAdminAclReducer,
  deleteManageQueueMember: deleteManageQueueMemberReducer,
  deleteAdminCallBlock: deleteAdminCallBlockReducer,
  deleteAdminExtension: deleteAdminExtensionReducer,
  deleteManageExtension: deleteManageExtensionReducer,
  deleteAdminAddBuyer: deleteAdminAddBuyerReducer, //17-08-2024
  deleteRedirectCallBlock: deleteRedirectCallBlockReducer, //16-09-2024
  deleteRedirectCampaign: deleteRedirectCampaignReducer, //18-09-2024
  deleteAdminManageCampaignReducer: deleteAdminManageCampaignReducer, //18-09-2024
  deleteRedirectBuyer: deleteRedirectBuyerReducer,  //26-09-2024
});

const middleware = [thunk];

const store = legacy_createStore(
  reducer,

  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
