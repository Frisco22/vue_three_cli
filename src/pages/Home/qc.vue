<template>
  <div id="canvas-frame"></div>
</template>

<script>
// x轴正方向向右，y轴正方向向上，z轴由屏幕从里向外
// import dat from 'dat.gui' // 使用dat.GUI库实现图形控制界面
import { OBJLoader, MTLLoader } from 'three-obj-mtl-loader'
export default {
  name: 'QC',
  data () {
    return {
      publicPath: process.env.BASE_URL,
      scene: {},  // 场景
      camera: {}, // 相机
      renderer: {}, // 渲染器
      cube: null,  // 立方体
      geometry: {}, // 声明一个几何体
      material: {}, // 材质
      controls: {}, // 鼠标控制
      light: {}, // 灯光
      mesh: {}, //网格
      stats: {}, //性能监听组件
      clock: null,
      dom: {}
    }
  },
  components: {

  },
  created () {
    // this.threeStart()
  },
  mounted () {
    this.dom = document.getElementById('canvas-frame')
    this.threeStart()
  },
  methods: {
    render () {
      //将场景相机渲染到页面
      this.renderer.render(this.scene, this.camera)
    },
    // 初始化场景
    initScene () {
      const that = this
      that.scene = new that.THREE.Scene();
    },
    // 初始化相机
    initCamera () {
      const that = this
      that.camera = new that.THREE.PerspectiveCamera(45, that.dom.clientWidth / that.dom.clientHeight, 1, 10000);
      that.camera.position.set(0, 200, 400);    //设置相机位置
      that.camera.up.set(0, 1, 0);

      that.camera.lookAt(new that.THREE.Vector3(0, 0, 0))
    },
    // 初始化渲染器
    initRenderer () {
      const that = this
      that.renderer = new that.THREE.WebGLRenderer({
        antialias: true // 属性开启用于抗锯齿
      })
      that.renderer.setSize(that.dom.clientWidth, that.dom.clientHeight) //设置渲染器尺寸 等于模块宽高
      that.dom.appendChild(that.renderer.domElement) //将渲染器添加到页面上

      that.renderer.setClearColor(0x000000, 1.0);
      //场景中添加网格辅助
    },
    // 初始化控制器
    initControls () {
      const that = this
      that.controls = new that.TrackballControls(that.camera)
      //旋转速度
      that.controls.rotateSpeed = 5;
      //变焦速度
      that.controls.zoomSpeed = 3;
      //平移速度
      that.controls.panSpeed = 0.5;
      //是否不变焦
      that.controls.noZoom = false;
      //是否不平移
      that.controls.noPan = false;
      //是否开启移动惯性
      that.controls.staticMoving = false;
      //动态阻尼系数 就是灵敏度
      that.controls.dynamicDampingFactor = 0.3;
      //未知，占时先保留
      //controls.keys = [ 65, 83, 68 ];
      that.controls.addEventListener('change', that.render, { passive: false });
      //变化时触发渲染方法
    },
    onWindowResize () {
      const that = this
      that.camera.aspect = that.dom.clientWidth / that.dom.clientHeight;
      //更新镜头长宽比
      that.camera.updateProjectionMatrix();
      //更新摄像机投影矩阵。在任何参数被改变以后必须被调用。
      that.controls.handleResize();
      //轨迹球适应窗口的功能 文档没有查到相关 依样画葫芦
      that.render();
      //从新渲染
      that.renderer.setSize(that.dom.clientWidth, that.dom.clientWidth);
      //设置渲染器宽长
    },
    // 初始化灯光
    initLight () {
      const that = this
      //添加环境光
      let ambientLight = new that.THREE.AmbientLight(0xFFFFFF, 1.0, 0);
      that.scene.add(ambientLight);

      // 添加半球光
      let hemiLight = new that.THREE.HemisphereLight(0xffffff, 0xffffff, 0.8);
      hemiLight.color.setHSL(0.6, 1, 0.6);
      hemiLight.groundColor.setHSL(0.095, 1, 0.75);
      hemiLight.position.set(0, 50, 0);
      that.scene.add(hemiLight);

      // 添加平行光
      let dirLight = new that.THREE.DirectionalLight(0xffffff, 0.8);
      dirLight.color.setHSL(0.1, 1, 0.95);
      dirLight.position.set(-1, 1.75, 1);
      dirLight.position.multiplyScalar(30);
      that.scene.add(dirLight);
      dirLight.castShadow = true;
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

      // that.geometry = new that.THREE.CylinderGeometry(100, 150, 400)
      // that.material = new that.THREE.MeshLambertMaterial({ color: 0x19B2DE }); //0xFFFF00

      // that.mesh = new that.THREE.Mesh(that.geometry, that.material)
      // that.mesh.position = new that.THREE.Vector3(0, 0, 0)
      // that.scene.add(that.mesh)

      that.geometry = new that.THREE.CubeGeometry(200, 100, 50, 4, 4);
      that.material = new that.THREE.MeshLambertMaterial({ color: 0x19B2DE });
      that.mesh = new that.THREE.Mesh(that.geometry, that.material);
      that.mesh.position.set(0, 0, 0);
      that.mesh.scale.set(1, 1, 1);
      that.scene.add(that.mesh);

      // let geometry2 = new that.THREE.CubeGeometry(200, 100, 50, 4, 4);
      // let material2 = new that.THREE.MeshLambertMaterial({ color: 0xFFFFFF });
      // let mesh2 = new that.THREE.Mesh(geometry2, material2);
      // mesh2.position.set(-300, 0, 0);
      // that.scene.add(mesh2);

      // let geometry3 = new that.THREE.CubeGeometry(200, 100, 50, 4, 4);
      // let material3 = new that.THREE.MeshLambertMaterial({ color: 0xFFFFFF });
      // let mesh3 = new that.THREE.Mesh(geometry3, material3);
      // mesh3.position.set(0, -150, 0);
      // that.scene.add(mesh3);

      // let mesh4 = new that.THREE.Mesh(geometry3, material3);
      // mesh4.position.set(0, 150, 0);
      // that.scene.add(mesh4);

      // let mesh5 = new that.THREE.Mesh(geometry3, material3);
      // mesh5.position.set(300, 0, 0);
      // that.scene.add(mesh5);

      // let mesh6 = new that.THREE.Mesh(geometry3, material3);
      // mesh6.position.set(0, 0, -100);
      // that.scene.add(mesh6);

    },
    initModel () {
      const that = this
      let texture = new that.THREE.TextureLoader();
      texture.load(`${that.publicPath}img/vein.jpg`, function (texture) {
        let material = new that.THREE.MeshBasicMaterial({ map: texture });
        let mesh = new that.THREE.Mesh(that.geometry, material);
        that.scene.add(mesh);
      });
      // let map = new that.THREE.TextureLoader().load('./image/zbl.png') //创建加载器 实用加载器的load方法加载材质文件
      // let material = new that.THREE.MeshLambertMaterial({ map: map }) //Lambert网格材质(MeshLambertMaterial)
      // let cube = new that.THREE.Mesh(new that.THREE.BoxGeometry(100, 200, 100, 1, 1, 1), material) //创建一个网格 将 宽度x =100 y=200 z=100、分段数皆为1立方体 与 材质 添加进去；
      // that.scene.add(cube) //向场景添加长方体网格对象
    },
    //外部模型加载函数
    loadObj () {
      const that = this
      //包含材质
      new MTLLoader().setPath(`${that.publicPath}obj/`).load('sh.mtl', materials => {
        console.log("materials", materials);
        materials.preload();
        new OBJLoader().setMaterials(materials).setPath(`${that.publicPath}obj/`).load('sh.obj', obj => {
          obj.scale.set(0.2, 0.2, 0.2);
          obj.position.set(0, 0, 0);
          obj.rotation.set(-5, 0, 0);
          that.scene.add(obj);
        });
      });

      new MTLLoader().setPath(`${that.publicPath}obj/`).load('building1.mtl', materials => {
        console.log("materials", materials);
        materials.preload();
        new OBJLoader().setMaterials(materials).setPath(`${that.publicPath}obj/`).load('building1.obj', obj => {
          obj.scale.set(0.2, 0.2, 0.2);
          obj.position.set(-100, 0, 0);
          obj.rotation.set(-5, 0, 0);
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
      // that.renderer.render(that.scene, that.camera);
      that.controls.update();
      that.render()
      requestAnimationFrame(that.animation);
      // that.stats.update();
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


      that.initScene()
      that.initCamera()
      that.initRenderer()
      that.initLight() //创建光源
      // that.initModel()
      that.initObject()
      that.loadObj()
      that.initControls()
      // that.initTween()

      // that.initStats() //创建资源监控

      that.animation()

      //监听窗体变化
      window.onresize = that.onWindowResize
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
#canvas-frame {
  width: 100%;
  height: 100vh;
}
</style>