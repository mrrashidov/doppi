import { computed, ref, watch, type Ref } from "vue";
import type { TablePropsFieldsType } from "./interface";
export function useTable(props: any, emits: any) {
  const { hasOwn } = Object;

  type theadItemType = {
    key: string;
    label: string;
    sort: string;
  };
  const theadItemsMapper = props.fields.value.map(
    (field: string | TablePropsFieldsType) => {
      if (typeof field === "string") {
        field = {
          key: field,
          label: field,
          sort: props.sortable ? "asc" : undefined,
        };
      }
      if (typeof field === "object") {
        field = {
          key: hasOwn(field, "key")
            ? field.key
            : hasOwn(field, "label")
            ? field.label
            : field.toString(),
          label: hasOwn(field, "label")
            ? field.label
            : hasOwn(field, "key")
            ? field.key
            : field.toString(),
          sort: props.sortable
            ? hasOwn(field, "sort")
              ? field.sort
              : "asc"
            : undefined,
        };
      }
      return field;
    }
  );
  const theadItems = ref<theadItemType[]>(theadItemsMapper);
  const loadMore: Ref<boolean> = ref(true);
  const openModal: Ref<boolean> = ref(false);
  const selectedItem = ref<any[]>([]);

  const onClickSort = (index: number, field: theadItemType) => {
    const sortItem = (theadItems.value[index]["sort"] =
      field.sort === "asc" ? "desc" : "asc");
    emits("sort", { [field.key]: sortItem });
    return sortItem;
  };
  const handleClickItem = (data: any) => {
    emits("actions", {
      action: "show",
      data,
    });
  };

  const indeterminate = computed(
    () =>
      selectedItem.value.length > 0 &&
      selectedItem.value.length < props.items.value.length
  );

  const checkboxChange = ({ target }: any) =>
    (selectedItem.value = target.checked
      ? props.items.value.map((p: never) => p[props.tableKey.value])
      : []);

  watch(selectedItem, (newValue) => emits("selected", newValue));

  const handleLoadMore = () => {
    loadMore.value = !loadMore.value;
    emits("actions", { action: "load-more", data: true });
  };
  const itemObject: Ref<object> = ref({});
  const handleModal = (action: string) => {
    openModal.value = !openModal.value;
    if (action === "confirm") {
      emits("actions", { action: "delete", data: itemObject.value });
    }
  };
  const handleActions = ({
    action,
    data,
  }: {
    action: string;
    data: object;
  }) => {
    if (action === "delete") {
      itemObject.value = data;
      openModal.value = true;
    } else {
      emits("actions", { action, data });
    }
  };

  return {
    openModal,
    loadMore,
    selectedItem,
    indeterminate,
    theadItems,
    onClickSort,
    handleClickItem,
    checkboxChange,
    handleLoadMore,
    handleModal,
    handleActions,
  };
}
