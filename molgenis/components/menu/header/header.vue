<component>
    <header>
        <div :style="{ height: headerHeight + 'px' }" class="mg-sticky-header-padder" />
        <div ref="stickyHeader" class="fixed-top">
            <header-image v-if="molgenisMenu.topLogo" :img-max-height="molgenisMenu.topLogoMaxHeight" :img-src="molgenisMenu.topLogo" />
            <nav-bar :molgenis-menu="molgenisMenu" />
        </div>
    </header>
</component>
