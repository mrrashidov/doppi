import { onMounted, reactive, ref } from "vue";

export function useUsers() {
  const items = ref([]);
  const props = reactive({
    options: {
      header: {
        title: "Test Title",
        description: "Test Description",
        buttonText: "Test Add New",
      },
    },
    actions: {
      show: true,
      edit: true,
      duplicate: true,
      archive: true,
      move: true,
      share: true,
      favorite: true,
      delete: true,
    },
    fields: ["email", "username", "name", "phone"],
    items,
  });

  const fetchItems = (_page: number, _limit: number) =>
    fetch(
      `https://jsonplaceholder.typicode.com/users?_page=${_page}&_limit=${_limit}`
    )
      .then((response) => response.json())
      .then((json) => (items.value = json));

  onMounted(() => fetchItems(1, 25));
  const handleActions = (e: Event) => console.log("handleActions", e);
  const handleSelected = (e: Event) => console.log("handleSelected", e);
  const handleSort = (e: Event) => console.log("handleSort", e);
  return {
    props,
    handleActions,
    handleSelected,
    handleSort,
  };
}
