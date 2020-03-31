<template>
  <div class="model_content">
    <!-- <model-obj id="place" :src="`${publicPath}obj/sh.obj`" :mtl="`${publicPath}obj/sh.mtl`" backgroundColor="rgb(0,0,0)"
      :scale="{ x: 2, y: 2, z: 2 }" :rotation="rotation">
    </model-obj> -->
    <!-- <div class="building_content">
      <model-obj id="place" :src="`${publicPath}obj/building.obj`" :mtl="`${publicPath}obj/building.mtl`"
        backgroundColor="rgb(0,0,0)" :scale="{ x: 2, y: 2, z: 2 }" :rotation="rotation">
      </model-obj>
      <model-three id="demo" :src="`${publicPath}js/czz3.js`"></model-three>
    </div> -->
    <model-obj id="hh" :src="`${publicPath}obj/square.obj`" :mtl="`${publicPath}obj/square.mtl`"
      backgroundColor="rgb(0,0,0)" :scale="{ x: 2, y: 2, z: 2 }" :rotation="rotation">
    </model-obj>
    <!-- <model-obj class="square_model" id="square" :src="`${publicPath}obj/square.obj`"
      :mtl="`${publicPath}obj/square.mtl`" :scale="{ x: 2, y: 2, z: 2 }">
    </model-obj> -->
  </div>

</template>

<script>
import { ModelObj } from 'vue-3d-model';
export default {
  name: 'ThreeTest',
  data () {
    return {
      publicPath: process.env.BASE_URL,
      rotation: null //{ x: Math.PI / 2, y: 0, z: - Math.PI / 4 },
    }
  },
  components: {
    ModelObj,
    // ModelThree
  },
  created () {
    //  const that = this
  },
  mounted () {
  },
  methods: {

  }
}
</script>
<style scoped>
.model_content {
  position: relative;
}
.square_model {
  position: absolute;
  top: 10px;
  /* width: 50px;
  height: 50px; */
}
#place {
  height: 100vh;
}
.building_content {
  width: 300px;
  height: 300px;
  position: absolute;
  top: 10px;
}
</style>