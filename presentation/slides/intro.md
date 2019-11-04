<slide main>
  # WebGL introduction
</slide>

<slide main>
  ## What is WebGL?

  A Javascript API dedicated to render 2D and 3D content on the web <!-- .element: class="fragment fade-up" -->
</slide>

<slide>
  ### What is realtime?

  Interactive <!-- .element: class="fragment fade-up" -->

  Generative <!-- .element: class="fragment fade-up" -->

  Scalable <!-- .element: class="fragment fade-up" -->
</slide>

<slide>
  ### Difference with precomputed?

  Each draw must be very fast <!-- .element: class="fragment fade-up" -->

  Framerate must be constant <!-- .element: class="fragment fade-up" -->

  A balanced performance-quality ratio <!-- .element: class="fragment fade-up" -->

  Concept of time-based over frame-based <!-- .element: class="fragment fade-up" -->
</slide>

<slide>
  ### Mix realtime and precomputed

  Use textures <!-- .element: class="fragment fade-up" -->

  Export models and datas <!-- .element: class="fragment fade-up" -->

  Do not draw/update the invisibles <!-- .element: class="fragment fade-up" -->

  Limit expensive operations <!-- .element: class="fragment fade-up" -->
</slide>