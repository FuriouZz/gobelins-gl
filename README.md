# gobelins-gl

* 3D for realtime
  * Realtime vs Precomputed
  * What can we define in 3D realtime projects ?
    * Interactive
    * Generative
    * Immersive
    * Scalable
  * Real time principles
    * Momentum between quality and performance
    * Time-based over frame-based
    * Reduce draw calls at maximum
    * Keep expensive code computation out of the render loop
      * Object creation
      * Update vertices 
    * Use textures tricks
    * Mix precomputed and realtime
      * Bake
      * Use textures
  * Definitions
    * Vertex
      * Position
      * UV
      * Normal 
    * Fragment
      * Color
    * Geometry
      * Array of vertex
      * Vertex definition
    * Shader
      * Vertex shader (code executed by vertex)
      * Fragment shader (code executed by fragment)
    * Material
      * Program compiled with vertex and fragment shader
    * Texture
      * Image
      * Video
      * Canvas
      * Texture (Framebuffer)
    * Bake

* Introduction to Shaders
  * What is a geometry?
  * What is a material?
  * What is a shader?
* Tooling
  * Three.JS
  * IM.GUI
* Play inside the vertex shader
  * Displacement
  * Add uniforms
* Play inside the fragment shader
  * Distort texture with UVs
  * Add uniforms
* Let's add some music!
* The texture is drawing the texture is drawing the texture is loading...