<script lang="ts" setup>
import { type PropType, toRefs } from "vue";
const props = defineProps({
  icon: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  loading: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  rounded: {
    type: String as PropType<string>,
    default: "lg",
    validator: (value: string) => ["sm", "md", "lg", "full"].includes(value),
  },
  size: {
    type: String as PropType<string>,
    default: "md",
    validator: (val: string) => ["sm", "md", "lg"].includes(val),
  },
  color: {
    type: String as PropType<string>,
    default: "primary",
    validator: (value: string) =>
      ["primary", "gray", "success", "warning", "error", ""].includes(value),
  },
  variant: {
    type: String as PropType<string>,
    default: "elevate",
    validator: (value: string) =>
      ["elevate", "outline", "text"].includes(value),
  },
});
toRefs(props);
const classGenerator = () => {
  const baseClass: string[] = [
    props.loading ? "disabled:cursor-progress" : "disabled:cursor-not-allowed",
    "disabled:opacity-70 transition-all duration-300 transform disabled:scale-100 active:scale-95 font-medium",
  ];
  const icon = props.icon;
  const sizeSm = props.size === "sm";
  const sizeMd = props.size === "md";
  const sizeLg = props.size === "lg";
  const roundedSm = props.rounded === "sm";
  const roundedMd = props.rounded === "md";
  const roundedLg = props.rounded === "lg";
  const roundedFull = props.rounded === "full";
  const variantText = props.variant === "text";
  const variantOutline = props.variant === "outline";
  const variantElevate = props.variant === "elevate";
  const variantTextClass =
    "focus:outline-none focus:ring-2 focus:ring-offset-2 hover:text-white-900";
  const variantOutlineClass = `border border-1 shadow-sm hover:shadow-md ${variantTextClass}`;
  const variantElevateClass = variantOutlineClass;
  if (sizeSm) {
    baseClass.push(
      icon
        ? "p-1"
        : "xl:py-1.5 lg:py-1.5 md:py-1.5 sm:py-1.5 py-1.5 xl:px-4 lg:px-4 md:px-2.5 sm:px-2.5 px-2 xl:text-base lg:text-base md:text-base sm:text-sm text-xs xl:min-w-[160px] lg:min-w-[150px] md:min-w-[120px] sm:min-w-[100px] min-w-[80px] leading-3"
    );
  }
  if (sizeMd) {
    baseClass.push(
      icon
        ? "p-2"
        : "xl:py-2 lg:py-1.5 md:py-1.5 sm:py-1.5 py-1.5 xl:px-8 lg:px-8 md:px-6 sm:px-5 px-5 xl:text-lg lg:text-base md:text-base sm:text-sm text-xs xl:min-w-[150px] lg:min-w-[140px] md:min-w-[120px] sm:min-w-[100px] min-w-[80px] leading-3"
    );
  }
  if (sizeLg) {
    baseClass.push(
      icon
        ? "p-4"
        : "xl:py-3 lg:py-2.5 md:py-2 sm:py-1.5 py-1 xl:px-12 md:px-12 sm:px-10 px-10 xl:text-lg lg:text-base md:text-base sm:text-sm text-xs xl:min-w-[150px] lg:min-w-[140px] md:min-w-[120px] sm:min-w-[100px] min-w-[80px] leading-3"
    );
  }
  if (roundedSm) {
    baseClass.push("xl:rounded-md lg:rounded-md md:rounded sm:rounded rounded");
  }
  if (roundedMd) {
    baseClass.push(
      "xl:rounded-lg lg:rounded-md md:rounded-sm sm:rounded rounded"
    );
  }
  if (roundedLg) {
    baseClass.push(
      "xl:rounded-xl lg:rounded-md md:rounded-md sm:rounded-md rounded-md"
    );
  }
  if (roundedFull) {
    baseClass.push("rounded-full");
  }
  if (props.color === "primary") {
    const baseColor = [
      "border-primary-900 focus:ring-primary-700 hover:bg-primary-900 hover:border-primary-600",
      variantElevate ? "bg-primary-900 text-white-900" : "text-primary-900 ",
    ];
    if (variantOutline) {
      baseClass.push(...[...baseColor, variantOutlineClass]);
    }
    if (variantText) {
      baseClass.push(
        ...[
          "text-primary-900 focus:ring-primary-700 hover:bg-primary-900 opacity-70",
          variantTextClass,
        ]
      );
    }
    if (variantElevate) {
      baseClass.push(...[...baseColor, variantElevateClass]);
    }
  }
  if (props.color === "gray") {
    const baseColor = [
      "border-gray-900 focus:ring-gray-700 hover:bg-gray-900 hover:border-gray-600",
      variantElevate ? "bg-gray-900 text-white-900" : "text-gray-900",
    ];
    if (variantOutline) {
      baseClass.push(...[...baseColor, variantOutlineClass]);
    }
    if (variantText) {
      baseClass.push(
        ...[
          "text-gray-900 focus:ring-gray-700 hover:bg-gray-900/10 opacity-70",
          variantTextClass,
        ]
      );
    }
    if (variantElevate) {
      baseClass.push(...[...baseColor, variantElevateClass]);
    }
  }
  if (props.color === "success") {
    const baseColor = [
      "border-success-900 focus:ring-success-700 hover:bg-success-900 hover:border-success-600",
      variantElevate ? "bg-success-900 text-white-900" : "text-success-900",
    ];
    if (variantOutline) {
      baseClass.push(...[...baseColor, variantOutlineClass]);
    }
    if (variantText) {
      baseClass.push(
        ...[
          "text-success-900 focus:ring-success-700 hover:bg-success-900  opacity-70",
          variantTextClass,
        ]
      );
    }
    if (variantElevate) {
      baseClass.push(...[...baseColor, variantElevateClass]);
    }
  }
  if (props.color === "warning") {
    const baseColor = [
      "border-warning-900 focus:ring-warning-700 hover:bg-warning-900 hover:border-warning-600",
      variantElevate ? "bg-warning-900 text-white-900" : "text-warning-900",
    ];
    if (variantOutline) {
      baseClass.push(...[...baseColor, variantOutlineClass]);
    }
    if (variantText) {
      baseClass.push(
        ...[
          "text-warning-900 focus:ring-warning-700 hover:bg-warning-900  opacity-70",
          variantTextClass,
        ]
      );
    }
    if (variantElevate) {
      baseClass.push(...[...baseColor, variantElevateClass]);
    }
  }
  if (props.color === "error") {
    const baseColor = [
      "border-error-900 focus:ring-error-700 hover:bg-error-900 hover:border-error-600",
      variantElevate ? "bg-error-900" : "text-error-900",
    ];
    if (variantOutline) {
      baseClass.push(...[...baseColor, variantOutlineClass]);
    }
    if (variantText) {
      baseClass.push(
        ...[
          "text-error-900 focus:ring-error-700 hover:bg-error-900  opacity-70",
          variantTextClass,
        ]
      );
    }
    if (variantElevate) {
      baseClass.push(...[...baseColor, variantElevateClass]);
    }
  }
  return baseClass;
};
</script>
<template>
  <button :class="classGenerator()">
    <svg
      v-if="loading"
      :class="[
        'animate-spin h-5 w-5 inline-block',
        variant === 'elevate' ? 'text-white-900' : '',
      ]"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    <template v-else>
      <slot />
    </template>
  </button>
</template>
