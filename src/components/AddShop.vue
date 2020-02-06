<template>
    <div>
        <el-row style="margin-top: 20px">
            <el-col :span="14" :offset="4">
                <el-form :model="categoryForm" ref="categoryForm" label-width="110px" class="form">
                    <el-row class="category_select">
                        <el-form-item label="食品种类">
                            <el-select v-model="categoryForm.categorySelect"  style="width:100%;">
                                <el-option
                                        v-for="item in categoryForm.categoryList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-row>
                    <el-row class="add_category_row" :class="showAddCategory? 'showEdit': ''">
                        <div class="add_category">
                            <el-form-item label="食品种类" prop="name">
                                <el-input v-model="categoryForm.name"></el-input>
                            </el-form-item>
                            <el-form-item label="种类描述" prop="description">
                                <el-input v-model="categoryForm.description"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" >提交</el-button>
                            </el-form-item>
                        </div>
                    </el-row>
                    <div class="add_category_button" >
                        <i class="el-icon-caret-top edit_icon" v-if="showAddCategory"></i>
                        <i class="el-icon-caret-bottom edit_icon" v-else slot="icon"></i>
                        <span>添加食品种类</span>
                    </div>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "AddShop",
        data: function(){
            return {
                categoryForm: {
                    categoryList:['222','打算打算'],
                    categorySelect: '',
                    name: '',
                    description: ''
                },
                showAddCategory: false
            }
        }
    }
</script>

<style scoped>

</style>