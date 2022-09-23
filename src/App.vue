<script setup lang="ts">
import BaseTable from "@/components/table/base-table.vue";
import TableHeader from "@/components/table/components/table-header.vue";
import { useUsers } from "@/useUsers";

const { props, handleActions, handleSort, handleSelected } = useUsers();
</script>
<template>
  <div
    class="flex items-stretch justify-center max-w-2xl flex-col m-auto px-4 sm:px-6 lg:px-8"
  >
    <table-header
      :title="props.options.header.title"
      :description="props.options.header.description"
      :buttonText="props.options.header.buttonText"
    />
    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle">
          <div class="shadow-sm ring-1 ring-black ring-opacity-5">
            <base-table
              :fields="props.fields"
              :items="props.items"
              :actions="props.actions"
              @actions="handleActions"
              @sort="handleSort"
              @selected="handleSelected"
              sortable
              selectable
              pagination
            >
              <template #cell(username)="{ data }"
                >Item {{ data.index }}</template
              >
              <template #empty> Items Not Found </template>
            </base-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
