<template>
  <div class="main-slide-fade-container">
    <!--<div>-->
    <div class="hide__main-slide-fade-container">
      <a href="#"
         @click.prevent="hideCreateMurr">
        <i class="el-icon-arrow-down hide-icon__main-slide-fade-container"></i>
      </a>
    </div>

    <div class="create-murr-area">
      <div class="textarea-wrapper mb">
        <resizable-textarea>
          <label>
            <textarea class="murr-header fs" placeholder="Заголовок"></textarea>
          </label>
        </resizable-textarea>
      </div>


      <div class="editorjs-main mb">
        <div id="editorjs">
        </div>
      </div>


      <input type="file" @change="r" class="mb">


      <div v-if="imageUrl" class="mb">
        <ImageCropper :key="date" :src="imageUrl"/>
      </div>


      <el-button class="murr-button" @click="save">
        save
      </el-button>
    </div>

  </div>

</template>

<script>
  import EditorJS from '@editorjs/editorjs';
  import Header from '@editorjs/header';
  import ImageTool from '@editorjs/image';
  import axios from 'axios'
  import {axios_defaults_baseURL} from "../../devAndProdVariables";
  import ResizableTextarea from '../../components/common/ResizableTextarea.js';
  import ImageCropper from '../../components/common/ImageCropper'


  export default {
    mounted() {
      window.editor = new EditorJS({
        autofocus: true,
        tools: {
          header: Header,
          image: {
            class: ImageTool,
            config: {
              additionalRequestHeaders: {
                'Authorization': 'Bearer ' + this.$store.getters.accessToken_getters
              },
              captionPlaceholder: 'Коммент к фото',
              field: 'murr_editor_image',
              endpoints: {
                byFile: axios_defaults_baseURL + '/murr_card/save_editor_image/',
              }
            }
          }
        },
      })
    },
    data() {
      return {
        imageUrl: '',
        date: null
      };
    },

    methods: {
      hideCreateMurr() {
        this.$store.dispatch('changeShowCreateMurr_actions')
      },
      r(t) {
        this.date = Date.now();

        this.imageUrl = URL.createObjectURL(t.target.files[0]);
        // console.log(ttt)
      },

      handleAvatarSuccess(file) {
        // this.imageUrl = URL.createObjectURL(file.raw);
        console.log(file)
      },
      beforeAvatarUpload(file) {
        // const isJPG = file.type === 'image/jpeg';
        // const isLt2M = file.size / 1024 / 1024 < 2;

        // if (!isJPG) {
        //   this.$message.error('Avatar picture must be JPG format!');
        // }
        // if (!isLt2M) {
        //   this.$message.error('Avatar picture size can not exceed 2MB!');
        // }

        console.log(file)

        // return isJPG && isLt2M;
      }
      ,


      async save() {
        let x = await window.editor.save();
        const y = {
          data_for_murr: await JSON.stringify(x)
        };
        // eslint-disable-next-line no-console
        console.log(y);
        await axios.post('/murr_card/save_data_for_murr_card/', y);
        // eslint-disable-next-line no-console
        // console.log(x)
        // window.editor.save().then(saved => this.content = saved)
      },
    },

    components: {ResizableTextarea, ImageCropper},

    // async beforeCreate() {
    //
    //     const r = await axios.get('murren/tanochka/',
    //         {headers: {'Authorization': 'Bearer ' + this.$store.getters.accessToken_getters}});
    //     this.tanochkaUrl = axios.defaults.baseURL + r.data.img_url;
    //
    // },
    //


  }
</script>

<style scoped>
  .create-murr-area {
    width: 100%;
    /*background-color: #C3A1FF;*/
    max-width: 620px;
    /*justify-content: ;*/
    margin: 0 auto;
  }
  /*.main-slide-fade-container {*/
    /*background-color: red;*/
    /*text-align: center;*/
/*max-width: 620px;*/
    /*justify-content: center;*/
    /*background-color: #C3A1FF;*/
    /*position: relative;*/
    /*top: 0*/
  /*}*/


  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }


  .textarea-wrapper {
    width: 100%;

  }

  .murr-header {
    width: 100%;
    max-width: 620px;
    border: 1px solid #AD00FF;
    background-color: #004dda;
    border-radius: 5px;
    text-align: center;
    height: 58px;
    resize: none;
    padding: 5px;
    overflow: hidden;
    font-family: JetBrainsMono-Italic, sans-serif;

  }

  .editorjs-main {
    width: 100%;
    max-width: 620px;
    border: 1px solid #AD00FF;
    background-color: #004dda;
    border-radius: 5px;
    text-align: left;
    padding: 10px;
  }


  @media only screen and (min-width: 650px) {
    .editorjs-main {
      padding-left: 60px;
    }
  }

</style>
