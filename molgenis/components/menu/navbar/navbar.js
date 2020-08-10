import DropDownItems from '../dropdown-items/dropdown-items.js'
import eventUtilService from '/molgenis/lib/service/event-util.js'
import languageRepository from '/molgenis/lib/repository/language.js'
import languageService from '/molgenis/lib/service/language.js'


const href = (item) => item.params ? `${item.id}?${item.params}` : item.id

export default {
    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize)
    },
    components: {
        DropDownItems,
    },
    data() {
        return {
            dynamicHamburgerBreakpoint: null,
            expectedNavHeight: null,
            languages: [],
            selectedLanguage: null,
            showHamburger: false,
            wrapMargin: null,
        }
    },
    methods: {
        debounce: eventUtilService.debounce,
        getClientWidth() {
            return window.innerWidth || document.documentElement.clientWidth ||
            document.body.clientWidth
        },
        getPixelValue(sourceObject, propertyName) {
            return parseInt(sourceObject.getPropertyValue(propertyName), 10)
        },
        handleLanguageSelect() {
            languageRepository.setSelectedLanguage(this.selectedLanguage.id).then(() => {
                location.reload(true)
            })
        },
        handleResize() {
            if (this.showHamburger) {
                if (this.getClientWidth() > this.dynamicHamburgerBreakpoint) {
                    this.showHamburger = false
                }
            } else {
                const actualNavHeight = this.$refs.mgNavBarNav.clientHeight
                const heightBreakPoint = this.expectedNavHeight + this.wrapMargin
                if (actualNavHeight > heightBreakPoint) {
                    this.dynamicHamburgerBreakpoint = this.getClientWidth()
                    this.showHamburger = true
                }
            }
        },
        href,
        isSelectedPlugin(plugin) {
            return plugin === this.molgenisMenu.selectedPlugin
        },
        logout() {
            if (this.logoutFunction) {
                this.logoutFunction()
            }
            document.getElementById('logout-form').submit()
        },
    },
    mounted() {
        const links = this.$refs.mgNavBarNav.getElementsByClassName('nav-link')
        if (links.length) {
            const linkStyleObject = window.getComputedStyle(links[0])
            const lineHeight = this.getPixelValue(linkStyleObject, 'line-height')
            const paddingTop = this.getPixelValue(linkStyleObject, 'padding-top')
            const paddingBottom = this.getPixelValue(linkStyleObject, 'padding-bottom')
            this.wrapMargin = Math.round(lineHeight / 2)
            this.expectedNavHeight = lineHeight + paddingTop + paddingBottom
            window.addEventListener('resize', this.debounce(this.handleResize, 100))
        }

        if (this.molgenisMenu.authenticated) {
            Promise.all([languageRepository.getActivelangueges(),
                languageRepository.getSelectedlanguegeCode()]).then((results) => {
                this.languages = results[0]
                this.selectedLanguage = languageService.selectedLanguage(this.languages, results[1])
            })
        }
    },
    name: 'NavBar',
    props: ['molgenisMenu'],
    updated() {
        if (this.expectedNavHeight) {
            this.handleResize()
        }
    },
}