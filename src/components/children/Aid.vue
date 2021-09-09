<template>
  <div id="aid" :class="active ? 'active' : ''">
    <div id="slider" @click="active = !active">展开</div>
    <div class="content">
      <h1>AirCity Web Demo 1.0</h1>
      <br />

      <el-row>
        <el-col :span="2">&nbsp;</el-col>
        <el-col :span="22">
          <el-button type="primary" size="mini" @click="clean">清空</el-button>
          <el-button type="primary" size="mini" @click="reset">重置</el-button>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="2">相机：</el-col>
        <el-col :span="22">
          <el-button type="primary" size="mini" @click="getCamera()"
            >获取相机参数</el-button
          >
          <el-button type="primary" size="mini" @click="setCamera()"
            >设置相机参数</el-button
          >
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="2">相机漫游：</el-col>
        <el-col :span="22">
          <el-button type="primary" size="mini" @click="cameraTour(0)"
            >添加</el-button
          >
          <el-button type="primary" size="mini" @click="cameraTour(1)"
            >修改</el-button
          >
          <el-button type="primary" size="mini" @click="cameraTour(2)"
            >播放</el-button
          >
          <el-button type="primary" size="mini" @click="cameraTour(3)"
            >暂停</el-button
          >
          <el-button type="primary" size="mini" @click="cameraTour(4)"
            >继续</el-button
          >
          <el-button type="primary" size="mini" @click="cameraTour(5)"
            >停止</el-button
          >
          <el-button type="primary" size="mini" @click="cameraTour(6)"
            >删除</el-button
          >
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="2">坐标：</el-col>
        <el-col :span="22">
          <el-button type="primary" size="mini" @click="coord(0)"
            >屏幕转世界</el-button
          >
          <el-button type="primary" size="mini" @click="coord(1)"
            >世界转屏幕</el-button
          >
          <el-button type="primary" size="mini" @click="coord(2)"
            >投影转地理</el-button
          >
          <el-button type="primary" size="mini" @click="coord(3)"
            >地理转投影</el-button
          >
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="2">UI：</el-col>
        <el-col :span="22">
          <el-button type="primary" size="mini" @click="ui(0)"
            >显示隐藏指北针</el-button
          >
          <el-button type="primary" size="mini" @click="ui(1)"
            >显示隐藏UI</el-button
          >
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="2">图层树：</el-col>
        <el-col :span="22">
          <el-button type="primary" size="mini" @click="infoTree(0)"
            >隐藏指定图层</el-button
          >
          <el-button type="primary" size="mini" @click="infoTree(1)"
            >显示指定图层</el-button
          >
          <el-button type="primary" size="mini" @click="infoTree(2)"
            >获取图层树</el-button
          >
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="2">鼠标点击：</el-col>
        <el-col :span="22">
          <el-button type="primary" size="mini" @click="clickHighlightType = 1"
            >高亮</el-button
          >
          <el-button type="primary" size="mini" @click="clickHighlightType = 2"
            >X光</el-button
          >
          <el-button type="primary" size="mini" @click="clickHighlightType = 3"
            >隐藏</el-button
          >

          <!-- <el-button type="primary" size="mini" @click="clickHighlightType = 4"
          >样式X光</el-button
        >
        <el-button type="primary" size="mini" @click="clickHighlightType = 5"
          >样式纯色</el-button
        > -->
          <el-button type="primary" size="mini" @click="clickHighlightType = 6"
            >样式水晶体</el-button
          >

          <el-button type="primary" size="mini" @click="focusTileLayer"
            >聚焦选中图层</el-button
          >
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="2">测量：</el-col>
        <el-col :span="22">
          <el-button type="primary" size="mini" @click="startMeasurement(1)"
            >坐标点</el-button
          >
          <el-button type="primary" size="mini" @click="startMeasurement(2)"
            >直线测量</el-button
          >
          <el-button type="primary" size="mini" @click="startMeasurement(3)"
            >水平测量</el-button
          >
          <el-button type="primary" size="mini" @click="startMeasurement(4)"
            >垂直测量</el-button
          >
          <el-button type="primary" size="mini" @click="startMeasurement(5)"
            >多点</el-button
          >
          <el-button type="primary" size="mini" @click="startMeasurement(6)"
            >体积</el-button
          >
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="2">绘制：</el-col>
        <el-col :span="22">
          <el-button type="primary" size="mini" @click="startEditHelper(0)"
            >线</el-button
          >
          <el-button type="primary" size="mini" @click="startEditHelper(1)"
            >面</el-button
          >
          <el-button type="primary" size="mini" @click="stopEditHelper()"
            >结束</el-button
          >
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="2">天气：</el-col>
        <el-col :span="22">
          <el-button type="primary" size="mini" @click="weather(0)"
            >雨</el-button
          >
          <el-button type="primary" size="mini" @click="weather(1)"
            >雪</el-button
          >
          <el-button type="primary" size="mini" @click="weather(2)"
            >多云/少云</el-button
          >
          <el-button type="primary" size="mini" @click="weather(3)"
            >雾效开关</el-button
          >
          <el-button type="primary" size="mini" @click="weather(4)"
            >暗黑模式开关</el-button
          >
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="2">剖切：</el-col>
        <el-col :span="22">
          <el-button type="primary" size="mini" @click="startClip(0)"
            >面剖切</el-button
          >
          <el-button type="primary" size="mini" @click="startClip(1)"
            >体剖切</el-button
          >
          <el-button type="primary" size="mini" @click="startClip(2)"
            >多边形剖切(挖洞)</el-button
          >

          <el-button type="primary" size="mini" @click="stopClip(0)"
            >停止面剖切</el-button
          >
          <el-button type="primary" size="mini" @click="stopClip(1)"
            >停止体剖切</el-button
          >
          <el-button type="primary" size="mini" @click="stopClip(2)"
            >停止多边形剖切</el-button
          >
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="2">分析：</el-col>
        <el-col :span="22">
          <el-button type="primary" size="mini" @click="startAnalysis(0)"
            >天际线分析</el-button
          >
          <el-button type="primary" size="mini" @click="startAnalysis(1)"
            >视域分析</el-button
          >
          <el-button type="primary" size="mini" @click="startAnalysis(2)"
            >水淹分析</el-button
          >

          <el-button type="primary" size="mini" @click="stopAnalysis(0)"
            >停止天际线分析</el-button
          >
          <el-button type="primary" size="mini" @click="stopAnalysis(1)"
            >停止视域分析</el-button
          >
          <el-button type="primary" size="mini" @click="stopAnalysis(2)"
            >停止水淹分析</el-button
          >
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="2">Tag</el-col>
        <el-col :span="22">
          <el-button type="primary" size="mini" @click="tag(0)">添加</el-button>
          <el-button type="primary" size="mini" @click="tag(1)">修改</el-button>
          <el-button type="primary" size="mini" @click="tag(2)">删除</el-button>
          <el-button type="primary" size="mini" @click="tag(3)">清空</el-button>
          <el-button type="primary" size="mini" @click="tag(4)"
            >聚焦单个</el-button
          >
          <el-button type="primary" size="mini" @click="tag(5)"
            >聚焦所有</el-button
          >
          <el-button type="primary" size="mini" @click="tag(6)"
            >显示单个</el-button
          >
          <el-button type="primary" size="mini" @click="tag(7)"
            >显示所有</el-button
          >
          <el-button type="primary" size="mini" @click="tag(8)"
            >隐藏单个</el-button
          >
          <el-button type="primary" size="mini" @click="tag(9)"
            >隐藏所有</el-button
          >
          <el-button type="primary" size="mini" @click="tag(10)"
            >获取标签</el-button
          >

          <el-button type="primary" size="mini" @click="tag(11)"
            >显示单个窗口</el-button
          >
          <el-button type="primary" size="mini" @click="tag(12)"
            >隐藏单个窗口</el-button
          >
          <el-button type="primary" size="mini" @click="tag(13)"
            >显示所有窗口</el-button
          >
          <el-button type="primary" size="mini" @click="tag(14)"
            >隐藏所有窗口</el-button
          >
          <el-button type="primary" size="mini" @click="tag(15)"
            >canvas</el-button
          >

          <el-button type="primary" size="mini" @click="tag(16)"
            >修改坐标</el-button
          >
          <el-button type="primary" size="mini" @click="tag(17)"
            >修改图片</el-button
          >
          <el-button type="primary" size="mini" @click="tag(18)"
            >修改图片大小</el-button
          >
          <el-button type="primary" size="mini" @click="tag(19)"
            >修改属性</el-button
          >
          <el-button type="primary" size="mini" @click="tag(20)"
            >修改文本</el-button
          >
          <el-button type="primary" size="mini" @click="tag(21)"
            >修改可见距离</el-button
          >
          <el-button type="primary" size="mini" @click="tag(22)"
            >修改文本颜色</el-button
          >
          <el-button type="primary" size="mini" @click="tag(23)"
            >修改文本背景</el-button
          >
          <el-button type="primary" size="mini" @click="tag(24)"
            >修改文本边框颜色</el-button
          >

          <el-button type="primary" size="mini" @click="tag(25)"
            >隐藏辅助线</el-button
          >
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="2">Marker</el-col>
        <el-col :span="22">
          <el-button type="primary" size="mini" @click="marker(0)"
            >添加</el-button
          >
          <el-button type="primary" size="mini" @click="marker(1)"
            >修改</el-button
          >
          <el-button type="primary" size="mini" @click="marker(2)"
            >删除</el-button
          >
          <el-button type="primary" size="mini" @click="marker(3)"
            >清空</el-button
          >
          <el-button type="primary" size="mini" @click="marker(4)"
            >聚焦单个</el-button
          >
          <el-button type="primary" size="mini" @click="marker(5)"
            >聚焦所有</el-button
          >
          <el-button type="primary" size="mini" @click="marker(6)"
            >显示单个</el-button
          >
          <el-button type="primary" size="mini" @click="marker(7)"
            >显示所有</el-button
          >
          <el-button type="primary" size="mini" @click="marker(8)"
            >隐藏单个</el-button
          >
          <el-button type="primary" size="mini" @click="marker(9)"
            >隐藏所有</el-button
          >
          <el-button type="primary" size="mini" @click="marker(10)"
            >获取标签</el-button
          >

          <el-button type="primary" size="mini" @click="marker(11)"
            >显示单个窗口</el-button
          >
          <el-button type="primary" size="mini" @click="marker(12)"
            >隐藏单个窗口</el-button
          >
          <el-button type="primary" size="mini" @click="marker(13)"
            >显示所有窗口</el-button
          >
          <el-button type="primary" size="mini" @click="marker(14)"
            >隐藏所有窗口</el-button
          >
          <el-button type="primary" size="mini" @click="marker(15)"
            >canvas</el-button
          >

          <el-button type="primary" size="mini" @click="marker(16)"
            >修改坐标</el-button
          >
          <el-button type="primary" size="mini" @click="marker(17)"
            >修改图片</el-button
          >
          <el-button type="primary" size="mini" @click="marker(18)"
            >修改图片大小</el-button
          >
          <el-button type="primary" size="mini" @click="marker(19)"
            >修改属性</el-button
          >
          <el-button type="primary" size="mini" @click="marker(20)"
            >修改文本</el-button
          >
          <el-button type="primary" size="mini" @click="marker(21)"
            >修改可见距离</el-button
          >
          <el-button type="primary" size="mini" @click="marker(22)"
            >修改文本颜色</el-button
          >
          <el-button type="primary" size="mini" @click="marker(23)"
            >修改文本背景</el-button
          >
          <el-button type="primary" size="mini" @click="marker(24)"
            >修改文本边框颜色</el-button
          >
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="2">CustomTag</el-col>
        <el-col :span="22">
          <el-button type="primary" size="mini" @click="customTag(0)"
            >添加</el-button
          >
          <el-button type="primary" size="mini" @click="customTag(1)"
            >修改</el-button
          >
          <el-button type="primary" size="mini" @click="customTag(2)"
            >删除</el-button
          >
          <el-button type="primary" size="mini" @click="customTag(3)"
            >清空</el-button
          >
          <el-button type="primary" size="mini" @click="customTag(4)"
            >聚焦单个</el-button
          >
          <el-button type="primary" size="mini" @click="customTag(6)"
            >显示单个</el-button
          >
          <el-button type="primary" size="mini" @click="customTag(7)"
            >显示所有</el-button
          >
          <el-button type="primary" size="mini" @click="customTag(8)"
            >隐藏单个</el-button
          >
          <el-button type="primary" size="mini" @click="customTag(9)"
            >隐藏所有</el-button
          >
          <el-button type="primary" size="mini" @click="customTag(10)"
            >获取标签</el-button
          >
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="2">Polyline</el-col>
        <el-col :span="22">
          <el-button type="primary" size="mini" @click="polyline(0)"
            >添加</el-button
          >
          <el-button type="primary" size="mini" @click="polyline(1)"
            >修改</el-button
          >
          <el-button type="primary" size="mini" @click="polyline(2)"
            >删除</el-button
          >
          <el-button type="primary" size="mini" @click="polyline(3)"
            >清空</el-button
          >
          <el-button type="primary" size="mini" @click="polyline(4)"
            >聚焦单个</el-button
          >
          <el-button type="primary" size="mini" @click="polyline(6)"
            >显示单个</el-button
          >
          <el-button type="primary" size="mini" @click="polyline(7)"
            >显示所有</el-button
          >
          <el-button type="primary" size="mini" @click="polyline(8)"
            >隐藏单个</el-button
          >
          <el-button type="primary" size="mini" @click="polyline(9)"
            >隐藏所有</el-button
          >
          <el-button type="primary" size="mini" @click="polyline(10)"
            >获取标签</el-button
          >
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="2">odline</el-col>
        <el-col :span="22">
          <el-button type="primary" size="mini" @click="odline(0)"
            >添加</el-button
          >
          <el-button type="primary" size="mini" @click="odline(1)"
            >修改</el-button
          >
          <el-button type="primary" size="mini" @click="odline(2)"
            >删除</el-button
          >
          <el-button type="primary" size="mini" @click="odline(3)"
            >清空</el-button
          >
          <el-button type="primary" size="mini" @click="odline(4)"
            >聚焦单个</el-button
          >
          <el-button type="primary" size="mini" @click="odline(6)"
            >显示单个</el-button
          >
          <el-button type="primary" size="mini" @click="odline(7)"
            >显示所有</el-button
          >
          <el-button type="primary" size="mini" @click="odline(8)"
            >隐藏单个</el-button
          >
          <el-button type="primary" size="mini" @click="odline(9)"
            >隐藏所有</el-button
          >
          <el-button type="primary" size="mini" @click="odline(10)"
            >获取标签</el-button
          >
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="2">Polygon</el-col>
        <el-col :span="22">
          <el-button type="primary" size="mini" @click="polygon(0)"
            >添加</el-button
          >
          <el-button type="primary" size="mini" @click="polygon(1)"
            >修改*</el-button
          >
          <el-button type="primary" size="mini" @click="polygon(2)"
            >删除</el-button
          >
          <el-button type="primary" size="mini" @click="polygon(3)"
            >清空</el-button
          >
          <el-button type="primary" size="mini" @click="polygon(4)"
            >聚焦单个</el-button
          >
          <el-button type="primary" size="mini" @click="polygon(5)"
            >显示</el-button
          >
          <el-button type="primary" size="mini" @click="polygon(6)"
            >隐藏</el-button
          >
          <el-button type="primary" size="mini" @click="polygon(7)"
            >高亮</el-button
          >
          <el-button type="primary" size="mini" @click="polygon(8)"
            >停止高亮*</el-button
          >
          <el-button type="primary" size="mini" @click="polygon(9)"
            >获取标签</el-button
          >
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="2">Polygon3D</el-col>
        <el-col :span="22">
          <el-button type="primary" size="mini" @click="polygon3D(0)"
            >添加</el-button
          >
          <el-button type="primary" size="mini" @click="polygon3D(1)"
            >修改</el-button
          >
          <el-button type="primary" size="mini" @click="polygon3D(2)"
            >删除</el-button
          >
          <el-button type="primary" size="mini" @click="polygon3D(3)"
            >清空</el-button
          >
          <el-button type="primary" size="mini" @click="polygon3D(4)"
            >聚焦单个</el-button
          >
          <el-button type="primary" size="mini" @click="polygon3D(5)"
            >显示</el-button
          >
          <el-button type="primary" size="mini" @click="polygon3D(6)"
            >隐藏</el-button
          >
          <el-button type="primary" size="mini" @click="polygon3D(7)"
            >高亮</el-button
          >
          <el-button type="primary" size="mini" @click="polygon3D(8)"
            >停止高亮</el-button
          >
          <el-button type="primary" size="mini" @click="polygon3D(9)"
            >获取标签</el-button
          >
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="2">Beam</el-col>
        <el-col :span="22">
          <el-button type="primary" size="mini" @click="beam(0)"
            >添加</el-button
          >
          <el-button type="primary" size="mini" @click="beam(1)"
            >修改</el-button
          >
          <el-button type="primary" size="mini" @click="beam(2)"
            >删除</el-button
          >
          <el-button type="primary" size="mini" @click="beam(3)"
            >清空</el-button
          >
          <el-button type="primary" size="mini" @click="beam(4)"
            >聚焦单个</el-button
          >
          <el-button type="primary" size="mini" @click="beam(5)"
            >获取标签</el-button
          >
          <el-button type="primary" size="mini" @click="beam(6)"
            >设置厚度</el-button
          >
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="2">HighlightArea</el-col>
        <el-col :span="22">
          <el-button type="primary" size="mini" @click="highlightArea(0)"
            >添加</el-button
          >
          <el-button type="primary" size="mini" @click="highlightArea(1)"
            >修改</el-button
          >
          <el-button type="primary" size="mini" @click="highlightArea(2)"
            >删除</el-button
          >
          <el-button type="primary" size="mini" @click="highlightArea(3)"
            >清空</el-button
          >
          <el-button type="primary" size="mini" @click="highlightArea(4)"
            >聚焦单个</el-button
          >
          <el-button type="primary" size="mini" @click="highlightArea(5)"
            >显示单个</el-button
          >
          <el-button type="primary" size="mini" @click="highlightArea(6)"
            >隐藏单个</el-button
          >
          <el-button type="primary" size="mini" @click="highlightArea(7)"
            >获取标签</el-button
          >
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="2">RadiationPoint</el-col>
        <el-col :span="22">
          <el-button type="primary" size="mini" @click="radiationPoint(0)"
            >添加</el-button
          >
          <el-button type="primary" size="mini" @click="radiationPoint(1)"
            >修改</el-button
          >
          <el-button type="primary" size="mini" @click="radiationPoint(2)"
            >删除</el-button
          >
          <el-button type="primary" size="mini" @click="radiationPoint(3)"
            >清空</el-button
          >
          <el-button type="primary" size="mini" @click="radiationPoint(4)"
            >聚焦单个</el-button
          >
          <el-button type="primary" size="mini" @click="radiationPoint(5)"
            >聚焦所有</el-button
          >
          <el-button type="primary" size="mini" @click="radiationPoint(6)"
            >显示单个</el-button
          >
          <el-button type="primary" size="mini" @click="radiationPoint(7)"
            >隐藏单个</el-button
          >
          <el-button type="primary" size="mini" @click="radiationPoint(8)"
            >获取标签</el-button
          >
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="2">CustomMesh</el-col>
        <el-col :span="22">
          <el-button type="primary" size="mini" @click="customMesh(0)"
            >添加</el-button
          >
          <el-button type="primary" size="mini" @click="customMesh(1)"
            >修改</el-button
          >
          <el-button type="primary" size="mini" @click="customMesh(2)"
            >删除</el-button
          >
          <el-button type="primary" size="mini" @click="customMesh(3)"
            >清空</el-button
          >
          <el-button type="primary" size="mini" @click="customMesh(4)"
            >聚焦单个</el-button
          >
          <el-button type="primary" size="mini" @click="customMesh(5)"
            >显示单个</el-button
          >
          <el-button type="primary" size="mini" @click="customMesh(6)"
            >隐藏单个</el-button
          >
          <el-button type="primary" size="mini" @click="customMesh(7)"
            >获取标签</el-button
          >
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="2">CustomObject</el-col>
        <el-col :span="22">
          <el-button type="primary" size="mini" @click="customObject(0)"
            >添加</el-button
          >
          <el-button type="primary" size="mini" @click="customObject(1)"
            >修改</el-button
          >
          <el-button type="primary" size="mini" @click="customObject(2)"
            >删除</el-button
          >
          <el-button type="primary" size="mini" @click="customObject(3)"
            >清空</el-button
          >
          <el-button type="primary" size="mini" @click="customObject(4)"
            >聚焦单个</el-button
          >
          <el-button type="primary" size="mini" @click="customObject(5)"
            >显示单个</el-button
          >
          <el-button type="primary" size="mini" @click="customObject(6)"
            >隐藏单个</el-button
          >
          <el-button type="primary" size="mini" @click="customObject(7)"
            >高亮</el-button
          >
          <el-button type="primary" size="mini" @click="customObject(8)"
            >取消高亮</el-button
          >
          <el-button type="primary" size="mini" @click="customObject(9)"
            >获取标签</el-button
          >
          <el-button type="primary" size="mini" @click="customObject(10)"
            >TileLayer添加</el-button
          >
          <el-button type="primary" size="mini" @click="customObject(11)"
            >蓝图回调</el-button
          >
          <el-button type="primary" size="mini" @click="customObject(12)"
            >设置位置</el-button
          >
          <el-button type="primary" size="mini" @click="customObject(13)"
            >设置Scale</el-button
          >
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="2">VideoProjection</el-col>
        <el-col :span="22">
          <el-button type="primary" size="mini" @click="videoProjection(0)"
            >添加</el-button
          >
          <el-button type="primary" size="mini" @click="videoProjection(1)"
            >修改</el-button
          >
          <el-button type="primary" size="mini" @click="videoProjection(2)"
            >删除</el-button
          >
          <el-button type="primary" size="mini" @click="videoProjection(3)"
            >聚焦单个</el-button
          >
          <el-button type="primary" size="mini" @click="videoProjection(4)"
            >显示单个</el-button
          >
          <el-button type="primary" size="mini" @click="videoProjection(5)"
            >隐藏单个</el-button
          >
          <el-button type="primary" size="mini" @click="videoProjection(6)"
            >获取标签</el-button
          >
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="2">Panorama</el-col>
        <el-col :span="22">
          <el-button type="primary" size="mini" @click="panorama(0)"
            >添加</el-button
          >
          <el-button type="primary" size="mini" @click="panorama(1)"
            >修改</el-button
          >
          <el-button type="primary" size="mini" @click="panorama(2)"
            >删除</el-button
          >
          <el-button type="primary" size="mini" @click="panorama(3)"
            >清空</el-button
          >
          <el-button type="primary" size="mini" @click="panorama(4)"
            >聚焦单个</el-button
          >
          <el-button type="primary" size="mini" @click="panorama(5)"
            >获取标签</el-button
          >
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="2">Decal</el-col>
        <el-col :span="22">
          <el-button type="primary" size="mini" @click="decal(0)"
            >添加</el-button
          >
          <el-button type="primary" size="mini" @click="decal(1)"
            >修改</el-button
          >
          <el-button type="primary" size="mini" @click="decal(2)"
            >删除</el-button
          >
          <el-button type="primary" size="mini" @click="decal(3)"
            >清空</el-button
          >
          <el-button type="primary" size="mini" @click="decal(4)"
            >聚焦单个</el-button
          >
          <el-button type="primary" size="mini" @click="decal(5)"
            >聚焦所有</el-button
          >
          <el-button type="primary" size="mini" @click="decal(6)"
            >获取标签</el-button
          >
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="2">dynamicWater</el-col>
        <el-col :span="22">
          <el-button type="primary" size="mini" @click="dynamicWater(0)"
            >添加</el-button
          >
          <el-button type="primary" size="mini" @click="dynamicWater(1)"
            >修改</el-button
          >
          <el-button type="primary" size="mini" @click="dynamicWater(2)"
            >删除</el-button
          >
          <el-button type="primary" size="mini" @click="dynamicWater(3)"
            >清空</el-button
          >
          <el-button type="primary" size="mini" @click="dynamicWater(4)"
            >聚焦单个</el-button
          >
          <el-button type="primary" size="mini" @click="dynamicWater(5)"
            >获取标签</el-button
          >
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="2">FloodFill</el-col>
        <el-col :span="22">
          <el-button type="primary" size="mini" @click="floodFill(0)"
            >添加</el-button
          >
          <el-button type="primary" size="mini" @click="floodFill(1)"
            >修改</el-button
          >
          <el-button type="primary" size="mini" @click="floodFill(2)"
            >删除</el-button
          >
          <el-button type="primary" size="mini" @click="floodFill(3)"
            >清空</el-button
          >
          <el-button type="primary" size="mini" @click="floodFill(4)"
            >聚焦单个</el-button
          >
          <el-button type="primary" size="mini" @click="floodFill(5)"
            >显示单个</el-button
          >
          <el-button type="primary" size="mini" @click="floodFill(6)"
            >显示所有</el-button
          >
          <el-button type="primary" size="mini" @click="floodFill(7)"
            >隐藏单个</el-button
          >
          <el-button type="primary" size="mini" @click="floodFill(8)"
            >隐藏所有</el-button
          >
          <el-button type="primary" size="mini" @click="floodFill(9)"
            >获取标签</el-button
          >
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="2">Cesium3DTile</el-col>
        <el-col :span="22">
          <el-button type="primary" size="mini" @click="cesium3DTile(0)"
            >添加</el-button
          >
          <el-button type="primary" size="mini" @click="cesium3DTile(1)"
            >修改</el-button
          >
          <el-button type="primary" size="mini" @click="cesium3DTile(2)"
            >删除</el-button
          >
          <el-button type="primary" size="mini" @click="cesium3DTile(3)"
            >清空</el-button
          >
          <el-button type="primary" size="mini" @click="cesium3DTile(4)"
            >聚焦单个</el-button
          >
          <el-button type="primary" size="mini" @click="cesium3DTile(5)"
            >显示单个</el-button
          >
          <el-button type="primary" size="mini" @click="cesium3DTile(6)"
            >显示所有</el-button
          >
          <el-button type="primary" size="mini" @click="cesium3DTile(7)"
            >隐藏单个</el-button
          >
          <el-button type="primary" size="mini" @click="cesium3DTile(8)"
            >隐藏所有</el-button
          >
          <el-button type="primary" size="mini" @click="cesium3DTile(9)"
            >获取标签</el-button
          >
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="2">HeatMap</el-col>
        <el-col :span="22">
          <el-button type="primary" size="mini" @click="heatmap(0)"
            >添加</el-button
          >
          <el-button type="primary" size="mini" @click="heatmap(1)"
            >修改</el-button
          >
          <el-button type="primary" size="mini" @click="heatmap(2)"
            >删除</el-button
          >
          <el-button type="primary" size="mini" @click="heatmap(3)"
            >清空</el-button
          >
          <el-button type="primary" size="mini" @click="heatmap(4)"
            >聚焦单个</el-button
          >
          <el-button type="primary" size="mini" @click="heatmap(6)"
            >显示单个</el-button
          >
          <el-button type="primary" size="mini" @click="heatmap(8)"
            >隐藏单个</el-button
          >
          <el-button type="primary" size="mini" @click="heatmap(10)"
            >获取标签</el-button
          >
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import HostConfig from "@/../public/js/ac_conf";

