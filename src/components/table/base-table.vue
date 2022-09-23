<script setup lang="ts">
import { type PropType, toRefs } from "vue";
import type {
  TablePropActions,
  TablePropFields,
  TablePropItems,
} from "@/components/table/interface";
import { useTable } from "./useTable";
import TableActions from "./components/table-actions.vue";
import TableModal from "./components/table-modal.vue";

const props = defineProps({
  fields: {
    type: Array as PropType<TablePropFields>,
  },
  items: {
    type: Array as PropType<TablePropItems>,
    required: true,
  },
  actions: {
    type: [Object, Boolean] as PropType<TablePropActions | boolean>,
    default: false,
  },
  filter: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  pagination: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  tableKey: {
    type: String as PropType<string>,
    default: "id",
  },
  sortable: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  selectable: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  loading: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  modal: {
    type: Object as PropType<{
      title: string;
      description: string;
      button: { cancel: string; confirm: string };
    }>,
    default: {
      title: "Are you sure?",
      description: "If you delete this item, you can not undo this activity!",
      button: { confirm: "Yes", cancel: "No" },
    },
  },
});
const emits = defineEmits(["actions", "sort", "selected", "modal"]);
const {
  loadMore,
  openModal,
  selectedItem,
  indeterminate,
  theadItems,
  onClickSort,
  handleClickItem,
  handleLoadMore,
  checkboxChange,
  handleModal,
  handleActions,
} = useTable(toRefs(props), emits);
</script>
<template>
  <table-modal
    :open="openModal"
    :title="modal.title"
    :description="modal.description"
    :button="modal.button"
    @modal="handleModal"
  />
  <div v-if="items.length > 0">
    <table class="min-w-full border-separate border-spacing-0">
      <thead class="bg-gray-50">
        <tr>
          <th
            v-if="selectable"
            scope="col"
            class="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
          >
            <input
              type="checkbox"
              class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
              :checked="indeterminate || selectedItem.length === items.length"
              :indeterminate="indeterminate"
              @change="checkboxChange"
            />
          </th>
          <th
            v-for="(field, index) in theadItems"
            :key="index"
            scope="col"
            :class="[
              index === 0
                ? 'py-3.5 pl-4 pr-3 sm:pl-6 lg:pl-8'
                : 'sm:table-cell',
              index !== 1 && index !== 0 ? 'hidden px-3 py-3.5' : 'px-3 py-3.5',
              'sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter uppercase',
            ]"
          >
            <a
              v-if="sortable"
              @click="onClickSort(index, field)"
              class="inline-flex items-center justify-center cursor-pointer"
            >
              {{ field.label }}
              <svg
                v-if="field.sort === 'asc'"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-3 h-3 ml-2 text-gray-400"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 15.75l7.5-7.5 7.5 7.5"
                />
              </svg>
              <svg
                v-if="field.sort === 'desc'"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-3 h-3 ml-2 text-gray-400"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </a>
            <span v-else>{{ field.label }}</span>
          </th>
          <th
            scope="col"
            class="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 backdrop-blur backdrop-filter"
          >
            <span class="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody class="bg-white">
        <tr v-for="(item, itemIndex) in items" :key="itemIndex">
          <td
            v-if="selectable"
            class="relative border-b border-gray-200 whitespace-nowrap w-12 px-6 sm:w-16 sm:px-8 text-sm font-medium text-gray-900"
          >
            <div
              v-if="selectedItem.includes(item[tableKey])"
              class="absolute inset-y-0 left-0 w-0.5 bg-indigo-600"
            ></div>
            <input
              type="checkbox"
              class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
              :value="item[tableKey]"
              v-model="selectedItem"
            />
          </td>
          <td
            v-for="(itemField, indexField) in theadItems"
            :key="indexField"
            :class="[
              indexField === 0
                ? 'pl-4 pr-3 text-gray-900 sm:pl-6 lg:pl-8'
                : 'px-3 text-gray-500',
              indexField !== 0 && indexField !== 1
                ? 'hidden sm:table-cell'
                : '',
              actions ? 'cursor-pointer' : '',
              'border-b border-gray-200 whitespace-nowrap py-4 text-sm font-medium',
              'whitespace-nowrap py-4 pr-3 text-sm font-medium',
              selectable && selectedItem.includes(item[tableKey])
                ? 'text-indigo-600'
                : 'text-gray-900',
            ]"
            @click="handleClickItem(item)"
          >
            <slot
              :data="{ index: itemIndex, item }"
              :name="`cell(${itemField.key})`"
            >
              {{ item[itemField.key] }}
            </slot>
          </td>

          <td
            class="border-b border-gray-200 relative whitespace-nowrap text-right text-sm font-medium"
          >
            <table-actions
              @actions="handleActions"
              :item="item"
              :actions="actions"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="pagination" class="flex justify-center items-center my-4">
      <slot name="pagination">
        <button
          v-if="loadMore"
          @click="handleLoadMore"
          class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
        >
          Load More
        </button>
      </slot>
    </div>
  </div>
  <div class="flex justify-center items-center" v-else>
    <slot name="empty"> No items </slot>
  </div>
</template>
