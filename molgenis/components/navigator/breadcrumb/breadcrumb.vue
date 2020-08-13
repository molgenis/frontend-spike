<component>
    <div class="row">
        <div class="col">
            <ol
                class="breadcrumb"
                v-if="!query"
            >
                <li class="breadcrumb-item">
                    <router-link :to="{name: 'navigator-root'}">
                        <Icon icon="home" />
                    </router-link>
                </li>
                <li
                    v-for="(folder, index) in folderPath"
                    :key="folder.id"
                    class="breadcrumb-item"
                >
                    <a v-if="index == folderPath.length - 1">{{ folder.label }}</a>
                    <router-link
                        v-else
                        :to="{name: 'navigator-folder', params: {'folderId': folder.id}}"
                    >
                        {{ folder.label }}
                    </router-link>
                </li>
            </ol>
            <ol
                v-else
                class="breadcrumb"
            >
                <li class="breadcrumb-item">
                    <router-link :to="{name: 'navigator-root'}">
                        <Icon icon="home" />
                    </router-link>
                </li>
                <li
                    v-show="query"
                    class="breadcrumb-item"
                >
                    <span>{{ 'search-query-label' | i18n }}: <strong>{{ query }}</strong></span>
                </li>
            </ol>
        </div>
    </div>
</component>
