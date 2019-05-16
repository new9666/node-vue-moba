<template>
  <div class="create">
    <h1>{{ id ? '编辑' : '新建' }}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {},
      parents: []
    };
  },
  methods: {
    async save() {
      if (this.id) {
        // 编辑
        await this.$http.put("/rest/categories/" + this.id, {
          name: this.model.name,
          parent: this.model.parent
        });
      } else {
        // 新建
        await this.$http.post("/rest/categories", {
          name: this.model.name,
          parent: this.model.parent
        });
      }

      this.$router.push("/categories/list");
      this.$message({
        type: "success",
        message: "新建分类成功"
      });
    },
    async fetch() {
      // console.log("fetch__________-", this.id);
      let res = await this.$http.get("/rest/categories/" + this.id);
      this.model = res.data;
    },

    async fetchParents() {
      let res = await this.$http.get("/rest/categories");
      this.parents = res.data;
    }
  },
  created() {
    this.fetchParents();
    this.id && this.fetch();
  }
};
</script>
