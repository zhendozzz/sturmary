<template>
  <div></div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class LoaderComponent extends Vue {
  private $vs: any;
  mounted(): void {
    this.$vs.loading({
      type: "material",
      text: this.$t("loading")
    });
  }
  beforeDestroy(): void {
    this.$vs.loading.close();
  }
}
</script>

<style scoped></style>
