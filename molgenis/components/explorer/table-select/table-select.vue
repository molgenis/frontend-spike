<component>
    <b-nav class="bread-crumb-dropdown">
        <b-nav-item-dropdown
            :id="label"
            :text="label"
            dropup
            no-caret
            toggle-class="bread-crumb-item-dropdown"
        >
            <template v-slot:button-content>
                <span class="bread-crumb-select">
                    <h1>
                        {{label}}
                    </h1>
                    <svg
                        aria-hidden="true"
                        class="chevron mr-2 svg-inline--fa fa-caret-right fa-w-6"
                        data-icon="caret-right"
                        data-prefix="fas"
                        data-v-041edcbe=""
                        focusable="false"
                        role="img" style="transform: rotate(90deg);
                            transition: transform 0.2s ease 0s;"
                        viewBox="0 0 192 512"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            class=""
                            d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"
                            data-v-041edcbe=""
                            fill="currentColor"
                        />
                    </svg>
                </span>
            </template>
            <template v-for="table in packageTables">
                <b-dropdown-item :key="table.id" :to="table.id">
                    {{ table.label }}
                </b-dropdown-item>
            </template>
        </b-nav-item-dropdown>
    </b-nav>
</component>
