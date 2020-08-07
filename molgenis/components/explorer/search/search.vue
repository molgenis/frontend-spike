<component>
  <div class="input-group">
    <form class="form-group w-100" @submit.prevent="handleSearchAction">
      <div class="input-group">
      <input
        type="search"
        v-model="searchText"
        class="form-control"
        placeholder="Search"
        aria-label="Search data"
        aria-describedby="mg-data-explorer-search"
      />
      <div class="input-group-append">
        <button
          class="btn btn-outline-secondary"
          type="submit"
          id="mg-data-explorer-search"
        >
          <font-awesome-icon icon="search"></font-awesome-icon>
        </button>
      </div>
      </div>
    </form>
  </div>
</component>
