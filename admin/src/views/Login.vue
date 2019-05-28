<template>
  <div class="login">
    <el-card header="登录" class="card">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="model.password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      model: {}
    };
  },
  methods: {
    async login() {
      let res = await this.$http.post("/login", {
        username: this.model.username,
        password: this.model.password
      });
      console.log(res);
      localStorage.token = res.data.token;

      this.$router.push("/");
      this.$message({
        type: "success",
        message: "登录成功"
      });
    }
  }
};
</script>

<style scoped>
.login {
}
.card {
  width: 25rem;
  height: 30rem;
  margin: 8rem auto;
}
</style>

