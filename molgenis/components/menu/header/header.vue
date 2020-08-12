<component>
    <header>
        <div :style="{ height: headerHeight + 'px' }" class="mg-sticky-header-padder" />
        <div ref="stickyHeader" class="fixed-top">
            <MenuHeaderImage v-if="molgenisMenu.topLogo" :img-max-height="molgenisMenu.topLogoMaxHeight" :img-src="molgenisMenu.topLogo" />
            <MenuNavbar :molgenis-menu="molgenisMenu" />
        </div>
    </header>
</component>
