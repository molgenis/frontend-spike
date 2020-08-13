<component class="c-header">
    <div :style="{ height: headerHeight + 'px' }" />
    <div ref="stickyHeader" class="fixed-top">
        <MenuNavbar :molgenis-menu="molgenisMenu" />
    </div>
</component>
