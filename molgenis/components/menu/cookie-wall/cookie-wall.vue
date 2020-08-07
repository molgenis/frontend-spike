<component>
    <transition name="cookiewall">
        <div class="jumbotron cookiewall shadow rounded-0" v-if="show">
            <div class="text-center">
                <p>
                    {{hostname}} uses third-party analytical cookies to analyze the use of the site and improve usability. By clicking on the accept button, or by continuing to use this website, you consent to the placing of cookies.
                </p>
                <button class="btn btn-primary btn-lg" v-on:click="acceptCookies">
                    Accept Cookies
                </button>
            </div>
        </div>
    </transition>
</component>
