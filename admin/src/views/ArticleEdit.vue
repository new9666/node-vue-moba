<template>
  <div class="create">
    <h1>{{ id ? '编辑' : '新建' }}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor v-model="model.body" useCustomImageHandler @imageAdded="handlerImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {},
      categories: []
    };
  },
  components: {
    VueEditor
  },
  methods: {
    async handlerImageAdded(file, Editor, cursorLocation, resetUploader) {
      let formData = new FormData();
      formData.append("file", file);

      let res = await this.$http.post("upload", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
    async save() {
      if (this.id) {
        // 编辑
        await this.$http.put("/rest/articles/" + this.id, {
          title: this.model.title,
          body: this.model.body,
          categories: this.model.categories
        });
      } else {
        // 新建
        await this.$http.post("/rest/articles", {
          title: this.model.title,
          body: this.model.body,
          categories: this.model.categories
        });
      }

      this.$router.push("/articles/list");
      this.$message({
        type: "success",
        message: "新建分类成功"
      });
    },
    async fetch() {
      // console.log("fetch__________-", this.id);
      let res = await this.$http.get("/rest/articles/" + this.id);
      this.model = res.data;
    },

    async fetchCategories() {
      let res = await this.$http.get("/rest/categories");
      this.categories = res.data;
    }
  },
  created() {
    this.fetchCategories();
    this.id && this.fetch();
  }
};
</script>
