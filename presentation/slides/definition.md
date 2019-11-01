<slide main>
  ## Définitions
  Primitives
</slide>

<slide data-background="./assets/definitions/00.jpg">
  ## Vertex

  Aussi appelé **point**...<!-- .element: class="fragment fade-up" -->
</slide>

<slide data-background="./assets/definitions/01.jpg">
  ### Position <!-- .element: class="fragment fade-up" -->

  ### UV <!-- .element: class="fragment fade-up" -->

  ### Normal <!-- .element: class="fragment fade-up" -->

  ### Index <!-- .element: class="fragment fade-up" -->

  ### etc... <!-- .element: class="fragment fade-up" -->
</slide>

<slide data-background="./assets/definitions/00.jpg">
  <pre>
    <code class="javascript" data-trim>/* Native WebGL */
GL.drawElements(GL.POINTS)

/* THREE */
new Points(geometry, material)</code>
  </pre>
</slide>

<slide data-background="./assets/definitions/02.jpg">
  ## Edge

  Aussi appelé **line**...<!-- .element: class="fragment fade-up" -->

  Se compose de deux vertex <!-- .element: class="fragment fade-up" -->
</slide>

<slide data-background="./assets/definitions/02.jpg">
  ![](./assets/definitions/06.png)

  <pre>
    <code class="javascript" data-trim>// Connect 2 by 2
GL.drawElements(GL.LINES, ...)</code>
  </pre>
</slide>
<slide data-background="./assets/definitions/02.jpg">
  ![](./assets/definitions/07.png)

  <pre>
    <code class="javascript" data-trim>// Connect all vertices (exclude first and last)
GL.drawElements(GL.LINE_STRIP, ...)</code>
  </pre>
</slide>

<slide data-background="./assets/definitions/02.jpg">
  ![](./assets/definitions/08.png)

  <pre>
    <code class="javascript" data-trim>// Connect all vertices (include first and last)
GL.drawElements(GL.LINE_LOOP, ...)</code>
  </pre>
</slide>

<slide data-background="./assets/definitions/02.jpg">
  ![](./assets/definitions/08.png)

  <pre>
    <code class="javascript" data-trim>// THREE
const mesh = new Line(...)</code>
  </pre>
</slide>

<slide data-background="./assets/definitions/04.jpg">
  ## Face

  Aussi appelé **triangle**...<!-- .element: class="fragment fade-up" -->

  Se compose de trois vertex <!-- .element: class="fragment fade-up" -->
</slide>

<slide data-background="./assets/definitions/05.jpg">
  ![](./assets/definitions/09.png)

  <pre>
    <code>// Draw by ollowing vertex order
GL.drawElements(GL.TRIANGLES, ...)</code>
  </pre>
</slide>

<slide data-background="./assets/definitions/05.jpg">
  ![](./assets/definitions/10.png)

  <pre>
    <code>// Draw by ollowing vertex order
GL.drawElements(GL.TRIANGLE_STRIP, ...)</code>
  </pre>
</slide>

<slide data-background="./assets/definitions/05.jpg">
  ![](./assets/definitions/11.png)

  <pre>
    <code>// Draw by ollowing vertex order
GL.drawElements(GL.TRIANGLE_FAN, ...)</code>
  </pre>
</slide>

<slide data-background="./assets/definitions/05.jpg">
  ![](./assets/definitions/11.png)
  <pre>
    <code>/* THREE */
const mesh = new Mesh(...)</code>
  </pre>
</slide>

<slide data-background="./assets/definitions/04.jpg">
  ## Face

  Aussi appelé **triangle**...<!-- .element: class="fragment fade-up" -->

  Se compose de trois vertex <!-- .element: class="fragment fade-up" -->
</slide>

<slide data-background="./assets/definitions/12.jpg">
  ## Geometry
</slide>

<slide data-background="./assets/definitions/13.jpg">
  ## Material
</slide>

<slide data-background="./assets/definitions/14.jpg">
  ## Mesh
</slide>

<slide data-background="./assets/definitions/00.jpg">
  ## Shader
</slide>

<slide data-background="./assets/definitions/00.jpg">
  Vertex Shader <!-- .element: class="fragment fade-up" -->

  Geometry Shader (Triangle) <!-- .element: class="fragment fade-up" -->

  Fragment Shader <!-- .element: class="fragment fade-up" -->
</slide>

<slide data-background="./assets/definitions/00.jpg">
  ### Vertex shader

  Exécuté pour chaque vertex <!-- .element: class="fragment fade-up" -->
</slide>

<slide data-background="./assets/definitions/00.jpg">
  ### Exemple: Cube

  8 vertex <!-- .element: class="fragment fade-up" -->
</slide>

<slide data-background="./assets/definitions/04.jpg">
  ## Geometry shader

  Calcul pour chaque triangle <!-- .element: class="fragment fade-up" -->

  C-à-d, chaque groupe de 3 vertex <!-- .element: class="fragment fade-up" -->
</slide>


<slide data-background="./assets/definitions/04.jpg">
  ### Exemple: Cube

  12 triangles <!-- .element: class="fragment fade-up" -->
</slide>

<slide data-background="./assets/definitions/14.jpg">
  ## Fragment shader

  Calcul pour chaque fragment <!-- .element: class="fragment fade-up" -->

  Fragment = Pixel dessiné par la géometrie <!-- .element: class="fragment fade-up" -->
</slide>

<slide data-background="./assets/definitions/14.jpg">
  ## Exemple: Cube

  Variable selon la résolution de l'écran <!-- .element: class="fragment fade-up" -->

  Beaucoup de fragments ... <!-- .element: class="fragment fade-up" -->
</slide>

<slide data-background="./assets/definitions/14.jpg">
  ## Exemple: Cube

  Résolution 1920x1080 <!-- .element: class="fragment fade-up" -->

  2 073 600 calculs ! <!-- .element: class="fragment fade-up" -->
</slide>

<slide>
  Texture
  * Image
  * Video
  * Canvas
  * Texture (framebuffer)
</slide>

<slide>
  Bake
</slide>