export default {
  name: "Aid",
  data() {
    return {
      active: false,
      cameraData: null,
      campassVisible: false,
      uiVisible: false,
      frames: [],
      clickHighlightType: 1, // 1 高亮 2 x光 3 隐藏
      measurementModeType: 1, // 1 坐标点 2 直线测量 3 水平测量 4 垂直测量 5 多点 6 体积
    };
  },
  computed: {
    ...mapState({
      currentTileLayerSelection: (state) =>
        state.player.currentTileLayerSelection,
    }),
  },

  methods: {
    init() {
      this.$aircityApi.settings.setCampassVisible(this.campassVisible); // 关闭指北针
      this.$aircityApi.settings.setMainUIVisibility(this.uiVisible); // 关闭主界面UI元素
    },
    reset(){
      this.$emit('setting')
    },
    clean() {
      // 清空X光
      if (this.currentTileLayerSelection) {
        this.$aircityApi.tileLayer.disableXRay(
          this.currentTileLayerSelection.id
        );
        // 显示图层所有构建
        this.$aircityApi.tileLayer.showAllActors(
          this.currentTileLayerSelection.id
        );
      }
      this.$aircityApi.tileLayer.stopHighlightActor(); // 清空所有高亮 不传ID清空所有

      this.$aircityApi.tools.stopMeasurement(); // 停止测量

      this.$aircityApi.weather.disableRainSnow(); // 禁止雨雪效果

      // this.$aircityApi.tools.stopPolygonClip();
    },
    clickEvent(e) {
      if (e.Type == "TileLayer") {
        if (this.clickHighlightType === 1) {
          // 高亮
          this.$aircityApi.tileLayer.highlightActor(
            this.currentTileLayerSelection.id,
            this.currentTileLayerSelection.objectId
          );
        } else if (this.clickHighlightType === 2) {
          // x光
          this.$aircityApi.tileLayer.enableXRay(
            this.currentTileLayerSelection.id,
            [1, 0, 1, 0.0381]
          );
        } else if (this.clickHighlightType === 3) {
          // 隐藏
          this.$aircityApi.tileLayer.hideAllActors(
            this.currentTileLayerSelection.id
          );
        } else if (this.clickHighlightType === 4) {
          // 样式x光
          this.$aircityApi.tileLayer.setStyle(
            this.currentTileLayerSelection.id,
            1
          );
        } else if (this.clickHighlightType === 5) {
          // 纯色
          this.$aircityApi.tileLayer.setStyle(
            this.currentTileLayerSelection.id,
            2
          );
        } else if (this.clickHighlightType === 6) {
          // 水晶体
          this.$aircityApi.tileLayer.setStyle(
            this.currentTileLayerSelection.id,
            3
          );
        }
      }
    },

    getCamera() {
      this.$aircityApi.camera.get((res) => {
        alert(JSON.stringify(res));
        this.cameraData = res;
        // let str = `this.$aircityApi.camera.set(${res.x}, ${res.y}, ${res.z}, ${res.pitch}, ${res.yaw}, 0);\n`;
      });
    },
    setCamera() {
      if (this.cameraData) {
        this.$aircityApi.camera.set(
          this.cameraData.x,
          this.cameraData.y,
          this.cameraData.z,
          this.cameraData.pitch,
          this.cameraData.yaw,
          0
        );
      } else {
        alert("请先获取相机参数");
      }
    },
    focusTileLayer() {
      this.$aircityApi.tileLayer.focus(this.currentTileLayerSelection.id);
    },
    async startMeasurement(type) {
      await this.$aircityApi.tools.setMeasurement(type);
      this.$aircityApi.tools.startMeasurement();
    },
    async startEditHelper(type) {
      await this.$aircityApi.editHelper.setParam(
        0,
        type,
        type,
        [1, 0, 1, 0.0381],
        1
      );
      this.$aircityApi.editHelper.start();
    },
    stopEditHelper() {
      this.$aircityApi.editHelper.finish();
    },
    async weather(type) {
      let res = await this.$aircityApi.weather.getParams();
      switch (type) {
        case 0:
          this.$aircityApi.weather.setSnowParam(0.5, 0.5, 0.5);
          break;
        case 1:
          this.$aircityApi.weather.setRainParam(0.5, 0.2, 0.5);
          break;
        case 2:
          if (res.cloudDensity < 0.6) {
            this.$aircityApi.weather.setCloudDensity(0.8);
          } else {
            this.$aircityApi.weather.setCloudDensity(0.5);
          }
        case 3:
          if (res.fogDensity < 0.6) {
            this.$aircityApi.weather.setFogParam(1, 1, 0);
          } else {
            this.$aircityApi.weather.setFogParam(0.1, 0, 0);
          }
          break;
        case 4:
          console.log(res);
          // this.$aircityApi.weather.setDarkMode(true);
          if (res.darkMode) {
            this.$aircityApi.weather.setDarkMode(false);
          } else {
            this.$aircityApi.weather.setDarkMode(true);
          }
          break;
      }
    },
    async startClip(type) {
      if (type === 0) {
        // 面剖切
        this.$aircityApi.tools.startPlaneClip(
          [489399.15625, 2487092.5, 19.214374542236328],
          [0, 0, 0],
          false
        );
      } else if (type === 1) {
        // 体剖切
        let bbox = [488670.75, 2488165, 5.7, 491659.59375, 2490987.5, 344.58];
        this.$aircityApi.tools.startVolumeClip(bbox, 0);
      } else if (type === 2) {
        // 多边形剖切

        // 设置相机参数
        await this.$aircityApi.camera.set(
          489438.625,
          2486334.75,
          636.202454,
          -67.643913,
          -154.078171,
          0
        );

        let coords = [
          [488912.3125, 2486257.75, 16.357500076293945],
          [489164.1875, 2486585, 186.87702941894531],
          [489389.28125, 2486518.75, 44.41058349609375],
          [489260.15625, 2486184.5, 6.065742015838623],
        ];
        this.$aircityApi.tools.startPolygonClip(coords);
      }
    },
    async stopClip(type) {
      if (type === 0) {
        await this.$aircityApi.tools.stopPlaneClip();
      } else if (type === 1) {
        await this.$aircityApi.tools.stopVolumeClip();
      } else if (type === 2) {
        await this.$aircityApi.tools.stopPolygonClip();
      }
    },
    async startAnalysis(type) {
      if (type === 0) {
        this.$aircityApi.tools.startSkylineAnalysis();
      } else if (type === 1) {
        await this.$aircityApi.tools.startViewshedAnalysis();
      } else if (type === 2) {
        let options = {
          min: [495119.875, 2491031.25],
          max: [495386.625, 2491245.5],
          seed: [495304.9, 2491041],
          elevation: 3.5,
          // color: this.$aircityApi.Color.LightSeaGreen,
          precision: 0.5,
        };

        this.$aircityApi.camera.set(
          495215.15625,
          2491285.75,
          205.424454,
          -61.042461,
          88.891701,
          0
        );
        this.$aircityApi.tools.startFloodFill(options);
      }
    },
    async stopAnalysis(type) {
      if (type === 0) {
        await this.$aircityApi.tools.stopSkylineAnalysis();
      } else if (type === 1) {
        await this.$aircityApi.tools.stopViewshedAnalysis();
      } else if (type === 2) {
        await this.$aircityApi.tools.stopFloodFill();
      }
    },
    async tag(type) {
      switch (type) {
        case 0:
          let o = {
            id: "p1",
            coordinate: [495269.37, 2491073.25, 25.4],
            imagePath: HostConfig.Path + "/images/tag.png",
            url: HostConfig.Path + "/tag_popup.html",
            imageSize: [28, 28],
            text: "北京银行",
            range: [1, 8000.0],
            textRange: 3000,
            showLine: true,
            textColor: "RGB(0,0,0)",
            textBackgroundColor: "RGB(255,255,255)",
            hoverImagePath: HostConfig.Path + "/images/hilightarea.png",
            textSize: 10,
            autoHeight: true,
          };
          await this.$aircityApi.tag.add(o);
          this.$aircityApi.tag.focus(o.id, 200, 0);

          o.id = "p2";
          o.text = "招商银行";
          o.coordinate = [495231.93, 2490962.25, 10.0];
          o.popupPos = [0, 0];
          o.popupSize = [600, 400];
          this.$aircityApi.tag.add(o);

          break;
        case 1:
          this.$aircityApi.tag.update({
            id: "p1",
            coordinate: [495304.09375, 2491078.25, 29.39],
            imagePath:
              "data:image/png;base64,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",
            url: HostConfig.Path + "/tag_popup.html",
            imageSize: [28, 28],
            text: "北京银行欢迎你",
            textColor: "RGB(0,0,255)",
            textBackgroundColor: "RGB(255,255,0)",
            range: [1, 8000.0],
            showLine: false,
          });
          break;
        case 2:
          this.$aircityApi.tag.delete(["p1", "p2"]);
          break;
        case 3:
          this.$aircityApi.tag.clear();
          break;
        case 4:
          this.$aircityApi.tag.focus("p1", 200, 0.2);
          break;
        case 5:
          this.$aircityApi.tag.focusAll(200, 0.2);
          break;
        case 6:
          this.$aircityApi.tag.show("p1");
          break;
        case 7:
          this.$aircityApi.tag.showAll();
          break;
        case 8:
          this.$aircityApi.tag.hide(["p1"]);
          break;
        case 9:
          this.$aircityApi.tag.hideAll();
          break;
        case 10:
          let res = await this.$aircityApi.tag.get("p1");
          alert(JSON.stringify(res));
          break;
        case 11:
          this.$aircityApi.tag.showPopupWindow("p1");
          break;
        case 12:
          this.$aircityApi.tag.hidePopupWindow("p1");
          break;
        case 13:
          this.$aircityApi.tag.showAllPopupWindow();
          break;
        case 14:
          this.$aircityApi.tag.hideAllPopupWindow();
          break;
        case 15:
          if (!window.__canvas)
            window.__canvas = document.createElement("canvas");
          let img = new Image();
          img.src =
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUoAAAB+CAYAAABCtVgKAAAACXBIWXMAAAsTAAALEwEAmpwYAABAm2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iCiAgICAgICAgICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgICAgICAgICAgIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIgogICAgICAgICAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgICAgICAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyI+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpPC94bXA6Q3JlYXRvclRvb2w+CiAgICAgICAgIDx4bXA6Q3JlYXRlRGF0ZT4yMDIwLTEyLTAxVDE4OjQxOjUwKzA4OjAwPC94bXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhtcDpNZXRhZGF0YURhdGU+MjAyMC0xMi0wMVQxODo0MjowNCswODowMDwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPHhtcDpNb2RpZnlEYXRlPjIwMjAtMTItMDFUMTg6NDI6MDQrMDg6MDA8L3htcDpNb2RpZnlEYXRlPgogICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3BuZzwvZGM6Zm9ybWF0PgogICAgICAgICA8eG1wTU06SW5zdGFuY2VJRD54bXAuaWlkOmY5ZTYwZGRmLWUzYjgtOWM0Yi1iNTJjLTVkNTM3MDVkMmM5OTwveG1wTU06SW5zdGFuY2VJRD4KICAgICAgICAgPHhtcE1NOkRvY3VtZW50SUQ+YWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmQ5ZDI5OGViLTMzYzEtMTFlYi04ZTA5LWQ2ODcwY2I5NzExMDwveG1wTU06RG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD54bXAuZGlkOjdkOGMyZWFiLWM2NDAtYjk0OS1iNzMwLWU0YzhjNTBhMTY1ODwveG1wTU06T3JpZ2luYWxEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06SGlzdG9yeT4KICAgICAgICAgICAgPHJkZjpTZXE+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPmNyZWF0ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDo3ZDhjMmVhYi1jNjQwLWI5NDktYjczMC1lNGM4YzUwYTE2NTg8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMjAtMTItMDFUMTg6NDE6NTArMDg6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6OTI4YzA5YTAtN2I0NC02NTQyLWE2YWItYThmMzMzNzE1YzcyPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDIwLTEyLTAxVDE4OjQyOjA0KzA4OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5jb252ZXJ0ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnBhcmFtZXRlcnM+ZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZzwvc3RFdnQ6cGFyYW1ldGVycz4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPmRlcml2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnBhcmFtZXRlcnM+Y29udmVydGVkIGZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmc8L3N0RXZ0OnBhcmFtZXRlcnM+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5zYXZlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOmY5ZTYwZGRmLWUzYjgtOWM0Yi1iNTJjLTVkNTM3MDVkMmM5OTwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAyMC0xMi0wMVQxODo0MjowNCswODowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICAgICA8c3RFdnQ6Y2hhbmdlZD4vPC9zdEV2dDpjaGFuZ2VkPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgPC9yZGY6U2VxPgogICAgICAgICA8L3htcE1NOkhpc3Rvcnk+CiAgICAgICAgIDx4bXBNTTpEZXJpdmVkRnJvbSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgIDxzdFJlZjppbnN0YW5jZUlEPnhtcC5paWQ6OTI4YzA5YTAtN2I0NC02NTQyLWE2YWItYThmMzMzNzE1YzcyPC9zdFJlZjppbnN0YW5jZUlEPgogICAgICAgICAgICA8c3RSZWY6ZG9jdW1lbnRJRD54bXAuZGlkOjdkOGMyZWFiLWM2NDAtYjk0OS1iNzMwLWU0YzhjNTBhMTY1ODwvc3RSZWY6ZG9jdW1lbnRJRD4KICAgICAgICAgICAgPHN0UmVmOm9yaWdpbmFsRG9jdW1lbnRJRD54bXAuZGlkOjdkOGMyZWFiLWM2NDAtYjk0OS1iNzMwLWU0YzhjNTBhMTY1ODwvc3RSZWY6b3JpZ2luYWxEb2N1bWVudElEPgogICAgICAgICA8L3htcE1NOkRlcml2ZWRGcm9tPgogICAgICAgICA8cGhvdG9zaG9wOlRleHRMYXllcnM+CiAgICAgICAgICAgIDxyZGY6QmFnPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHBob3Rvc2hvcDpMYXllck5hbWU+6aOe5rih56eR5oqAPC9waG90b3Nob3A6TGF5ZXJOYW1lPgogICAgICAgICAgICAgICAgICA8cGhvdG9zaG9wOkxheWVyVGV4dD7po57muKHnp5HmioA8L3Bob3Rvc2hvcDpMYXllclRleHQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpCYWc+CiAgICAgICAgIDwvcGhvdG9zaG9wOlRleHRMYXllcnM+CiAgICAgICAgIDxwaG90b3Nob3A6Q29sb3JNb2RlPjM8L3Bob3Rvc2hvcDpDb2xvck1vZGU+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgICAgIDx0aWZmOlhSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpYUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6WVJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOllSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpSZXNvbHV0aW9uVW5pdD4yPC90aWZmOlJlc29sdXRpb25Vbml0PgogICAgICAgICA8ZXhpZjpDb2xvclNwYWNlPjY1NTM1PC9leGlmOkNvbG9yU3BhY2U+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj4zMzA8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MTI2PC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz72EeTxAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAB7eSURBVHja7J1pcxzXdYbP6R6A4goBJEiApECHmxSpVJLKcmTGSj7FlbKr/DGV35BU/kKqUuWfpCxfI2+STCd2JMOyRIoSFywkCGIjBgQw3ScfZrr7Lucu3QOAmMF5qyBCwKBnpqf76fc999zbeH2W/gkAfg4AZ0EkEolEqpYB4F/x+iw9XZx9cHZzeUN2iUgkEik6efY0TL01s5wAgEBSJBKJGPXYeDaRXSESiUR+tbgfjs9MwtjFCUhHW7KHRCLRkVG204G1+Wew8mDJD8rxmUk4M9qBrY8+AtpqA+12gPIcgF7+m6CNp89pYXaJdjZ3zF8V3yD/So2feY10vXeaIMnhJYo7VpIEJm+cS8ZfOwdJKmnusAgBMEkAR1qAx0/AmVsfAMxMarC0QDl2cQK2PvoI8o0NyF9sA+12ALIc6CWSkrbbO/nc54vw7P56+c56/yJaoFL+3wkxMnZU0zcnkBTV05OFR9mx00s4895lPD05JjvkMHASAdIuKJNOBi8++QzGfvYzPyjT0RbQVhvyF9tdUO7sAmXZy3kHeZbni39eyh7+4Qlku5nytkhxdOABowOIGA09FBiK9lwrHVh6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";
          img.onload = () => {
            window.__canvas.width = img.width;
            window.__canvas.height = img.height;

            var ctx = window.__canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            ctx.fillStyle = "#fff";
            ctx.font = "36px Bold Verdana";
            ctx.textBaseline = "middle";
            ctx.fillText("农村商业银行", 60, 50);

            let o = {
              id: "canvas_tag1",
              coordinate: [495150.21875, 2490873.75, 0.4],
              imagePath: window.__canvas.toDataURL("image/jpg"),
              imageSize: [165, 63],
              text: "",
              url: HostConfig.Path + "/tag_popup.html",
              range: [1, 8000.0],
            };
            this.$aircityApi.tag
              .delete("canvas_tag1")
              .then(() => this.$aircityApi.tag.add(o))
              .then(() => this.$aircityApi.tag.focus("canvas_tag1", 200, 0.2));
          };
          break;
        case 16:
          await this.$aircityApi.tag.setCoordinate(
            "p1",
            [495254.1875, 2491154.25, 0.4]
          );
          this.$aircityApi.tag.focus("p1", 200, 0.2);
          break;
        case 17:
          let path = HostConfig.Path + "/images/ctag.png";
          this.$aircityApi.tag.setImagePath("p1", path);
          break;
        case 18:
          this.$aircityApi.tag.setImageSize("p1", [64, 64]);
          break;
        case 19:
          this.$aircityApi.tag.setURL("p1", "http://www.163.com");
          break;
        case 20:
          this.$aircityApi.tag.setText("p1", "北京欢迎你");
          break;
        case 21:
          this.$aircityApi.tag.setRange("p1", [1, 800]);
          break;
        case 22:
          this.$aircityApi.tag.setTextColor("p1", "RGB(0,0,255)");
          break;
        case 23:
          this.$aircityApi.tag.setTextBackgroundColor("p1", "RGB(0,255,0)");
          break;
        case 24:
          this.$aircityApi.tag.setTextBorderColor("p1", "RGB(255,0,0)");
          break;
        case 25:
          this.$aircityApi.tag.setShowLine("p1", false);
          break;
      }
    },
    async marker(type) {
      switch (type) {
        case 0:
          let o = {
            id: "m1",
            coordinate: [495269.37, 2491073.25, 25.4],
            imagePath: HostConfig.Path + "/images/tag.png",
            popupURL: HostConfig.Path + "/tag_popup.html",
            imageSize: [28, 28],
            text: "北京银行",
            textBackgroundColor: "RGB(255,255,255)",
            hoverImagePath: HostConfig.Path + "/images/hilightarea.png",
            dispalyMode: 0,
          };
          await this.$aircityApi.marker.add(o);
          this.$aircityApi.marker.focus(o.id, 200, 0);

          o.id = "m2";
          o.text = "招商银行";
          o.coordinate = [495231.93, 2490962.25, 10.0];
          this.$aircityApi.marker.add(o);

          break;
        case 1:
          let oo = {
            id: "m1",
            text: "北京银行欢迎你",
            fontColor: "RGB(0,0,255)",
            textBackgroundColor: "RGB(0,255,0)",
            lineSize: [2, 50],
            lineColor: "RGB(255,0,0)",
          };
          this.$aircityApi.marker.update(oo);
          break;
        case 2:
          this.$aircityApi.marker.delete(["m1", "m2"]);
          break;
        case 3:
          this.$aircityApi.marker.clear();

          break;
        case 4:
          this.$aircityApi.marker.focus("m1", 200, 0.2);

          break;
        case 5:
          this.$aircityApi.marker.focusAll(200, 0.2);

          break;
        case 6:
          this.$aircityApi.marker.show("m1");

          break;
        case 7:
          this.$aircityApi.marker.showAll();

          break;
        case 8:
          this.$aircityApi.marker.hide(["m1"]);

          break;
        case 9:
          this.$aircityApi.marker.hideAll();

          break;
        case 10:
          let res = await this.$aircityApi.marker.get("m1");
          alert(JSON.stringify(res));
          break;
        case 11:
          this.$aircityApi.marker.showPopupWindow("m1");

          break;
        case 12:
          this.$aircityApi.marker.hidePopupWindow("m1");

          break;
        case 13:
          this.$aircityApi.marker.showAllPopupWindow();

          break;
        case 14:
          this.$aircityApi.marker.hideAllPopupWindow();

          break;
        case 15:
          if (!window.__canvas)
            window.__canvas = document.createElement("canvas");
          let img = new Image();
          img.src =
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUoAAAB+CAYAAABCtVgKAAAACXBIWXMAAAsTAAALEwEAmpwYAABAm2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iCiAgICAgICAgICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgICAgICAgICAgIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIgogICAgICAgICAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgICAgICAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyI+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpPC94bXA6Q3JlYXRvclRvb2w+CiAgICAgICAgIDx4bXA6Q3JlYXRlRGF0ZT4yMDIwLTEyLTAxVDE4OjQxOjUwKzA4OjAwPC94bXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhtcDpNZXRhZGF0YURhdGU+MjAyMC0xMi0wMVQxODo0MjowNCswODowMDwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPHhtcDpNb2RpZnlEYXRlPjIwMjAtMTItMDFUMTg6NDI6MDQrMDg6MDA8L3htcDpNb2RpZnlEYXRlPgogICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3BuZzwvZGM6Zm9ybWF0PgogICAgICAgICA8eG1wTU06SW5zdGFuY2VJRD54bXAuaWlkOmY5ZTYwZGRmLWUzYjgtOWM0Yi1iNTJjLTVkNTM3MDVkMmM5OTwveG1wTU06SW5zdGFuY2VJRD4KICAgICAgICAgPHhtcE1NOkRvY3VtZW50SUQ+YWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmQ5ZDI5OGViLTMzYzEtMTFlYi04ZTA5LWQ2ODcwY2I5NzExMDwveG1wTU06RG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD54bXAuZGlkOjdkOGMyZWFiLWM2NDAtYjk0OS1iNzMwLWU0YzhjNTBhMTY1ODwveG1wTU06T3JpZ2luYWxEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06SGlzdG9yeT4KICAgICAgICAgICAgPHJkZjpTZXE+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPmNyZWF0ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDo3ZDhjMmVhYi1jNjQwLWI5NDktYjczMC1lNGM4YzUwYTE2NTg8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMjAtMTItMDFUMTg6NDE6NTArMDg6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6OTI4YzA5YTAtN2I0NC02NTQyLWE2YWItYThmMzMzNzE1YzcyPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDIwLTEyLTAxVDE4OjQyOjA0KzA4OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5jb252ZXJ0ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnBhcmFtZXRlcnM+ZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZzwvc3RFdnQ6cGFyYW1ldGVycz4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPmRlcml2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnBhcmFtZXRlcnM+Y29udmVydGVkIGZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmc8L3N0RXZ0OnBhcmFtZXRlcnM+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5zYXZlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOmY5ZTYwZGRmLWUzYjgtOWM0Yi1iNTJjLTVkNTM3MDVkMmM5OTwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAyMC0xMi0wMVQxODo0MjowNCswODowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICAgICA8c3RFdnQ6Y2hhbmdlZD4vPC9zdEV2dDpjaGFuZ2VkPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgPC9yZGY6U2VxPgogICAgICAgICA8L3htcE1NOkhpc3Rvcnk+CiAgICAgICAgIDx4bXBNTTpEZXJpdmVkRnJvbSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgIDxzdFJlZjppbnN0YW5jZUlEPnhtcC5paWQ6OTI4YzA5YTAtN2I0NC02NTQyLWE2YWItYThmMzMzNzE1YzcyPC9zdFJlZjppbnN0YW5jZUlEPgogICAgICAgICAgICA8c3RSZWY6ZG9jdW1lbnRJRD54bXAuZGlkOjdkOGMyZWFiLWM2NDAtYjk0OS1iNzMwLWU0YzhjNTBhMTY1ODwvc3RSZWY6ZG9jdW1lbnRJRD4KICAgICAgICAgICAgPHN0UmVmOm9yaWdpbmFsRG9jdW1lbnRJRD54bXAuZGlkOjdkOGMyZWFiLWM2NDAtYjk0OS1iNzMwLWU0YzhjNTBhMTY1ODwvc3RSZWY6b3JpZ2luYWxEb2N1bWVudElEPgogICAgICAgICA8L3htcE1NOkRlcml2ZWRGcm9tPgogICAgICAgICA8cGhvdG9zaG9wOlRleHRMYXllcnM+CiAgICAgICAgICAgIDxyZGY6QmFnPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHBob3Rvc2hvcDpMYXllck5hbWU+6aOe5rih56eR5oqAPC9waG90b3Nob3A6TGF5ZXJOYW1lPgogICAgICAgICAgICAgICAgICA8cGhvdG9zaG9wOkxheWVyVGV4dD7po57muKHnp5HmioA8L3Bob3Rvc2hvcDpMYXllclRleHQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpCYWc+CiAgICAgICAgIDwvcGhvdG9zaG9wOlRleHRMYXllcnM+CiAgICAgICAgIDxwaG90b3Nob3A6Q29sb3JNb2RlPjM8L3Bob3Rvc2hvcDpDb2xvck1vZGU+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgICAgIDx0aWZmOlhSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpYUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6WVJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOllSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpSZXNvbHV0aW9uVW5pdD4yPC90aWZmOlJlc29sdXRpb25Vbml0PgogICAgICAgICA8ZXhpZjpDb2xvclNwYWNlPjY1NTM1PC9leGlmOkNvbG9yU3BhY2U+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj4zMzA8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MTI2PC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz72EeTxAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAB7eSURBVHja7J1pcxzXdYbP6R6A4goBJEiApECHmxSpVJLKcmTGSj7FlbKr/DGV35BU/kKqUuWfpCxfI2+STCd2JMOyRIoSFywkCGIjBgQw3ScfZrr7Lucu3QOAmMF5qyBCwKBnpqf76fc999zbeH2W/gkAfg4AZ0EkEolEqpYB4F/x+iw9XZx9cHZzeUN2iUgkEik6efY0TL01s5wAgEBSJBKJGPXYeDaRXSESiUR+tbgfjs9MwtjFCUhHW7KHRCLRkVG204G1+Wew8mDJD8rxmUk4M9qBrY8+AtpqA+12gPIcgF7+m6CNp89pYXaJdjZ3zF8V3yD/So2feY10vXeaIMnhJYo7VpIEJm+cS8ZfOwdJKmnusAgBMEkAR1qAx0/AmVsfAMxMarC0QDl2cQK2PvoI8o0NyF9sA+12ALIc6CWSkrbbO/nc54vw7P56+c56/yJaoFL+3wkxMnZU0zcnkBTV05OFR9mx00s4895lPD05JjvkMHASAdIuKJNOBi8++QzGfvYzPyjT0RbQVhvyF9tdUO7sAmXZy3kHeZbni39eyh7+4Qlku5nytkhxdOABowOIGA09FBiK9lwrHVh6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";
          img.onload = () => {
            window.__canvas.width = img.width;
            window.__canvas.height = img.height;
            var ctx = window.__canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            ctx.fillStyle = "#fff";
            ctx.font = "36px Bold Verdana";
            ctx.textBaseline = "middle";
            ctx.fillText("农村商业银行", 60, 50);
            let o = {};
            o.id = "canvas_marker1";
            o.coordinate = [495150.21875, 2490873.75, 0.4];
            o.imagePath = window.__canvas.toDataURL("image/jpg");
            o.imageSize = [165, 63];
            o.popupURL = "";
            o.url = HostConfig.Path + "/tag_popup.html";
            o.range = [1, 8000.0];
            this.$aircityApi.marker
              .delete("canvas_marker1")
              .then(() => this.$aircityApi.marker.add(o))
              .then(() =>
                this.$aircityApi.marker.focus("canvas_marker1", 200, 0.2)
              );
          };
          break;
        case 16:
          await this.$aircityApi.marker.setCoordinate(
            "m1",
            [495254.1875, 2491154.25, 0.4]
          );
          this.$aircityApi.marker.focus("m1", 200, 0.2);
          break;
        case 17:
          let path = HostConfig.Path + "/images/ctag.png";
          this.$aircityApi.marker.setImagePath("m1", path);
          break;
        case 18:
          this.$aircityApi.marker.setImageSize("m1", [64, 64]);
          break;
        case 19:
          this.$aircityApi.marker.setURL("m1", "http://www.163.com");
          break;
        case 20:
          this.$aircityApi.marker.setText("m1", "北京欢迎你");
          break;
        case 21:
          this.$aircityApi.marker.setRange("m1", [1, 800]);
          break;
        case 22:
          this.$aircityApi.marker.setFontColor("m1", "RGB(0,0,255)");
          break;
        case 23:
          this.$aircityApi.marker.setTextBackgroundColor("m1", "RGB(0,255,0)");
          break;
        case 24:
          this.$aircityApi.marker.setFontOutlineColor("m1", "RGB(255,0,0)");
          break;
      }
    },
    async customTag(type) {
      switch (type) {
        case 0:
          let o = {
            id: "ct1",
            coordinate: [495113.71875, 2491218, 0.4],
            contentURL:
              HostConfig.Path +
              "/tag_custom.html?icon=images/ctag1.png&title=北医三院&address=海淀区花园北路",
            contentSize: [220, 52],
            popupURL: HostConfig.Path + "/tag_popup.html",
            popupSize: [600, 480],
            pivot: [0.5, 0.5],
            range: [1, 5000],
          };
          await this.$aircityApi.customTag.clear();
          await this.$aircityApi.customTag.add(o);
          this.$aircityApi.customTag.focus(o.id, 50, 0.2);
          break;
        case 1:
          let oo = {
            id: "ct1",
            coordinate: [495113.71875, 2491218, 0.4],
            contentURL:
              HostConfig.Path +
              "/tag_custom.html?icon=images/ctag1.png&title=中关村医院&address=中关村南路12号",
            contentSize: [220, 52],
            popupURL: HostConfig.Path + "/tag_popup.html",
            popupSize: [600, 480],
            pivot: [0.5, 0.5],
            range: [1, 5000],
          };
          this.$aircityApi.customTag.update(oo);
          break;
        case 2:
          this.$aircityApi.customTag.delete("ct1");
          break;
        case 3:
          this.$aircityApi.customTag.clear();
          break;
        case 4:
          this.$aircityApi.customTag.focus("ct1", 50, 0.1);
          break;
        case 6:
          this.$aircityApi.customTag.show("ct1");
          break;
        case 7:
          this.$aircityApi.customTag.showAll();
          break;
        case 8:
          this.$aircityApi.customTag.hide("ct1");
          break;
        case 9:
          this.$aircityApi.customTag.hideAll();
          break;
        case 10:
          let res = await this.$aircityApi.customTag.get("ct1");
          alert(JSON.stringify(res));
          break;
      }
    },
    async polyline(type) {
      switch (type) {
        case 0:
          let o = {
            id: "p1",
            coordinates: [
              [493711.15625, 2488656.25, 7.0],
              [493698.09375, 2490060.25, 8.4],
              [494434.78125, 2490056, 5.4],
              [494663.90625, 2491221, 3.8],
            ],
            color: "RGB(255,0,0)",
            style: 0, // Arrow: 0 Arrow1: 1 Beam: 3 Flow: 2 Normal: 4 OnTerrain: 5
            thickness: 150,
            brightness: 0.8,
            flowRate: 0.5,
            depthTest: false,
          };
          this.$aircityApi.camera.set(
            495161.78125,
            2489277,
            1362.090454,
            -48.678974,
            -152.06279,
            0
          );
          await this.$aircityApi.polyline.delete(o.id);
          this.$aircityApi.polyline.add(o);
          break;
        case 1:
          this.$aircityApi.polyline.updateBegin();
          this.$aircityApi.polyline.setStyle("p1", 4);
          this.$aircityApi.polyline.setColor("p1", "RGB(0,255,0)");
          this.$aircityApi.polyline.setThickness("p1", 10);
          this.$aircityApi.polyline.setBrightness("p1", 0.5);
          this.$aircityApi.polyline.setFlowRate("p1", 0.8);
          this.$aircityApi.polyline.setDepthTest("p1", true);
          this.$aircityApi.polyline.updateEnd();
          break;
        case 2:
          this.$aircityApi.polyline.delete("p1");
          break;
        case 3:
          this.$aircityApi.polyline.clear();
          break;
        case 4:
          this.$aircityApi.polyline.focus("p1");
          break;
        case 6:
          this.$aircityApi.polyline.show("p1");
          break;
        case 7:
          this.$aircityApi.polyline.showAll();
          break;
        case 8:
          this.$aircityApi.polyline.hide("p1");
          break;
        case 9:
          this.$aircityApi.polyline.hideAll();
          break;
        case 10:
          let res = await this.$aircityApi.polyline.get("p1");
          alert(JSON.stringify(res));
          break;
      }
    },

    async odline(type) {
      switch (type) {
        case 0:
          let o = {
            id: "od1",
            color: "RGB(0,255,0)",
            coordinates: [
              [492303.65625, 2487534.5, 4.195],
              [491391.5625, 2487777.5, 4.2],
            ],
            flowRate: 1,
            brightness: 10,
            bendDegree: 0.5,
            tiling: 0.5,

            lineThickness: 15,
            flowPointSizeScale: 30,
            labelSizeScale: 1000,

            lineShape: 1, //ODLine模型样式 0:平面 1:柱体，默认值1
            lineStyle: 0, //ODLine材质样式 0:纯色 1:箭头，2:流动点，默认值0
            flowShape: 1, //ODLine发光点样式 0:无 1:球体，默认值0

            startPointShape: 1,
            endPointShape: 1,
            startLabelShape: 1,
            endLabelShape: 1,
          };
          this.$aircityApi.camera.set(
            491433.65625,
            2486907.5,
            685.200928,
            -39.472763,
            -64.888329,
            0
          );
          this.$aircityApi.odline
            .delete("od1")
            .then(() => this.$aircityApi.odline.add(o));
          break;
        case 1:
          let oo = {
            id: "od1",
            color: [1, 0, 1, 1],
            coordinates: [
              [492303.65625, 2487534.5, 4.195],
              [491391.5625, 2487777.5, 4.2],
            ],
            flowRate: 1,
            brightness: 0.8,
            bendDegree: 0.5,
            tiling: 1.0,

            lineThickness: 15,
            flowPointSizeScale: 50,
            labelSizeScale: 100,

            lineShape: 1, //ODLine模型样式 0:平面 1:柱体，默认值1
            lineStyle: 2, //ODLine材质样式 0:纯色 1:箭头，2:流动点，默认值0
            flowShape: 1, //ODLine发光点样式 0:无 1:球体，默认值0

            startPointShape: 1,
            endPointShape: 1,
            startLabelShape: 0,
            endLabelShape: 0,
          };
          this.$aircityApi.odline.update(oo);
          break;
        case 2:
          this.$aircityApi.odline.delete("od1");
          break;
        case 3:
          this.$aircityApi.odline.clear();
          break;
        case 4:
          this.$aircityApi.odline.focus("od1");
          break;
        case 6:
          this.$aircityApi.odline.show("od1");
          break;
        case 7:
          this.$aircityApi.odline.showAll();
          break;
        case 8:
          this.$aircityApi.odline.hide("od1");
          break;
        case 9:
          this.$aircityApi.odline.hideAll();
          break;
        case 10:
          let res = await this.$aircityApi.odline.get("od1");
          alert(JSON.stringify(res));
          break;
      }
    },

    async polygon(type) {
      switch (type) {
        case 0:
          let o = {
            id: "polygon1",
            coordinates: [
              [488545.9375, 2491134.5, 1.0],
              [488235.9375, 2490811.5, 1.0],
              [487774.5625, 2491299.25, 1.0],
              [488081.59375, 2491625.5, 1.0],
            ],
            color: [0, 0, 1, 1], //多边形的填充颜色
            frameColor: "RGB(255,0,0)",
            frameThickness: 5,
            depthTest: false,
          };
          await this.$aircityApi.polygon.add(o);
          this.$aircityApi.polygon.focus("polygon1");
          break;
        case 1:
          let oo = {
            id: "polygon1",
            coordinates: [
              [488545.9375, 2491134.5, 1.0],
              [488235.9375, 2490811.5, 1.0],
              [487774.5625, 2491299.25, 1.0],
              [488081.59375, 2491625.5, 1.0],
            ],
            color: [1, 0, 0, 1], //多边形的填充颜色
            frameColor: "RGB(255,0,0)",
            frameThickness: 5,
            depthTest: true,
          };
          this.$aircityApi.polygon.update(oo);
          break;
        case 2:
          this.$aircityApi.polygon.delete(["polygon1", "2"]);
          break;
        case 3:
          this.$aircityApi.polygon.clear();
          break;
        case 4:
          this.$aircityApi.polygon.focus("polygon1");
          break;
        case 5:
          this.$aircityApi.polygon.show(["polygon1", "2"]);
          break;
        case 6:
          this.$aircityApi.polygon.hide(["polygon1", "2"]);
          break;
        case 7:
          this.$aircityApi.polygon.highlight(["polygon1", "2"]);
          break;
        case 8:
          this.$aircityApi.polygon.stopHighlight(["polygon1", "2"]);
          break;
        case 9:
          let res = await this.$aircityApi.polygon.get("polygon1");
          alert(JSON.stringify(res));
          break;
      }
    },
    async polygon3D(type) {
      switch (type) {
        case 0:
          let o = {
            id: "polygon3d1",
            coordinates: [
              [489877.9375, 2493053.5, 6.6659374237060547],
              [489850.5, 2492181.75, 5.6631250381469727],
              [488457.03125, 2493013.5, 0],
            ],
            color: [1, 0, 1, 1], //颜色值
            height: 500, //3D多边形的高度
            intensity: 4.0, //亮度
            style: 1, //3DPolygon的样式
          };
          await this.$aircityApi.polygon3d.add(o);
          this.$aircityApi.polygon3d.focus("polygon3d1");
          break;
        case 1:
          let oo = {
            id: "polygon3d1",
            coordinates: [
              [
                [489877.9375, 2493053.5, 6.6659374237060547],
                [489850.5, 2492181.75, 5.6631250381469727],
                [488977.84375, 2492411.75, 0],
                [488457.03125, 2493013.5, 0],
              ],
              [
                [489536.5625, 2492735.5, 12.10546875],
                [489228.4375, 2492998.5, 7.3343749046325684],
                [489008.78125, 2492620.5, 2.504218578338623],
              ],
            ],
            color: [1, 1, 0, 1], //颜色值
            height: 300, //3D多边形的高度
            intensity: 3.0, //亮度
            style: 3,
          };
          await this.$aircityApi.polygon3d.update(oo);
          this.$aircityApi.polygon3d.focus("polygon3d1");
          break;
        case 2:
          this.$aircityApi.polygon3d.delete(["0", "polygon3d1"]);
          break;
        case 3:
          this.$aircityApi.polygon3d.clear();
          break;
        case 4:
          this.$aircityApi.polygon3d.focus("polygon3d1");
          break;
        case 5:
          this.$aircityApi.polygon3d.show("polygon3d1");
          break;
        case 6:
          this.$aircityApi.polygon3d.hide("polygon3d1");
          break;
        case 7:
          this.$aircityApi.polygon3d.highlight(["0", "polygon3d1"]);
          break;
        case 8:
          this.$aircityApi.polygon3d.stopHighlight(["0", "polygon3d1"]);
          break;
        case 9:
          let res = await this.$aircityApi.polygon3d.get("polygon3d1");
          alert(JSON.stringify(res));
          break;
      }
    },
    async heatmap(type) {
      switch (type) {
        case 0:
          await this.$aircityApi.heatmap.clear();
          await this.$aircityApi.camera.set(
            492231.9375,
            2489968,
            2180.598145,
            -54.192036,
            -175.195358,
            0
          );

          let bbox = [488670.75, 2488165, 5.7, 491659.59375, 2490987.5, 344.58];
          let range = [0, 100];
          let data = [];
          for (let i = 0; i < 100; i++) {
            let x =
              Math.round((Math.random() * (bbox[3] - bbox[0]) + bbox[0]) * 10) /
              10; //minX ~ maxX
            let y =
              Math.round((Math.random() * (bbox[4] - bbox[1]) + bbox[1]) * 10) /
              10; //minY ~ maxY
            data.push({
              id: i.toString(),
              coordinate: [x, y, 0], //热力点的坐标
              radius: Math.random() * 400, //热力点影像半径范围
              heatValue: Math.random() * 100, //热力值
            });
          }
          this.$aircityApi.heatmap.add("heatmap1", bbox, range, data);
          break;
        case 1:
          setTimeout(() => {
            let data = [];
            for (let i = 0; i < 100; i++) {
              data.push({
                id: i.toString(),
                heatValue: Math.random() * 100,
              });
            }
            this.$aircityApi.heatmap.update("heatmap1", null, null, data);
          }, 1000);
          break;
        case 2:
          this.$aircityApi.heatmap.delete("heatmap1");
          break;
        case 3:
          this.$aircityApi.heatmap.clear();
          break;
        case 4:
          this.$aircityApi.heatmap.focus("heatmap1", 100);
          break;
        case 6:
          this.$aircityApi.heatmap.show("heatmap1");
          break;
        case 8:
          this.$aircityApi.heatmap.hide("heatmap1");
          break;
        case 10:
          let res = await this.$aircityApi.heatmap.get("heatmap1");
          alert(JSON.stringify(res));
          break;
      }
    },

    async beam(type) {
      switch (type) {
        case 0:
          let o = {
            id: "beam1",
            coordinates: [
              [491599.5, 2490045, 11.3046875],
              [492483.5, 2490050.5, 8.1779689788818359],
              [492621.1875, 2489262.5, 11.311718940734863],
            ],
            duration: 3, //光流粒子的生命周期
            thickness: 0.8, //光流线的宽度
            interval: 0.5, //光流粒子发射间隔
            velocity: 5, //光流粒子的速度
            color: [1, 0, 0, 1], //光流的颜色
          };
          await this.$aircityApi.beam.add(o);
          this.$aircityApi.beam.focus("beam1");
          break;
        case 1:
          let oo = {
            id: "beam1",
            coordinates: [
              [491599.5, 2490045, 11.3046875],
              [492483.5, 2490050.5, 8.1779689788818359],
              [492520.28125, 2490873.25, 9.8798437118530273],
            ],
            duration: 5,
            thickness: 3,
            interval: 0.2,
            velocity: 5,
            color: [0, 0, 1, 1], //光流的颜色
          };
          await this.$aircityApi.beam.update(oo);
          this.$aircityApi.beam.focus("beam1");
          break;
        case 2:
          this.$aircityApi.beam.delete(["0", "beam1"]);

          break;
        case 3:
          this.$aircityApi.beam.clear();
          break;
        case 4:
          this.$aircityApi.beam.focus("beam1");
          break;
        case 5:
          let res = await this.$aircityApi.beam.get("beam1");
          alert(JSON.stringify(res));
          break;
        case 6:
          this.$aircityApi.beam.setThickness("beam1", 5);
          break;
      }
    },

    async highlightArea(type) {
      switch (type) {
        case 0:
          let o = {
            id: "highlightArea1",
            coordinates: [
              [488509.90625, 2487479.5, 59],
              [487133.5, 2486976, 17],
              [486509.21875, 2488715.25, 5],
              [488062.3125, 2489276, 8],
            ],
            color: [1, 0, 0, 0.8], //多边形高亮颜色
            heightRange: [60.0, 100.0], //高亮染色区域可以限定一个高度范围，也就是Z坐标的区间，只有Z值这这个区间的模型才会被染色
            intensity: 5.0, //高亮颜色的强度
          };
          await this.$aircityApi.highlightArea.add(o);
          this.$aircityApi.highlightArea.focus("highlightArea1");
          break;
        case 1:
          let oo = {
            id: "highlightArea1",
            coordinates: [
              [
                [488509.90625, 2487479.5, 59],
                [487133.5, 2486976, 17],
                [486509.21875, 2488715.25, 5],
                [488062.3125, 2489276, 8],
              ],
              [
                [487930.0625, 2488807.5, 4.0],
                [487628.3125, 2488703.25, 9.0],
                [487524.5625, 2488938.25, 8.0],
                [487846, 2489052.5, 6.0],
              ],
            ],
            color: [1, 0, 1, 0.5], //多边形高亮颜色
            heightRange: [0.0, 200.0], //高亮染色区域可以限定一个高度范围，也就是Z坐标的区间，只有Z值这这个区间的模型才会被染色
            intensity: 8.0, //高亮颜色的强度
          };
          await this.$aircityApi.highlightArea.update(oo);
          this.$aircityApi.highlightArea.focus("highlightArea1");
          break;
        case 2:
          this.$aircityApi.highlightArea.delete("highlightArea1");
          break;
        case 3:
          this.$aircityApi.highlightArea.clear();
          break;
        case 4:
          this.$aircityApi.highlightArea.focus("highlightArea1");
          break;
        case 5:
          this.$aircityApi.highlightArea.show("highlightArea1");
          break;
        case 6:
          this.$aircityApi.highlightArea.hide("highlightArea1");
          break;
        case 7:
          let res = await this.$aircityApi.highlightArea.get("highlightArea1");
          alert(JSON.stringify(res));
          break;
      }
    },

    async radiationPoint(type) {
      switch (type) {
        case 0:
          let o = {
            id: "radiationPoint1",
            coordinate: [495113.71875, 2491218, 0.4],
            radius: 300,
            rippleNumber: 2,
            color: [1, 0, 1, 1],
            brightness: 0.8,
            autoHeight: false,
          };
          await this.$aircityApi.radiationPoint.add(o);
          this.$aircityApi.radiationPoint.focus("radiationPoint1");
          break;
        case 1:
          let oo = {
            id: "radiationPoint1",
            coordinate: [495113.71875, 2491218, 0.4],
            radius: 300,
            rippleNumber: 2,
            color: [1, 0, 0, 1],
            brightness: 0.5,
            autoHeight: true,
          };
          await this.$aircityApi.radiationPoint.update(oo);
          this.$aircityApi.radiationPoint.focus("radiationPoint1");
          break;
        case 2:
          this.$aircityApi.radiationPoint.delete(["0", "radiationPoint1"]);
          break;
        case 3:
          this.$aircityApi.radiationPoint.clear();
          break;
        case 4:
          this.$aircityApi.radiationPoint.focus("radiationPoint1");
          break;
        case 5:
          this.$aircityApi.radiationPoint.focusAll();
          break;
        case 6:
          this.$aircityApi.radiationPoint.show("radiationPoint1");
          break;
        case 7:
          this.$aircityApi.radiationPoint.hide("radiationPoint1");
          break;
        case 8:
          let res = await this.$aircityApi.radiationPoint.get(
            "radiationPoint1"
          );
          alert(JSON.stringify(res));
          break;
      }
    },
    async customMesh(type) {
      switch (type) {
        case 0:
          await this.$aircityApi.customMesh.add({
            id: "sm1",
            coordinateType: 0,
            coordinates: [
              [1000, 1000, 100],
              [1000, -1000, 100],
              [-1000, -1000, 100],
              [-1000, 1000, 100],
            ],
            indices: [2, 0, 3, 0, 2, 1],
            color: [1, 0, 0, 1], //多边形高亮颜色
          });
          this.$aircityApi.customMesh.focus("sm1", 0);
          break;
        case 1:
          await this.$aircityApi.customMesh.update({
            id: "sm1",
            coordinateType: 0,
            coordinates: [
              [2000, 2000, 200],
              [2000, -2000, 200],
              [-2000, -2000, 200],
              [-2000, 2000, 200],
            ],
            indices: [2, 0, 3, 0, 2, 1],
            color: [0, 0, 1, 1], //多边形高亮颜色
          });
          this.$aircityApi.customMesh.focus("sm1", 0);
          break;
        case 2:
          this.$aircityApi.customMesh.delete("sm1");
          break;
        case 3:
          this.$aircityApi.customMesh.clear();
          break;
        case 4:
          this.$aircityApi.customMesh.focus("sm1", 0);
          break;
        case 5:
          this.$aircityApi.customMesh.show("sm1");
          break;
        case 6:
          this.$aircityApi.customMesh.hide("sm1");
          break;
        case 7:
          let res = await this.$aircityApi.customMesh.get("sm1");
          alert(JSON.stringify(res));
          break;
      }
    },

    async customObject(type) {
      switch (type) {
        case 0:
          let o = {
            id: "o1",
            pakFilePath: HostConfig.Path + "/media/custom.pak",
            assetPath: "/Game/Common/Asset_Bank/Mesh/Car/BP_Car_JiuHuChe",
            location: [495490.90625, 2490908, 0.25009766221046448],
            rotation: [0, 0, 0],
            scale: [1, 1, 1],
            smoothMotion: 1, //1: 平滑插值，0: 跳跃
          };
          await this.$aircityApi.customObject.add(o);
          this.$aircityApi.customObject.focus("o1", -1); //-1:自动跟随
          break;
        case 1:
          await this.$aircityApi.customObject.setRotation("o1", [45, 0, 0]);
          this.$aircityApi.customObject.focus("o1", -1);
          break;
        case 2:
          this.$aircityApi.customObject.delete("o1");
          break;
        case 3:
          this.$aircityApi.customObject.clear();
          break;
        case 4:
          this.$aircityApi.customObject.focus("o1", -1); //-1:自动跟随
          break;
        case 5:
          this.$aircityApi.customObject.show("o1");
          break;
        case 6:
          this.$aircityApi.customObject.hide("o1");
          break;
        case 7:
          this.$aircityApi.customObject.highlight("o1", [0, 0, 1, 1]);
          break;
        case 8:
          this.$aircityApi.customObject.unhighlight();
          break;
        case 9:
          let res = await this.$aircityApi.customObject.get("o1");
          alert(JSON.stringify(res));
          break;
        case 10:
          this.$aircityApi.customObject.addByTileLayer({
            id: "o1",
            tileLayerId: this.currentTileLayerSelection.id,
            objectId: this.currentTileLayerSelection.objectId,
            location: [-148.14, -7370.16, 9.47],
            rotation: [0, 0, 0],
            scale: [1, 1, 1],
            smoothMotion: 0, //1: 平滑插值，0: 跳跃
          });
          break;
        case 11:
          this.$aircityApi.customObject.callFunction(
            "o1",
            "funName",
            2,
            10002,
            () => {
              alert("蓝图回调");
            }
          );
          break;
        case 12:
          this.$aircityApi.customObject.setSmoothMotion("o1", 0);
          var location = [495490.90625, 2490908, 0.25009766221046448];
          location[0] += 50.0;
          this.$aircityApi.customObject.updateBegin();
          this.$aircityApi.customObject.setLocation("o1", location);
          this.$aircityApi.customObject.updateEnd();
          break;
        case 13:
          this.$aircityApi.customObject.setSmoothMotion("o1", 0);
          var scale = [1, 1, 1];
          scale[0] += 0.5;
          scale[1] += 0.5;
          scale[2] += 0.5;
          this.$aircityApi.customObject.setScale("o1", scale);
          break;
      }
    },

    async videoProjection(type) {
      switch (type) {
        case 0:
          let o = {
            id: "vp1",
            videoURL: HostConfig.Path + "/media/video2.mov",
            location: [495333.59375, 2490901, 20.0],
            rotation: [-50, 0, 0],
            fov: 90,
            aspectRatio: 1.77,
            distance: 100,
            depthCulling: true,
            frustumColor: [1, 0, 0, 1],
          };
          await this.$aircityApi.videoProjection.add(o);
          this.$aircityApi.videoProjection.focus("vp1");
          break;
        case 1:
          let oo = {
            id: "vp1",
            videoURL: HostConfig.Path + "/media/video2.mov",
            location: [495333.59375, 2490901, 20.0],
            rotation: [-50, 0, 0],
            fov: 90,
            aspectRatio: 2,
            distance: 100,
          };
          await this.$aircityApi.videoProjection.update(oo);
          this.$aircityApi.videoProjection.focus("vp1");
          break;
        case 2:
          this.$aircityApi.videoProjection.delete("vp1");
          break;
        case 3:
          this.$aircityApi.videoProjection.focus("vp1");
          break;
        case 4:
          this.$aircityApi.videoProjection.show("vp1");
          break;
        case 5:
          this.$aircityApi.videoProjection.hide("vp1");
          break;
        case 6:
          let res = await this.$aircityApi.videoProjection.get("vp1");
          alert(JSON.stringify(res));
          break;
      }
    },
    async panorama(type) {
      switch (type) {
        case 0:
          await this.$aircityApi.panorama.add({
            id: "p1",
            imagePath: HostConfig.Path + "/media/panorama1.jpg",
            coordinate: [495302.625, 2491061.5, 30.15234375],
            yaw: 75,
          });
          this.$aircityApi.panorama.focus("p1");
          break;
        case 1:
          await this.$aircityApi.panorama.update({
            id: "p1",
            imagePath: HostConfig.Path + "/media/panorama2.jpg",
            coordinate: [495302.625, 2491061.5, 30.15234375],
            yaw: 75,
          });
          this.$aircityApi.panorama.focus("p1");
          break;
        case 2:
          this.$aircityApi.panorama.delete("p1");
          break;
        case 3:
          this.$aircityApi.panorama.clear();
          break;
        case 4:
          this.$aircityApi.panorama.focus("p1");
          break;
        case 5:
          let res = await this.$aircityApi.panorama.get("p1");
          alert(JSON.stringify(res));
          break;
      }
    },
    async decal(type) {
      switch (type) {
        case 0:
          await this.$aircityApi.decal.add({
            id: "d1",
            order: 1,
            texturePath: HostConfig.Path + "/media/decal1.png",
            location: [494219.3125, 2490657, -0.001054687425494194],
            rotation: [-90, 180, 0],
            scale: [1, 1, 1],
          });

          this.$aircityApi.decal.focus("d1");
          break;
        case 1:
          await this.$aircityApi.decal.update({
            id: "d1",
            order: 1,
            texturePath: HostConfig.Path + "/media/decal2.png",
            location: [494219.3125, 2490657, -0.001054687425494194],
            rotation: [-90, 180, 0],
            scale: [0.5, 0.5, 0.5],
          });
          this.$aircityApi.decal.focus("d1");
          break;
        case 2:
          this.$aircityApi.decal.delete("d1");
          break;
        case 3:
          this.$aircityApi.decal.clear();
          break;
        case 4:
          this.$aircityApi.decal.focus("d1");
          break;
        case 5:
          this.$aircityApi.decal.focusAll();
          break;
        case 6:
          let res = await this.$aircityApi.decal.get("d1");
          alert(JSON.stringify(res));
          break;
      }
    },

    async dynamicWater(type) {
      switch (type) {
        case 0:
          await this.$aircityApi.dynamicWater.add({
            id: "dy1",
            coordinates: [
              [493878.9375, 2490438.25, 100],
              [494153.09375, 2490915, 100],
              [494413.875, 2490763.25, 100],
              [494286.21875, 2490366.25, 100],
            ],
            style: 0,
          });
          this.$aircityApi.dynamicWater.focus("dy1");
          break;
        case 1:
          await this.$aircityApi.dynamicWater.update({
            id: "dy1",
            coordinates: [
              [493878.9375, 2490438.25, 100],
              [494153.09375, 2490915, 100],
              [494413.875, 2490763.25, 100],
              [494286.21875, 2490366.25, 100],
            ],
            style: 1,
          });
          this.$aircityApi.dynamicWater.focus("dy1");
          break;
        case 2:
          this.$aircityApi.dynamicWater.delete("dy1");
          break;
        case 3:
          this.$aircityApi.dynamicWater.clear();
          break;
        case 4:
          this.$aircityApi.dynamicWater.focus("dy1");
          break;
        case 5:
          let res = await this.$aircityApi.dynamicWater.get("dy1");
          alert(JSON.stringify(res));
          break;
      }
    },

    async floodFill(type) {
      switch (type) {
        case 0:
          let o = {
            id: "fd1",
            min: [495119.875, 2491031.25],
            max: [495386.625, 2491245.5],
            seed: [495304.9, 2491041],
            elevation: 3.5,
            color: [0, 1, 0, 0],
            precision: 0.5,
          };
          await this.$aircityApi.floodFill.add(o);
          this.$aircityApi.floodFill.focus("fd1");
          break;
        case 1:
          let oo = {
            id: "fd1",
            min: [495119.875, 2491031.25],
            max: [495386.625, 2491245.5],
            seed: [495304.9, 2491041],
            elevation: 2.5,
            color: [1, 0, 0, 0],
            precision: 0.25,
          };
          await this.$aircityApi.floodFill.update(oo);
          this.$aircityApi.floodFill.focus("fd1");
          break;
        case 2:
          this.$aircityApi.floodFill.delete("fd1");
          break;
        case 3:
          this.$aircityApi.floodFill.clear();
          break;
        case 4:
          this.$aircityApi.floodFill.focus("fd1");
          break;
        case 5:
          this.$aircityApi.floodFill.show("fd1");
          break;
        case 6:
          this.$aircityApi.floodFill.showAll();
          break;
        case 7:
          this.$aircityApi.floodFill.hide("fd1");
          break;
        case 8:
          this.$aircityApi.floodFill.hideAll();
          break;
        case 9:
          let res = await this.$aircityApi.floodFill.get("fd1");
          alert(JSON.stringify(res));
          break;
      }
    },

    async cesium3DTile(type) {
      switch (type) {
        case 0:
          let o = {
            id: "fd1",
            tileURL:
              "http://localhost:9000/model/c144af800d3311ec88e5b3fcd152f8a0/tileset.json",
          };
          await this.$aircityApi.cesium3DTile.add(o);
          this.$aircityApi.cesium3DTile.focus("fd1");
          break;
        case 1:
          let oo = {
            id: "fd1",
            tileURL: "",
          };
          await this.$aircityApi.cesium3DTile.update(oo);
          this.$aircityApi.cesium3DTile.focus("fd1");
          break;
        case 2:
          this.$aircityApi.cesium3DTile.delete("fd1");
          break;
        case 3:
          this.$aircityApi.cesium3DTile.clear();
          break;
        case 4:
          this.$aircityApi.cesium3DTile.focus("fd1");
          break;
        case 5:
          this.$aircityApi.cesium3DTile.show("fd1");
          break;
        case 6:
          this.$aircityApi.cesium3DTile.showAll();
          break;
        case 7:
          this.$aircityApi.cesium3DTile.hide("fd1");
          break;
        case 8:
          this.$aircityApi.cesium3DTile.hideAll();
          break;
        case 9:
          let res = await this.$aircityApi.cesium3DTile.get("fd1");
          alert(JSON.stringify(res));
          break;
      }
    },

    async infoTree(type) {
      switch (type) {
        case 0:
          this.$aircityApi.infoTree.hide("62ED000447B292448AE503A0E93924F7");
          this.$aircityApi.tileLayer.focus("62ED000447B292448AE503A0E93924F7");
          break;
        case 1:
          this.$aircityApi.infoTree.show("62ED000447B292448AE503A0E93924F7");
          this.$aircityApi.tileLayer.focus("62ED000447B292448AE503A0E93924F7");
          break;
        case 2:
          let res = await this.$aircityApi.infoTree.get();
          alert(JSON.stringify(res.infotree));
          break;
      }
    },

    async coord(type) {
      switch (type) {
        case 0:
          let res0 = await this.$aircityApi.coord.screen2World(600, 400);
          alert("屏幕 600,400 -> " + "世界 " + res0.worldLocation);
          break;
        case 1:
          let res1 = await this.$aircityApi.coord.world2Screen(
            492938.25,
            2492404.25,
            22.249844
          );
          alert(
            "世界 492938.25,2492404.25,22.249844 -> " +
              "屏幕 " +
              res1.screenPosition
          );
          break;
        case 2:
          let res2 = await this.$aircityApi.coord.pcs2gcs([498326, 3353092]);
          alert("投影 498326, 3353092 -> " + "地理 " + res2.coordinates);
          break;
        case 3:
          let res3 = await this.$aircityApi.coord.gcs2pcs([
            113.9825982455081, 30.297492106590411,
          ]);
          alert(
            "地理 113.98259824550810, 30.297492106590411 -> " +
              "投影 " +
              res3.coordinates
          );
          break;
      }
    },
    async ui(type) {
      switch (type) {
        case 0:
          this.campassVisible = !this.campassVisible;
          this.$aircityApi.settings.setCampassVisible(this.campassVisible);
          break;
        case 1:
          this.uiVisible = !this.uiVisible;
          this.$aircityApi.settings.setMainUIVisibility(this.uiVisible);
          break;
      }
    },
    async cameraTour(type) {
      switch (type) {
        case 0:
          this.frames = [];
          var frames = this.frames;
          frames.push({
            index: 0,
            time: 1.0,
            location: [492501.90625, 2483838.75, 5898.237305],
            rotation: [-55.95829, -89.993935, 0],
          });
          frames.push({
            index: 1,
            time: 2.0,
            location: [493538.75, 2487061.5, 1166.874878],
            rotation: [-36.769756, -91.261223, 0],
          });
          frames.push({
            index: 2,
            time: 3.0,
            location: [493364.78125, 2487789.25, 504.430054],
            rotation: [-23.049517, -91.261223, 0],
          });
          frames.push({
            index: 3,
            time: 4.0,
            location: [495635.78125, 2491133.75, 183.135956],
            rotation: [-24.96583, -172.325165, 0],
          });
          frames.push({
            index: 4,
            time: 5.0,
            location: [495270, 2491256.75, 67.038582],
            rotation: [-25.314354, 108.269859, 0],
          });
          let o = {
            id: "cameraTour1",
            keyFrames: frames,
            name: "test",
          };
          this.$aircityApi.cameraTour.add(o);
          break;
        case 1:
          // 暂无代码
          break;
        case 2:
          if (this.frames.length > 0) {
            this.$aircityApi.cameraTour.play("cameraTour1");
          } else {
            alert("请先添加关键帧");
          }
          break;
        case 3:
          this.$aircityApi.cameraTour.pause();
          break;
        case 4:
          this.$aircityApi.cameraTour.resume();
          break;
        case 5:
          this.$aircityApi.cameraTour.stop("cameraTour1");
          break;
        case 6:
          this.$aircityApi.cameraTour.delete("cameraTour1");
          this.frames = [];
          break;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
#aid {
  width: 1500px;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  color: #fff;
  line-height: 32px;
  background: rgba(0, 0, 0, 0.5);
  transition: 0.6s;
  .content {
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    overflow: auto;
  }
  &.active {
    transform: translate(-100%);
  }
  #slider {
    width: 30px;
    height: 100px;
    line-height: 50px;
    text-align: center;
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: calc(50% - 50px);
    right: -30px;
  }
}
</style>
