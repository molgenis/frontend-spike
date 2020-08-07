import DropDownItems from './DropDownItems'
import languageRepository from '@/repository/LanguageRepository'
import languageService from '@/service/LanguageService'
import eventUtilService from '@/service/EventUtilService'

const href = (item) => item.params ? `${item.id}?${item.params}` : item.id

export default {
    name: 'NavBar',
    props: ['molgenisMenu'],
    components: {
        DropDownItems,
    },
    data() {
        return {
            selectedLanguage: null,
            languages: [],
            expectedNavHeight: null,
            wrapMargin: null,
            showHamburger: false,
            dynamicHamburgerBreakpoint: null,
        }
    },
    methods: {
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
        handleLanguageSelect() {
            languageRepository.setSelectedLanguage(this.selectedLanguage.id).then(() => {
                location.reload(true)
            })
        },
        getClientWidth() {
            return window.innerWidth || document.documentElement.clientWidth ||
          document.body.clientWidth
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
        debounce: eventUtilService.debounce,
        getPixelValue(sourceObject, propertyName) {
            return parseInt(sourceObject.getPropertyValue(propertyName), 10)
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
    updated() {
        if (this.expectedNavHeight) {
            this.handleResize()
        }
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize)
    },
}