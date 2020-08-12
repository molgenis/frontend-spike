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
                            Flexible software for scientific data
                        </h1>

                        <p class="lead">
                            Process, manage, query, annotate, integrate, analyse, share
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
