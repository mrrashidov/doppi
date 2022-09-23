<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import ArchiveBoxIcon from "../icons/ArchiveBoxIcon.vue";
import DocumentDuplicateIcon from "../icons/DocumentDuplicateIcon.vue";
import EllipsisVerticalIcon from "../icons/EllipsisVerticalIcon.vue";
import FolderPlusIcon from "../icons/FolderPlusIcon.vue";
import HeartIcon from "../icons/HeartIcon.vue";
import PencilIcon from "../icons/PencilIcon.vue";
import ShareIcon from "../icons/ShareIcon.vue";
import TrashIcon from "../icons/TrashIcon.vue";
import type { PropType } from "vue";

const emit = defineEmits(["actions"]);
const props = defineProps({
  actions: {
    type: [Object, Boolean] as PropType<any | boolean>,
    default: false,
  },
  item: {
    type: [Object] as PropType<any>,
    default: {},
  },
});
const handleActions = (action: string) =>
  emit("actions", { action, data: props.item });
</script>
<template>
  <Menu as="div" class="relative flex justify-center" v-if="actions">
    <MenuButton
      class="px-2 rounded-full flex items-end text-gray-600 hover:text-gray-800"
    >
      <span class="sr-only">Open options</span>
      <EllipsisVerticalIcon class="h-5 w-5" aria-hidden="true" />
    </MenuButton>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="cursor-pointer origin-top-right absolute right-8 mt-8 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none z-50"
      >
        <div v-if="actions.edit || actions.duplicate" class="py-1">
          <MenuItem
            v-if="actions.edit"
            v-slot="{ active }"
            @click="handleActions('edit')"
          >
            <a
              :class="[
                active ? 'bg-gray-100 text-gray-600' : 'text-gray-500',
                'group flex items-center px-4 py-2 text-sm',
              ]"
            >
              <PencilIcon
                class="mr-3 h-5 w-5 text-gray-500 group-hover:text-indigo-600"
                aria-hidden="true"
              />
              Edit
            </a>
          </MenuItem>
          <MenuItem
            v-if="actions.duplicate"
            v-slot="{ active }"
            @click="handleActions('duplicate')"
          >
            <a
              :class="[
                active ? 'bg-gray-100 text-gray-600' : 'text-gray-500',
                'group flex items-center px-4 py-2 text-sm',
              ]"
            >
              <DocumentDuplicateIcon
                class="mr-3 h-5 w-5 text-gray-500 group-hover:text-fuchsia-600"
                aria-hidden="true"
              />
              Duplicate
            </a>
          </MenuItem>
        </div>
        <div v-if="actions.archive || actions.move" class="py-1">
          <MenuItem
            v-if="actions.archive"
            v-slot="{ active }"
            @click="handleActions('archive')"
          >
            <a
              :class="[
                active ? 'bg-gray-100 text-gray-600' : 'text-gray-500',
                'group flex items-center px-4 py-2 text-sm',
              ]"
            >
              <ArchiveBoxIcon
                class="mr-3 h-5 w-5 text-gray-500 group-hover:text-cyan-600"
                aria-hidden="true"
              />
              Archive
            </a>
          </MenuItem>
          <MenuItem
            v-if="actions.move"
            v-slot="{ active }"
            @click="handleActions('move')"
          >
            <a
              :class="[
                active ? 'bg-gray-100 text-gray-600' : 'text-gray-500',
                'group flex items-center px-4 py-2 text-sm',
              ]"
            >
              <FolderPlusIcon
                class="mr-3 h-5 w-5 text-gray-500 group-hover:text-amber-600"
                aria-hidden="true"
              />
              Move
            </a>
          </MenuItem>
        </div>
        <div v-if="actions.share || actions.favorite" class="py-1">
          <MenuItem
            v-if="actions.share"
            v-slot="{ active }"
            @click="handleActions('menu')"
          >
            <a
              :class="[
                active ? 'bg-gray-100 text-gray-600' : 'text-gray-500',
                'group flex items-center px-4 py-2 text-sm',
              ]"
            >
              <ShareIcon
                class="mr-3 h-5 w-5 text-gray-500 group-hover:text-sky-600"
                aria-hidden="true"
              />
              Share
            </a>
          </MenuItem>
          <MenuItem
            v-if="actions.favorite"
            v-slot="{ active }"
            @click="handleActions('favorites')"
          >
            <a
              :class="[
                active ? 'bg-gray-100 text-gray-600' : 'text-gray-500',
                'group flex items-center px-4 py-2 text-sm',
              ]"
            >
              <HeartIcon
                class="mr-3 h-5 w-5 text-gray-500 group-hover:text-red-600"
                aria-hidden="true"
              />
              Add to favorites
            </a>
          </MenuItem>
        </div>
        <div v-if="actions.delete" class="py-1">
          <MenuItem v-slot="{ active }" @click="handleActions('delete')">
            <a
              :class="[
                active ? 'bg-gray-100 text-gray-600' : 'text-gray-500',
                'group flex items-center px-4 py-2 text-sm',
              ]"
            >
              <TrashIcon
                class="mr-3 h-5 w-5 text-gray-500 group-hover:text-red-400"
                aria-hidden="true"
              />
              Delete
            </a>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>
