import { log } from "console";
import http from "./http";

export function registerIndividualUser(data: object) {
  return http.post(`/auth/register/individual`, data);
}

export function registerCorporatelUser(data: object) {
  return http.post(`/auth/register/corporate`, data);
}

export function resendEmailOTP(data: object) {
  return http.post(`auth/resend-email-verification-token`, data);
}

export function login(data: object) {
  return http.post(`/auth/login`, data);
}
export function adminLogin(data: object) {
  return http.post(`/auth/admin/login`, data);
}
export function createAdmin(data: object) {
  return http.post(`/auth/admin/create`, data);
}

export function getAllAdminRequests() {
  return http.get(`/admins/requests`);
}

export function getAllIndividualRequests() {
  return http.get(`/admins/requests/individual`);
}

export function getAllCorporateRequests() {
  return http.get(`/admins/requests/corporate`);
}

export function getIndividualRequestsByStatus(status: string) {
  return http.get(`admins/requests/individual/${status}`);
}

export function getCorporateRequestsByStatus(status: string) {
  return http.get(`admins/requests/corporate/${status}`);
}

export function ApproveRequest(id: string | string[]) {
  return http.patch(`admins/request/${id}`);
}

// export function rejectRequest(id: string | string[], data: {}) {
//   return http.delete(`/admins/request/${id}`, data);
// }
export function adminDeactivateApprovedUser(data: {}) {
  console.log("datatata", data);

  return http.delete(`admins/deactivate/user`, { data });
}

export function rejectRequest(
  id: string | string[],
  reasonForRejection: string
) {
  return http.delete(`/admins/request/${id}`, {
    data: { reasonForRejection: reasonForRejection },
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function getAllAdmins() {
  return http.get(`/admins`);
}

export function getrequestDetailApi(id: string | string[]) {
  return http.get(`/admins/request/${id}`);
}
export function logout(data: object) {
  return http.post(`/logout`, data);
}

export function verifyEmail(data: object) {
  return http.post(`/auth/verify-email`, data);
}

export function forgotPassword(data: object) {
  return http.post(`/auth/forgot-password`, data);
}

export function resetPassword(data: object) {
  return http.post(`/auth/reset-password`, data);
}

export function UpdatePassword(data: object) {
  return http.post(`users/update-password`, data);
}
export function createUser(data: object) {
  return http.post(`/users/create-user`, data);
}

export function getUsersProfile() {
  return http.get(`/users/profile`);
}

export function getNigerianStates() {
  return http.get("/users/states");
}

export function getStateLGAs(data: string) {
  return http.get(`users/lgas/` + data);
}

export function SubmitIndividualAddress(data: object) {
  return http.post(`/addresses/dashboard/individual`, data);
}

export function SubmitBusinessAddress(data: object) {
  return http.post(`/addresses/dashboard/business`, data);
}

export function getPendingRequests() {
  return http.get(`users/address-requests/pending`);
}

export function getVerifiedRequests() {
  return http.get(`users/address-requests/verified`);
}

export function getAllRequests() {
  return http.get(`users/address-requests`);
}

export function submitBulkIndividualRequests(data: FormData) {
  return http.post(`addresses/individual/bulk`, data);
}

export function submitBulkBusinessRequests(data: object) {
  return http.post(`addresses/business/bulk`, data);
}

export function getInvitedUsers() {
  return http.get(`users/users`);
}

export function fetchRequestDetails(data: string | string[]) {
  return http.get(`addresses/${data}`);
}

export function fetchUserDetails(data: {}) {
  console.log(data);

  return http.get(`/admins/user`, data);
}
