<component>
    <div class="molgenis-navbar">
        <nav :class="{ 'navbar-expand-md': !showHamburger }" class="navbar navbar-light">
            <router-link class="btn btn-sm btn-link ml-1" to="/">
                <img :src="molgenisMenu.navBarLogo" alt="brand-logo" class="molgenis-navbar-logo">
            </router-link>

            <button
                aria-controls="navbar-content" aria-expanded="false"
                aria-label="Toggle navigation"
                class="navbar-toggler collapsed"
                data-target="#navbar-content" data-toggle="collapse"
                type="button"
            >
                <span class="navbar-toggler-icon" />
            </button>

            <div id="navbar-content" class="collapse navbar-collapse">
                <ul ref="mgNavBarNav" class="navbar-nav mr-auto">
                    <router-link class="nav-link" :to="{name: 'navigator'}">
                        <Icon />Navigator
                    </router-link>
                    <router-link class="nav-link" :to="{name: 'explorer'}">
                        <Icon />Explorer
                    </router-link>
                </ul>

                <ul class="navbar-nav justify-content">
                    <li
                        v-if="molgenisMenu.authenticated && languages.length > 1 && selectedLanguage"
                        class="nav-item"
                    >
                        <form id="language-form" class="navbar-form">
                            <select v-model="selectedLanguage.id" class="nav-link" @change="handleLanguageSelect">
                                <option
                                    v-for="language in languages"
                                    :key="language.id"
                                    :selected="language.id === selectedLanguage.id"
                                    :value="language.id"
                                >
                                    {{ language.label }}
                                </option>
                            </select>
                        </form>
                    </li>
                </ul>

                <ul class="navbar-nav justify-content-end">
                    <li class="nav-item">
                        <a class="nav-link" :href="molgenisMenu.helpLink.href" target="_blank">
                            <Icon icon="question" />
                        </a>
                    </li>

                    <li class="nav-item dropdown">
                        <a
                            aria-haspopup="true"
                            class="nav-link dropdown-toggle" data-toggle="dropdown"
                        >
                            Account
                        </a><component>
                            <div aria-labelledby="importdata" class="dropdown-menu dropdown-menu-right">
                                <router-link class="dropdown-item" :to="{name: 'settings', params: {setting: 'sys_set_app'}}">
                                    <Icon />Settings
                                </router-link>
                                <router-link class="dropdown-item" :to="{name: 'account-logout'}">
                                    <Icon />Sign out
                                </router-link>
                            </div>
                        </component>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</component>
