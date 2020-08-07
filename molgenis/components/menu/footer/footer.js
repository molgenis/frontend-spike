export default {
    name: 'FooterComponent',
    props: ['molgenisFooter'],
    data: function() {
        return {
            additionalMessage: this.molgenisFooter.additionalMessage,
            version: this.molgenisFooter.version,
            buildDate: this.molgenisFooter.buildDate,
            appVersion: this.molgenisFooter.appVersion,
            molgenisSite: this.molgenisFooter.molgenisSite,
        }
    },
}