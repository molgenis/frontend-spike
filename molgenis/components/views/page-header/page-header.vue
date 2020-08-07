<component>
    <div class="container-fluid mb-3">
        <div class="row">
            <div class="col-3">
                <table-select
                    :label="tableMeta.label"
                    :package-tables="selectableTabels"
                    v-if="tableMeta && tableMeta.label && packageTables"
                />
            </div>
            <div class="col-6" />
            <div class="col-3">
                <table-settings-button
                    class="float-right"
                    :settings-table-id="settingsTable"
                    :table-settings="tableSettings"
                />
            </div>
        </div>
        <div class="row">
            <div class="col-6">
                <small v-if="tableMeta && tableMeta.description" class="text-secondary">
                    <em>{{ tableMeta.description }}</em>
                </small>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <toolbar-view />
            </div>
        </div>
    </div>
</component>
