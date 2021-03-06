const getters = {
    folderId: (state, getters, rootState) => rootState.route.params.folderId,
    folderPath: (state) => {
        let folderPath = []
        if (state.folder) {
            let folder = state.folder
            while (folder) {
                folderPath.push({id: folder.id, label: folder.label})
                folder = folder.parent
            }
            folderPath.reverse()
        }
        return folderPath
    },
    nrClipboardResources: (state) => state.clipboard ? state.clipboard.resources.length : 0,
    nrSelectedResources: (state) => state.selectedResources.length,
    query: (state, getters, rootState) => rootState.route ? rootState.route.query.q : null,
}
export default getters
