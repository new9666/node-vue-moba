<template>
  <div class="list">
    <h1>物品列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="220px"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column label="Icon">
        <template slot-scope="scope">
          <img :src="scope.row.icon" style="height:3rem">
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/items/edit/${scope.row._id}`)"
          >编辑</el-button>
          <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },
  methods: {
    async fetch() {
      let res = await this.$http.get("/rest/items");
      this.items = res.data;
    },
    async remove(row) {
      this.$confirm("此操作将永久删除" + row.name + "?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "再想想",
        type: "warning"
      })
        .then(async () => {
          await this.$http.delete("/rest/items/" + row._id);

          this.$message({
            type: "success",
            message: "删除成功!"
          });
          // 删除成功后，重新渲染列表
          this.fetch();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created() {
    this.fetch();
  }
};
</script>