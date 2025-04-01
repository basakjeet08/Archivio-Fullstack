import { environment } from 'src/environments/environments';

export const BASE_URL = environment.apiBaseUrl;

// Authentication Endpoints
export const LOGIN_ENDPOINT = `${BASE_URL}/login`;
export const REGISTER_LIBRARIAN_ENDPOINT = `${BASE_URL}/register/librarian`;
export const REGISTER_MEMBER_ENDPOINT = `${BASE_URL}/register/member`;

// Librarian Endpoints
export const FETCH_ALL_LIBRARIAN_ENDPOINT = `${BASE_URL}/librarian`;
export const FETCH_LIBRARIAN_BY_ID_ENDPOINT = `${BASE_URL}/librarian/:id`;
export const UPDATE_LIBRARIAN_ENDPOINT = `${BASE_URL}/librarian`;
export const DELETE_LIBRARIAN_BY_ID_ENDPOINT = `${BASE_URL}/librarian/:id`;

// Book Endpoints
export const CREATE_BOOK_ENDPOINT = `${BASE_URL}/book`;
export const FETCH_ALL_BOOKS_ENDPOINT = `${BASE_URL}/book`;
export const FETCH_BOOK_BY_ID_ENDPOINT = `${BASE_URL}/book/:id`;
export const UPDATE_BOOK_ENDPOINT = `${BASE_URL}/book`;
export const DELETE_BOOK_ENDPOINT = `${BASE_URL}/book/:id`;

// Book Request Endpoints
export const CREATE_BOOK_REQUEST_ENDPOINT = `${BASE_URL}/book/request/requested`;
export const FETCH_ALL_BOOK_REQUEST_ENDPOINT = `${BASE_URL}/book/request`;
export const FETCH_BOOK_REQUEST_BY_USER_ENDPOINT = `${BASE_URL}/book/request/requester`;
export const FETCH_REQUEST_BY_EMAIL_AND_STATUS_ENDPOINT = `${BASE_URL}/book/request/requester?status=:status`;
export const FETCH_REQUEST_BY_ID_ENDPOINT = `${BASE_URL}/book/request/:id`;
export const APPROVE_BOOK_REQUEST_ENDPOINT = `${BASE_URL}/book/request/approve`;
export const RETURN_BOOK_REQUEST_ENDPOINT = `${BASE_URL}/book/request/return`;

// Stats Endpoints
export const FETCH_ADMIN_STATS_ENDPOINT = `${BASE_URL}/stats/admin`;
export const FETCH_LIBRARIAN_STATS_ENDPOINT = `${BASE_URL}/stats/librarian`;
export const FETCH_MEMBER_STATS_ENDPOINT = `${BASE_URL}/stats/member`;
