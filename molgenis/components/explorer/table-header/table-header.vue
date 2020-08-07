<component>
  <thead>
  <tr>
    <th scope="col" v-if="isShop"></th>
    <th scope="col" v-if="!isShop"></th>
    <th scope="col"
        v-for="(column, index) in visibleColumns" :key="index">
      {{ column.name }}
    </th>
  </tr>
  </thead>
</component>
