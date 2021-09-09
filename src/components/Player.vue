<template>
  <div id="play">
    <Aid ref="aid" @setting="setting" />
  </div>
</template>

<script>

import { mapMutations } from "vuex";

import Vue from "vue";
import HostConfig from "@/../public/js/ac_conf"; 
import acapi from "@/../public/js/ac.min";
import Aid from "@/components/children/Aid.vue";

export default {
  name: "Player",
  mounted() {
    this.init();
    window.addEventListener('resize', this.onResize, true);
  },
  methods: {
     ...mapMutations("player", [
      "setCurrentTileLayerSelection",
    ]),
    onResize(){
     let player = document.getElementById('play');
     player.style.height = window.innerHeight + "px";
     player.style.width = window.innerWidth + "px";
    },
    init() {
      //2021.04.16 解析参数：主要针对Cloud版的int.html
      let p_isCloud = true;
      // 初始化接口
      this.initInterface(p_isCloud);
      //2021.04.20 Cloud显示信令服务端口， Explorer显示API(WebSocket)端口
      if ( this.$aircityApi && p_isCloud) {
        let ip, port;
        if (this.$aircityPlayer) {
          let host = this.$aircityPlayer.getHost();
          ip = host.split(":")[0];
          port = host.split(":")[1];
        }
      }
      //2021.03.18 恢复滚动条的位置
      let scrollY = localStorage.getItem("scrollY");
      if (document.getElementById("leftPanel"))
        document.getElementById("leftPanel").scrollTop = scrollY || 0;
    },
    // 初始化接口
    initInterface(iscloud) {
      let _onClose = (e) => {
        //如果没有指定工程文件，则加上pid参数，pid=-1让服务器随便指定一个工程文件
        //如果想访问指定的工程文件，则明确指定pid, 例如pid=3
        if (e && e.code == 4009) {
          if (location.href.indexOf("?") == -1) location.href += "?pid=-1";
          else location.href += "&pid=-1";
        }
      };
      //AirCityAPI初始化选项
      let apiOptions = {
        onReady: this.setting, //初始化完成回调
        onEvent: this.event, // 事件回调
        onLog: this.log, // 日志回调
        useColorLog: false, //仅用于SDK测试页面，二次开发请设置为false
      };
      //Cloud需要同时初始化AirCityAPI和AirCityPlayer
      if (iscloud) {
        let iid = HostConfig.iid;
        // let pid = this.getQueryVariable("pid");
        // console.log(iid, pid, "iid,pid");
        //AirCityPlayer
        let options;
        if (document.getElementById("play")) {
          //需要显示视频流
          options = {
            iid: iid, //如果想连接指定的云渲染实例，可以指定这个参数
            // pid: pid,
            domId: "play",
            apiOptions: apiOptions,
            showMarker: false,
            showStartupInfo: false,
            onclose: _onClose,
          };
        } else {
          options = {
            iid: iid, //不带视频流的连接必须指定云渲染实例
            // pid: pid,
            apiOptions: apiOptions,
          };
        }

        //2021.07.30 因为支持了端口映射，所以这个地方要处理一下内外网host的问题
        //因为HostConfig里自动生成的是内网地址，所以这个地方要根据当前访问的地址替换一下
        //另外这里假定映射的内外网端口号是一样的，如果不一样，还需要处理内网访问端口号和外网访问端口号的问题！
        let playerHost;
        if (location.protocol != "file:") {
          if (
            HostConfig.PlayerMapping &&
            location.hostname == HostConfig.PlayerMapping.split(":")[0]
          ) {
            playerHost = HostConfig.PlayerMapping; //如果从外网访问，则使用外网端口映射地址
          } else {
            playerHost = HostConfig.Player; //如果在内网访问，则使用内网地址
          }
        }
        console.log(options, "options");
        Vue.prototype.$aircityPlayer = new acapi.AirCityPlayer(playerHost, options);

        //对于Cloud应用可以不用显式的创建AirCityAPI对象，只需要在AirCityPlayer创建参数里指定apiOptions，就会自动创建。
        Vue.prototype.$aircityApi= Vue.prototype.$aircityPlayer.getAPI();
      }
      //Explorer只需要初始化AirCityAPI
      else {
        console.log(HostConfig.API, apiOptions, "HostConfig.API, apiOptions");
         Vue.prototype.$aircityApi = new acapi.AirCityAPI(HostConfig.API, apiOptions);
      }
    },
    getQueryVariable(v) {
      let query = location.search.substring(1);
      let vars = query.split("&");
      for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        if (pair[0] == v) return pair[1];
      }
      return undefined;
    },
    // 日志相关
    log(text) {
      console.log(text);
    },
    // 事件相关
    event(e) {
      if (e.eventtype == "LeftMouseButtonClick") {
        // 点击事件
        this.clickEvent(e);
      }
      this.log("OnEvent: " + e.eventtype);
    },
    clickEvent(e) {
      if (e.Type == "TileLayer") {
       // 重置清空一下当前的点击数据 
       this.$refs.aid.clean()
      // 当前选中的 titleid 和objid
       this.setCurrentTileLayerSelection({
          id: e.ID || e.Id,
          objectId: e.ObjectID,
        })

       this.$refs.aid.clickEvent(e)

      }
    },
    setting() {
      // 重置
       this.$aircityApi.reset();
      // 设置相机
       this.$aircityApi.camera.set(
        492577,
        2491851.5,
        336.494049,
        -31.447876,
        -34.000027,
        2
      );
      this.$refs.aid.init()
      //  this.$aircityApi.settings.setCampassVisible(false); // 关闭指北针
      //  this.$aircityApi.settings.setMainUIVisibility(false); // 关闭主界面UI元素
    },
  },
  destroyed() {
    this.api.destroy();
    this.player.destroy();
  },
  components: {
    Aid,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#play {
  width: 100%;
  height: 100%;
}
</style>
