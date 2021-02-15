<template>
  <ul class="sidenav app-sidenav" :class="{ open: value, black: isDark }">
    <router-link
      v-for="link in links"
      :key="link.url"
      tag="li"
      active-class="active"
      :to="link.url"
      :exact="link.exact"
    >
      <a
        href="#"
        class="waves-effect waves-black pointer"
        :class="{ 'black-text': !isDark }"
        >{{ link.title }}</a
      >
    </router-link>
  </ul>
</template>

<script>
import localizeFilter from '@/filters/localize.filter';
export default {
  props: ['value', 'isDark'],
  data: () => ({
    links: [
      { title: localizeFilter('Menu_Bill'), url: '/', exact: true },
      { title: localizeFilter('Menu_History'), url: '/history' },
      { title: localizeFilter('Menu_Planning'), url: '/planning' },
      { title: localizeFilter('Menu_NewRecord'), url: '/record' },
      { title: localizeFilter('Menu_Categories'), url: '/categories' }
    ]
  })
};
</script>

<style scoped>
.sidenav.black li.active {
  background-color: #fff;
}

.sidenav li > a {
  color: #fff;
}
.sidenav li.active a {
  color: #000;
}
</style>
