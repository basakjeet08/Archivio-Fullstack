package dev.anirban.archivio_backend.constants;

// Constants file which would keep all the URL Endpoints
public class UrlConstants {

    // Root Endpoints for testing and running
    public static final String PUBLIC_ROOT = "/public-root";
    public static final String PRIVATE_ROOT = "/private-root";

    // Auth Endpoints
    public static final String REGISTER_ADMIN_ENDPOINT = "register/admin";
    public static final String REGISTER_LIBRARIAN_ENDPOINT = "register/librarian";
    public static final String REGISTER_MEMBER_ENDPOINT = "register/member";
    public static final String LOGIN_ENDPOINT = "/login";

    // Librarian Endpoints
    public static final String LIBRARIAN_FETCH_ALL = "/librarian";
    public static final String LIBRARIAN_FETCH_BY_ID = "/librarian/{id}";
    public static final String LIBRARIAN_UPDATE = "/librarian";
    public static final String LIBRARIAN_DELETE = "/librarian/{id}";

    // Book Endpoints
    public static final String BOOK_CREATE = "/book";
    public static final String BOOK_FETCH_ALL = "/book";
    public static final String BOOK_FETCH_BY_ID = "/book/{id}";
    public static final String BOOK_UPDATE = "/book";
    public static final String BOOK_DELETE_BY_ID = "/book/{id}";

    // Book Request Endpoints
    public static final String BOOK_REQUEST_REQUESTED = "/book/request/requested";
    public static final String BOOK_REQUEST_APPROVE = "/book/request/approve";
    public static final String BOOK_REQUEST_RETURN = "/book/request/return";
    public static final String BOOK_REQUEST_FETCH_ALL = "/book/request";
    public static final String BOOK_REQUEST_FETCH_BY_ID = "/book/request/{id}";
}