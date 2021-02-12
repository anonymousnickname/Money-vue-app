<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ 'Edit' | localize }}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option v-for="c of categories" :key="c.id" :value="c.id">{{
              c.title
            }}</option>
          </select>
          <label>{{ 'SelectCategory' | localize }}</label>
        </div>

        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{ invalid: $v.title.$dirty && !$v.title.required }"
          />
          <label for="name">{{ 'Title' | localize }}</label>
          <span
            v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid"
            >{{ 'Message_CategoryTitle' | localize }}</span
          >
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{ invalid: $v.limit.$dirty && !$v.limit.minValue }"
          />
          <label for="limit">{{ 'Limit' | localize }}</label>
          <span
            v-if="$v.limit.$dirty && !$v.limit.minValue"
            class="helper-text invalid"
            >{{ 'Message_MinLength' | localize }}
            {{ $v.limit.$params.minValue.min }}</span
          >
        </div>

        <p>
          <label>
            <input type="checkbox" v-model="agree" />
            <span>{{ 'Outcome' | localize }}</span>
          </label>
          <span> ({{ 'Forplanning' | localize }})</span>
        </p>

        <button
          class="btn waves-effect waves-light btn-black-bcgr"
          type="submit"
        >
          {{ 'Update' | localize }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators';
import localizeFilter from '@/filters/localize.filter';
export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    select: null,
    title: '',
    limit: 100,
    current: null,
    agree: null
  }),
  validations: {
    title: { required },
    limit: { minValue: minValue(100) }
  },
  watch: {
    current(catId) {
      const { title, limit, outcome } = this.categories.find(
        c => c.id === catId
      );
      this.title = title;
      this.limit = limit;
      this.agree = outcome;
    }
  },
  created() {
    const { id, title, limit, outcome } = this.categories[0];
    this.current = id;
    this.title = title;
    this.limit = limit; 
    this.agree = outcome;
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit,
          outcome: this.agree
        };
        await this.$store.dispatch('updateCategory', categoryData);
        this.$message(localizeFilter('Category_HasBeenUpdated'));
        this.$emit('updated', categoryData);
      } catch (e) {}
    }
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select);
    M.updateTextFields();
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  }
};
</script>
