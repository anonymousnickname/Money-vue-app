<template>
  <div>
    <div class="page-title">
      <h3>{{ 'History_Title' | localize }}</h3>
      {{ 'Outcome' | localize }}
    </div>

    <div class="history-chart">
      <h3 class="text-center"></h3>
      <canvas ref="canvas"></canvas>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!records.length">
      {{ 'NoRecords' | localize }}.
      <router-link to="/record">{{ 'AddFirst' | localize }}</router-link>
    </p>

    <section v-else>
      <HistoryTable :records="items" />

      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'Back' | localize"
        :next-text="'Forward' | localize"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
        class="pagination-own"
      />
    </section>
  </div>
</template>

<script>
import paginationMixin from '@/mixins/pagination.mixin';
import HistoryTable from '@/components/HistoryTable';
import { Pie } from 'vue-chartjs';
import localizeFilter from '@/filters/localize.filter';
export default {
  name: 'history',
  metaInfo() {
    return {
      title: this.$title('Menu_History')
    };
  },
  extends: Pie,
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: [],
    newArr: [],
    cats: []
  }),
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords');
    const categoires = await this.$store.dispatch('fetchCategories');
    this.cats = categoires;
    this.newArr = this.records.map(r => {
      return categoires.find(
        c => r.categoryId === c.id && r.type === 'outcome'
      );
    });
    const testArr = this.newArr.filter(el => el != null);
    this.setup(testArr);
    this.loading = false;
  },
  methods: {
    setup(data) {
      this.setupPagination(
        this.records.map(record => {
          return {
            ...record,
            categoryName: this.cats.find(c => c.id === record.categoryId).title,
            typeClass: record.type === 'income' ? 'green' : 'red',
            typeText:
              record.type === 'income'
                ? localizeFilter('Income')
                : localizeFilter('Outcome')
          };
        })
      );
      this.renderChart({
        labels: data.map(c => c.title),
        datasets: [
          {
            label: localizeFilter('CostsForCategories'),
            data: data.map(c => {
              return this.records.reduce((total, r) => {
                if (r.categoryId === c.id && r.type === 'outcome') {
                  total += +r.amount;
                }
                return total;
              }, 0);
            }),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: ['black', 'black', 'black', 'black', 'black', 'black'],
            borderWidth: 1
          }
        ]
      });
    }
  },
  components: {
    HistoryTable
  }
};
</script>

<style scoped>
.pagination-own {
  text-align: center;
  margin-top: 50px;
}
.text-center {
  text-align: center;
}
</style>
