<template>
  <div>
    <div class="murr-preview">

      <div class="mb">

        <img :src="src"
             ref="image"
             alt=""
             class="image-container mb">
      </div>


    </div>

          <div>
        <img :src="destination"
             alt=""
             class="image-preview">
      </div>


  </div>
</template>

<script>
  import Cropper from 'cropperjs'

  export default {
    name: "ImageCropper",
    props: {
      src: String
    },
    data: () => ({
      cropper: {},
      destination: {},
      image: {}

    }),
    mounted() {
      this.initCrop();
      console.log('r')
    },

    watch: {
      src() {
        setTimeout(this.initCrop, 0)
      }
    },

    methods: {
      initCrop() {
        this.image = this.$refs.image;
        this.cropper = new Cropper(this.image, {
          zoomable: false,
          scalable: false,
          aspectRatio: 16 / 9,
          viewMode: 2,
          crop: (
            // event
          ) => {
            const canvas = this.cropper.getCroppedCanvas();
            this.destination = canvas.toDataURL("image/png");
            // console.log(event.detail)
          }
        })
      }
    },
  }
</script>

<style>

  /*.x {*/
  /*  position: relative;*/
  /*}*/

  .murr-preview {
    position: absolute;
    /*padding-top: 50px;*/
    top: 0;
    left: 0;
    /*transform: translate(-50%, -50%);*/
    width: 100%;

    /*height: 100vh;*/
    z-index: 2;
    /*background-color: darkblue;*/

    /*opacity: 0.5;*/

    /*width: 300px;*/
    /*width: 300px;*/
  }
  .x {
    width: 300px;
  }
  .image-container {
    max-width: 300px !important;
    max-height: 300px;
    width: 300px;
    height: 100%;
  }


  .image-preview {
    width: 100%;
    max-width: 300px !important;
    border: 2px red solid;
    /*width: 300px !important;*/
    /*height: 200px !important;*/
  }
  .cropper-bg {
    background: none;
  }
</style>