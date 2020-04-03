<template>
  <div>
    <div id="container"></div>
  </div>
</template>

<script>
// import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader'
// x轴正方向向右，y轴正方向向上，z轴由屏幕从里向外
// import dat from 'dat.gui' // 使用dat.GUI库实现图形控制界面
// import { OBJLoader, MTLLoader } from 'three-obj-mtl-loader-wpk'
// import OrbitControls from 'three-orbitcontrols'
import { OBJLoader, MTLLoader } from 'three-obj-mtl-loader'
export default {
  name: 'LoadModel',
  data () {
    return {
      publicPath: process.env.BASE_URL,
      scene: null,  // 场景
      camera: null, // 相机
      renderer: null, // 渲染器
      cube: null,  // 立方体
      geometry: {}, // 声明一个几何体
      material: {}, // 材质
      controls: {}, // 鼠标控制
      light: {}, // 灯光
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
      const that = this

      // that.camera = new that.THREE.PerspectiveCamera(45, that.clientWidth / that.clientHeight, 1, 1000)
      // that.camera.position.set(10, 90, 65)
      // that.camera.lookAt(that.scene.position)

      that.camera = new that.THREE.PerspectiveCamera(45, that.clientWidth / that.clientHeight, 1, 10000);
      that.camera.position.x = 600;
      that.camera.position.y = 0;
      that.camera.position.z = 600;
      that.camera.up.x = 0;
      that.camera.up.y = 0;
      that.camera.up.z = 1;

      that.camera.lookAt(new that.THREE.Vector3(0, 0, 0))
    },
    // 初始化控制器
    initControls () {
      const that = this
      that.controls = new that.TrackballControls(that.camera);     //创建场景旋转缩放事件
      that.controls.rotateSpeed = 2.5;
      that.controls.zoomSpeed = 1.2;
      that.controls.panSpeed = 0.8;
      that.controls.noZoom = false;
      that.controls.noPan = false;
      that.controls.staticMoving = true;
      that.controls.dynamicDampingFactor = 0.3;
    },
    // 初始化渲染器
    initRenderer () {
      const that = this
      // that.clientWidth = document.getElementById('canvas-frame').clientWidth;
      // that.clientHeight = document.getElementById('canvas-frame').clientHeight;
      that.renderer = new that.THREE.WebGLRenderer({
        antialias: true // 属性开启用于抗锯齿
      })
      that.renderer.setClearColor(0x000000, 1.0)
      that.renderer.setPixelRatio(window.devicePixelRatio) //为了兼容高清屏幕
      that.renderer.setSize(that.clientWidth, that.clientHeight)

      const container = document.getElementById('container')
      container.appendChild(that.renderer.domElement)
      // document.getElementById('canvas-frame').appendChild(that.renderer.domElement);

      window.addEventListener('resize', that.onWindowResize, false) //添加窗口监听事件（resize-onresize即窗口或框架被重新调整大小）
    },
    //窗口监听函数
    onWindowResize () {
      const that = this
      that.camera.aspect = that.clientWidth / that.clientHeight
      that.camera.updateProjectionMatrix()
      that.renderer.setSize(that.clientWidth, that.clientHeight)
    },
    // 初始化灯光
    initLight () {
      const that = this
      that.scene.add(new that.THREE.AmbientLight(0x999999));//环境光
      that.light = new that.THREE.DirectionalLight(0xdfebff, 0.45);//从正上方（不是位置）照射过来的平行光，0.45的强度
      that.light.position.set(50, 200, 100);
      that.light.position.multiplyScalar(0.3);
      that.scene.add(that.light)
    },
    // 立方体
    initObject () {
      // const that = this

    },
    // 加载外部3D模型
    // load3DModel () {
    //   const that = this
    //   new that.MTLLoader().load(`${that.publicPath}obj/building.mtl`, function (materials) {
    //     console.log(materials, 'materials')
    //     materials.preload();
    //     new that.OBJLoader().setMaterials(materials).load(`${that.publicPath}obj/building.obj`, function (object) {
    //       that.scene.add(object);
    //       console.log(object, 'object')
    //       // animate();
    //     });

    //   });
    // },
    //外部模型加载函数
    loadObj () {
      const that = this
      //包含材质
      new MTLLoader().setPath(`${that.publicPath}obj/`).load('building1.mtl', materials => {
        console.log("materials", materials);
        materials.preload();
        new OBJLoader().setMaterials(materials).setPath(`${that.publicPath}obj/`).load('building1.obj', obj => {
          obj.scale.set(5, 5, 5);
          obj.position.set(0, 0, 0);
          that.scene.add(obj);
        });
      });

      new MTLLoader().setPath(`${that.publicPath}obj/`).load('sh.mtl', materials => {
        console.log("materials", materials);
        materials.preload();
        new OBJLoader().setMaterials(materials).setPath(`${that.publicPath}obj/`).load('sh.obj', obj => {
          obj.scale.set(50, 50, 50);
          obj.position.set(50, 0, 0);
          that.scene.add(obj);
        });
      });
    },
    // 动画
    animation () {
      //renderer.clear();
      const that = this
      // that.camera.position.x = that.camera.position.x + 1; // 移动相机
      // that.mesh.position.x -= 1; // 移动物体
      // that.renderer.clear();

      // that.controls = new that.OrbitControls(that.camera) //加载控制器

      that.renderer.render(that.scene, that.camera)
      // that.controls.update()
      // that.stats.update()
      requestAnimationFrame(that.animation)

      // that.TWEEN.update();

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
    // 初始化tween
    initTween () {
      const that = this
      new that.TWEEN.Tween(that.mesh.position)
        .to({ x: 300 }, 3000).repeat(Infinity).start();
    },
    threeStart () {
      const that = this

      that.initCamera() // 初始化相机
      that.initRenderer()  // 初始化渲染器
      that.initScene()  // 初始化场景
      that.initLight()  // 创建光源
      that.initControls() // 初始化控制器

      that.loadObj() // 加载外部3D模型obj

      // that.initObject() // 加载立方体

      // that.initTween() // 初始化tween动画
      // that.initStats() // 创建资源监控

      that.animation() // 创建动画
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