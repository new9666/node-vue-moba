<template>
  <div class="create">
    <h1>{{ id ? '编辑' : '新建' }}广告位</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="text" @click="model.items.push({})">
          <i class="el-icon-plus"></i> 添加广告
        </el-button>

        <el-row type="flex" style="flex-wrap: wrap">
          <el-col :md="24" v-for="(item, index) in model.items" :key="index">
            <el-form-item label="Url">
              <el-input v-model="item.url"></el-input>
            </el-form-item>
            <el-form-item label="图片">
              <el-upload
                class="avatar-uploader"
                :action="$http.defaults.baseURL+'/upload'"
                :show-file-list="false"
                :on-success="res=>$set(item, 'image', res.url)"
              >
                <img v-if="item.image" :src="item.image" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>

            <el-form-item>
              <el-button type="danger" @click="model.items.splice(index, 1)">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
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
      model: {
        items: []
      }
    };
  },
  methods: {
    async save() {
      if (this.id) {
        // 编辑
        await this.$http.put("/rest/ads/" + this.id, {
          title: this.model.title,
          items: this.model.items
        });
      } else {
        // 新建
        await this.$http.post("/rest/ads", {
          title: this.model.title,
          items: this.model.items
        });
      }

      this.$router.push("/ads/list");
      this.$message({
        type: "success",
        message: "新建广告位成功"
      });
    },
    async fetch() {
      // console.log("fetch__________-", this.id);
      let res = await this.$http.get("/rest/ads/" + this.id);
      this.model = res.data;
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>
