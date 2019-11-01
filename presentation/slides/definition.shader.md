<slide data-background-opacity="0.5" data-background="./assets/definitions/23.png">
  ## Definitions

  Shader
</slide>

<slide data-background-opacity="0.75" data-transition="fade" data-background="./assets/rendered/vertex0001.png">
  Vertex Shader
</slide>

<slide data-background-opacity="0.75" data-transition="fade" data-background="./assets/rendered/faces0001.png">
  Geometry Shader
</slide>

<slide data-background-opacity="0.75" data-transition="fade" data-background="./assets/rendered/cube_color0001.png">
  Fragment Shader
</slide>

<slide data-background-opacity="0.5" data-background="./assets/rendered/scene0001.png">
  ![](assets/definitions/20.png)
</slide>

<slide data-background-opacity="0.5" data-background="./assets/rendered/vertex0003.png">
  ### Vertex shader

  Executed by vertex <!-- .element: class="fragment fade-up" -->
</slide>

<slide data-background="./assets/rendered/vertex0003.png"></slide>

<slide data-background-opacity="0.5" data-transition="fade" data-background="./assets/rendered/vertex0003.png">
  8 vertices

  8 operations <!-- .element: class="fragment fade-up" -->
</slide>

<slide data-background-opacity="0.5" data-background="./assets/rendered/cube_vertices0001.png">
  ## Role ?

  Move the vertex position <!-- .element: class="fragment fade-up" -->

  Share data <!-- .element: class="fragment fade-up" -->

  Precompute data <!-- .element: class="fragment fade-up" -->
</slide>

<slide data-background-opacity="0.5" data-background="./assets/rendered/cube_faces0003.png">
  ## Geometry shader

  Executed by triangle <!-- .element: class="fragment fade-up" -->
</slide>

<slide data-background-opacity="1" data-background="./assets/rendered/cube_faces0003.png"></slide>

<slide data-background-opacity="0.5" data-background="./assets/rendered/cube_faces0003.png">
  12 triangles

  12 operations <!-- .element: class="fragment fade-up" -->
</slide>

<slide data-background-opacity="0.5" data-background="./assets/rendered/cube_faces0001.png">
  ## Role ?

  Move vertices <!-- .element: class="fragment fade-up" -->

  Optimisation <!-- .element: class="fragment fade-up" -->
</slide>

<slide data-background-opacity="0.5" data-background="./assets/rendered/scene0001.png">
  ![](assets/definitions/20.png)
</slide>

<slide data-background-opacity="0.5" data-background="./assets/rendered/cube_color0001.png">
  ## Fragment shader

  Executed by fragment <!-- .element: class="fragment fade-up" -->
</slide>

<slide data-background-opacity="0.5" data-background="./assets/rendered/cube_color0001.png">
  ## What is a fragment?

  Come back to our cube... <!-- .element: class="fragment fade-up" -->
</slide>

<slide data-background="./assets/rendered/vertex_color0001.png"></slide>

<slide data-background-opacity="0.5" data-transition="fade" data-background="./assets/rendered/vertex_color0001.png">
  ![](assets/definitions/20.png)
</slide>

<!-- <slide data-background="./assets/rendered/vertex_color_cube0001.png"></slide> -->

<slide data-background="./assets/rendered/cube_color0001.png"></slide>

<slide data-background-opacity="0.5" data-background="./assets/rendered/cube_color0003.png">
  ### How many operations?

  Mainly depends on the screen resolution <!-- .element: class="fragment fade-up" -->
</slide>

<slide data-background="./assets/definitions/21.png"></slide>

<slide data-background-opacity="0.5" data-transition="fade" data-background="./assets/definitions/21.png">
  For a résolution of 1920x1080

  2 073 600 operations! <!-- .element: class="fragment fade-up" -->
</slide>