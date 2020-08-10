import NavigatorActionsClipboard from '../actions-clipboard/actions-clipboard.js'
import NavigatorActionsCreateEdit from '../actions-create-edit/actions-create-edit.js'
import NavigatorActionsDelete from '../actions-delete/actions-delete.js'
import NavigatorActionsTransfer from '../actions-transfer/actions-transfer.js'
import NavigatorModalPackageCreate from '../modal-package-create/modal-package-create.js'
import NavigatorModalPackageUpdate from '../modal-package-update/modal-package-update.js'
import NavigatorModalResourceDelete from '../modal-resource-delete/modal-resource-delete.js'

export default {
    components: {
        NavigatorActionsClipboard,
        NavigatorActionsCreateEdit,
        NavigatorActionsDelete,
        NavigatorActionsTransfer,
        NavigatorModalPackageCreate,
        NavigatorModalPackageUpdate,
        NavigatorModalResourceDelete,
    },
    name: 'NavigatorActions',
}