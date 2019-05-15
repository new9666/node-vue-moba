<template>
  <div class="create">
    <h1>{{ id ? '编辑' : '新建' }}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
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
      model: {}
    };
  },
  methods: {
    async save() {
      let res;

      if (this.id) {
        // 编辑
        res = await this.$http.put("/categories/" + this.id, {
          name: this.model.name
        });
      } else {
        // 新建
        res = await this.$http.post("/categories", {
          name: this.model.name
        });
      }

      this.$router.push("/categories/list");
      console.log(res);
      this.$message({
        type: "success",
        message: "新建分类成功"
      });
    },
    async fetch() {
      console.log("fetch__________-", this.id);
      let res = await this.$http.get("/categories/" + this.id);
      this.model = res.data;
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>
