import { findValueInList, setCookie } from '@/service/CookieService'

const cookieAliveTime = 365 // in days

export default {
    name: 'CookieWall',
    props: {
        cookieName: {
            type: String,
            default: 'permissionforcookies',
        },
    },
    data: function() {
        return {
            show: true,
            hostname: window.location.hostname,
        }
    },
    created: function() {
        if (findValueInList(document.cookie, this.cookieName) === 'true') {
            this.show = false
        }
    },
    methods: {
        acceptCookies: function() {
            setCookie(this.cookieName, 'true', cookieAliveTime)
            this.show = false
        },
    },
}