<template>
  <div>
    <div class="canvas-frame"></div>
  </div>
</template>

<script>

// import * as THREE from 'three'
import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader'
// import { OBJLoader, MTLLoader } from 'three-obj-mtl-loader-wpk'
// x轴正方向向右，y轴正方向向上，z轴由屏幕从里向外
// import TWEEN from '@tweenjs/tween.js'
// // import dat from 'dat.gui' // 使用dat.GUI库实现图形控制界面

export default {
  name: 'ThreeTest',
  data () {
    return {
      publicPath: process.env.BASE_URL,
      scene: null,  // 场景
      camera: null, // 相机
      renderer: null, // 渲染器
      cube: null,  // 立方体
      geometry: null, // 声明一个几何体
      material: null, // 材质
      controls: null, // 鼠标控制
      light: null, // 灯光
      clientWidth: 1000, // 宽度
      clientHeight: 900, // 高度
      mesh: {}, //网格
      stats: {}, //性能监听组件
      zz: null,
      clock: null
    }
  },
  components: {

  },
  created () {
    // this.threeStart()
  },
  mounted () {
    this.threeStart()
  },
  methods: {
    init () {
    },
    // 初始化场景
    initScene () {
      const that = this
      that.scene = new that.THREE.Scene();
    },
    // 初始化相机
    initCamera () {
      // camera.postion：相机所在的位置，默认为（0，0，0）
      // camera.lookAt：相机焦点方向，默认为Z轴负半轴方向
      // camera.up：坐标轴向上方向，默认（0，1，0）。PS：要设置在camera.lookAt前才有效
      const that = this
      //创建一个透视相机，设置相机视角45度，最远能看1000，最近能看1
      that.camera = new that.THREE.PerspectiveCamera(45, that.clientWidth / that.clientHeight, 1, 10000);
      that.camera.position.x = 0;
      that.camera.position.y = 1000;
      that.camera.position.z = 0;
      that.camera.up.x = 0;
      that.camera.up.y = 0;
      that.camera.up.z = 1;

      that.camera.lookAt(new that.THREE.Vector3(0, 0, 0))
    },
    // 初始化渲染器
    initThree () {
      const that = this
      // that.clientWidth = document.getElementById('canvas-frame').clientWidth;
      // that.clientHeight = document.getElementById('canvas-frame').clientHeight;
      that.renderer = new that.THREE.WebGLRenderer({
        antialias: true // 属性开启用于抗锯齿
      });
      that.renderer.setSize(that.clientWidth, that.clientHeight);
      document.body.appendChild(that.renderer.domElement);
      // document.getElementById('canvas-frame').appendChild(that.renderer.domElement);
      that.renderer.setClearColor(0x666666, 1.0);
    },
    // 初始化灯光
    initLight () {
      const that = this
      that.light = new that.THREE.DirectionalLight(0xFF0000, 1.0, 0);
      that.light.position.set(100, 100, 200);
      that.scene.add(that.light);
    },
    // 立方体
    initObject () {
      const that = this
      // that.geometry = new THREE.Geometry();
      // that.geometry.vertices.push(new THREE.Vector3(- 500, 0, 0));
      // that.geometry.vertices.push(new THREE.Vector3(500, 0, 0));

      // for (var i = 0; i <= 20; i++) {

      //   var line = new THREE.Line(that.geometry, new THREE.LineBasicMaterial({ color: 0x000000, opacity: 0.2 }));
      //   line.position.z = (i * 50) - 500;
      //   that.scene.add(line);
      //   var line1 = new THREE.Line(that.geometry, new THREE.LineBasicMaterial({ color: 0x000000, opacity: 0.2 }));
      //   line1.position.x = (i * 50) - 500;
      //   line1.rotation.y = 90 * Math.PI / 180; //  旋转90度
      //   that.scene.add(line1);

      // }
      that.geometry = new that.THREE.CylinderGeometry(100, 150, 400)
      that.material = new that.THREE.MeshLambertMaterial({ color: 0xFFFF00 })
      that.mesh = new that.THREE.Mesh(that.geometry, that.material)
      that.mesh.position = new that.THREE.Vector3(0, 0, 0)
      that.scene.add(that.mesh)
    },
    load3DModel () {
      const that = this
      new MTLLoader().load(`${that.publicPath}obj/building.mtl`, function (materials) {
        materials.preload();
        new OBJLoader().setMaterials(materials).load(`${that.publicPath}obj/building.obj`, function (object) {
          that.scene.add(object);
          // animate();
        });

      });
    },
    //外部模型加载函数
    loadObj () {
      const that = this
      //包含材质
      new that.THREE.MTLLoader().load(`${that.publicPath}obj/building.mtl`, materials => {
        materials.preload()
        new that.THREE.OBJLoader().setMaterials(materials).load(`${that.publicPath}obj/building.obj`, obj => {
          console.log("materials", obj)
          obj.scale.set(1, 1, 1)
          obj.position.set(0, 0, 0)
          that.scene.add(obj)
        })
      })
    },
    // 动画
    animation () {
      //renderer.clear();
      const that = this
      // that.camera.position.x = that.camera.position.x + 1; // 移动相机
      // that.mesh.position.x -= 1; // 移动物体

      that.renderer.render(that.scene, that.camera);
      requestAnimationFrame(that.animation);
      // that.stats.update();
      that.TWEEN.update();

    },
    // 性能监视器
    initStats () {
      const that = this
      that.stats = new that.ThreeStats.Stats();
      that.stats.setMode(1); // 0: fps, 1: ms
      // 将stats的界面对应左上角
      that.stats.domElement.style.position = 'absolute';
      that.stats.domElement.style.left = '0px';
      that.stats.domElement.style.top = '0px';
      document.body.appendChild(that.stats.domElement);
      setInterval(function () {
        that.stats.begin();
        // 你的每一帧的代码
        that.stats.end();
      }, 1000 / 60);
    },
    initTween () {
      const that = this
      new that.TWEEN.Tween(that.mesh.position)
        .to({ x: 300 }, 3000).repeat(Infinity).start();
    },
    threeStart () {
      const that = this
      that.initThree()

      that.initScene()
      that.initCamera()

      that.initLight() //创建光源
      that.initObject()
      that.initTween()
      // that.load3DModel()
      that.initStats() //创建资源监控

      that.animation()
      // that.renderer.clear()
      // that.renderer.render(that.scene, that.camera)
    }
  }
}
</script>
<style scoped>
body {
  margin: 0;
}
canvas {
  width: 100%;
  height: 100%;
  background-color: #eeeeee;
}
#canvas-frame {
  border: none;
  cursor: pointer;
  width: 100%;
  height: 600px;
  background-color: #eeeeee;
}
</style>