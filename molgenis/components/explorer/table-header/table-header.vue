<component>
    <thead>
        <tr>
            <th scope="col" v-if="isShop" />
            <th v-if="!isShop" scope="col" />
            <th
                v-for="(column, index) in visibleColumns"
                :key="index" scope="col"
            >
                {{ column.name }}
            </th>
        </tr>
    </thead>
</component>
