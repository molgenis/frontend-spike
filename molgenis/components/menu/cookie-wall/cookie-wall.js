import { findValueInList, setCookie } from '/molgenis/lib/service/cookie.js'

const cookieAliveTime = 365 // in days

export default {
    created: function() {
        if (findValueInList(document.cookie, this.cookieName) === 'true') {
            this.show = false
        }
    },
    data: function() {
        return {
            hostname: window.location.hostname,
            show: true,
        }
    },
    methods: {
        acceptCookies: function() {
            setCookie(this.cookieName, 'true', cookieAliveTime)
            this.show = false
        },
    },
    name: 'CookieWall',
    props: {
        cookieName: {
            default: 'permissionforcookies',
            type: String,
        },
    },
}