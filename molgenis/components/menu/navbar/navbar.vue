<component>
    <div class="molgenis-navbar">
        <nav :class="{ 'navbar-expand-md': !showHamburger }" class="navbar navbar-light">
            <a
                :href="`/menu/main/${href(molgenisMenu.menu.items[0])}`" class="navbar-brand"
                v-if="molgenisMenu.navBarLogo"
            >
                <img :src="molgenisMenu.navBarLogo" alt="brand-logo" class="molgenis-navbar-logo">
            </a>
            <a v-else class="navbar-brand" href="/">Home</a>

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
                    <template v-for="(item, index) in molgenisMenu.menu.items">
                        <li
                            v-if="item.type === 'plugin' && item.id !== 'home'" :key="index"
                            :class="['nav-item', {'active': isSelectedPlugin(item.id)}]"
                        >
                            <router-link class="nav-link" :to="{name: item.id}">
                                <font-awesome-icon />{{ item.label }}
                            </router-link>
                        </li>

                        <li v-else-if="item.id !== 'home'" :key="index" class="nav-item dropdown">
                            <a
                                :id="item.id" aria-expanded="false"
                                aria-haspopup="true"
                                class="nav-link dropdown-toggle"
                                data-toggle="dropdown"
                            >
                                {{ item.label }}
                            </a>
                            <MenuDropdownItems :items="item.items" :parent="item" />
                        </li>
                    </template>
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
                            {{ molgenisMenu.helpLink.label }}
                        </a>
                    </li>

                    <li class="nav-item">
                        <form
                            id="logout-form" action="/logout"
                            class="form-inline"
                            method="post"
                        >
                            <button
                                v-if="molgenisMenu.authenticated" id="signout-button"
                                class="btn btn-outline-secondary"
                                type="button"
                                @click="logout"
                            >
                                Sign out
                            </button>

                            <a v-else class="btn btn-outline-primary" href="/login">Sign in</a>
                        </form>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</component>
