<template>
  <div>
    <!--    <p>test</p>-->

    <div id="editorjs" class="x">

    </div>
  </div>
</template>

<script>

    import axios from 'axios'
    import EditorJS from '@editorjs/editorjs';
    import Header from '@editorjs/header';
    import ImageTool from '@editorjs/image';

    export default {

        async beforeCreate() {
            const murr_id = this.$route.query.murr_id;

            const r = await axios.get('/murr_card/save_data_for_murr_card/', {params: {murr_id: murr_id}});


            let x = r.data.data_for_murr;
            let a = JSON.parse(x);

            // eslint-disable-next-line no-console
            // console.log(this.dataForMurr)

            // eslint-disable-next-line no-console
            console.log(typeof a);

            // let x = await JSON.parse(JSON.stringify(this.dataForMurr));

            window.editor = await new EditorJS({

                // autofocus: true,

                tools: {

                    header: Header,
                    image: {
                        class: ImageTool,
                    }
                },
                data: a
            })


        },
        // async mounted() {
        //
        //
        // },

        data: () => ({

            dataForMurr: '',
        }),
    }
</script>

<style scoped>
  .x {
    pointer-events: none;
  }

</style>