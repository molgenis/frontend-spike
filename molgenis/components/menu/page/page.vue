<component>
    <div class="mg-page" v-if="isContextLoaded">
        <MenuCookieWall v-if="context.showCookieWall" />
        <MenuHeader :molgenis-menu="context" />
        <main class="mg-page-content main-content">
            <slot>
                <!-- placeholder for static frontpage -->
                <div class="jumbotron jumbotron-fluid">
                    <div class="container">
                        <h1 class="display-4">
                            {{ $t('we accelerate scientific discovery') }}
                        </h1>

                        <p class="lead">
                            {{ $t('Molgenis is a driven group of developers and data scientists on a mission to deliver great infrastructure for life sciences.') }}
                            {{ $t('We help research teams to make their data FAIR and future proof and improve the quality and speed of their research.') }}
                        </p>
                        <a
                            class="btn btn-primary btn-lg" href="https://molgenis.gitbooks.io/molgenis/content/"
                            role="button"
                            target="_blank'"
                        >Learn more</a>
                    </div>
                </div>
            </slot>
        </main>
        <MenuFooter :molgenis-footer="context" />
    </div>
</component>
