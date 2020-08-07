<component>
    <div class="mg-page" v-if="isContextLoaded">
        <cookie-wall v-if="context.showCookieWall" />
        <header-component :molgenis-menu="context" />
        <main class="mg-page-content">
            <slot>Molgenis page component, add data via slot</slot>
        </main>
        <footer-component :molgenis-footer="context" />
    </div>
</component>
