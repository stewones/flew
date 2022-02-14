<template>
  <footer
    class="h-16 relative w-full border-t dark:border-gray-800 bg-white dark:bg-gray-900 z-20"
  >
    <div
      class="h-full w-full container mx-auto px-4 lg:px-8 flex items-center justify-between"
    >
      <div class="flex flex-col items-start">
        <small>
          © {{ currentYear }}
          <a
            class="w-8 opacity-100 hover:opacity-75 underline"
            href="https://intenseloop.com"
            target="_blank"
            title="Powered by Intenseloop"
            >Intenseloop</a
          >. Built by
          <a
            v-if="settings.twitter"
            :href="`https://twitter.com/${settings.twitter}`"
            target="_blank"
            rel="noopener noreferrer"
            title="Twitter"
            name="Twitter"
            class="text-gray-700 underline dark:text-gray-300 hover:text-primary-500 dark-hover:text-primary-500"
            >stewones</a
          >.
        </small>
        <small>
          Code licensed under MIT License. Documentation licensed under CC BY
          4.0.
        </small>
      </div>
      <div class="flex items-center space-x-4">
        <AppLangSwitcher />
        <AppColorSwitcher />
        <!-- <a
          style="width: 30px"
          href="https://intenseloop.com"
          target="_blank"
          title="Powered by Intenseloop"
        >
          <img
            class="light-img"
            alt="Powered by Intenseloop"
            src="/intense-icon-dark.svg"
          />
          <img
            class="dark-img"
            alt="Powered by Intenseloop"
            src="/intense-icon-light.svg"
          />
        </a> -->
      </div>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
  computed: {
    ...mapGetters(['settings']),
    availableLocales() {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale);
    },
  },
};
</script>
