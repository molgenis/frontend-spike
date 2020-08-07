export default {
    data: function() {
        return {
            additionalMessage: this.molgenisFooter.additionalMessage,
            appVersion: this.molgenisFooter.appVersion,
            buildDate: this.molgenisFooter.buildDate,
            molgenisSite: this.molgenisFooter.molgenisSite,
            version: this.molgenisFooter.version,
        }
    },
    name: 'FooterComponent',
    props: ['molgenisFooter'],

}