<template>
  <div class="create">
    <h1>{{ id ? '编辑' : '新建' }}管理员</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="model.password"></el-input>
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
      if (this.id) {
        // 编辑
        await this.$http.put("/rest/admin_users/" + this.id, {
          username: this.model.username,
          password: this.model.password
        });
      } else {
        // 新建
        await this.$http.post("/rest/admin_users", {
          username: this.model.username,
          password: this.model.password
        });
      }

      this.$router.push("/admin_users/list");
      this.$message({
        type: "success",
        message: "新建管理员成功"
      });
    },
    async fetch() {
      // console.log("fetch__________-", this.id);
      let res = await this.$http.get("/rest/admin_users/" + this.id);
      this.model = res.data;
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>
